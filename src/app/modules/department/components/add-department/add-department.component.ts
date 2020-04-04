import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators, FormControl} from '@angular/forms';
import { CrudService, ImageService } from 'src/app/shared/service/index';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.scss']
})
export class AddDepartmentComponent implements OnInit {

  ckeConfig: any;
  mycontent: string;
  departmentForm : any;
  responseData: any;
  fileData: File = null;
  previewUrl:any = null;

 
  constructor(private _fb: FormBuilder, private _crudService: CrudService, private _imageService: ImageService, private _toastr: ToastrService) {
    this.mycontent = `<p>Description Here</p>`;
  }

  ngOnInit() {
    this.loadForm();
    this.loadConfig();
   
  }


  loadConfig(){
    this.ckeConfig = {
      allowedContent: false,
      forcePasteAsPlainText: true,
      toolbarGroups : [
    
        { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
        { name: 'paragraph',   groups: [ 'list', 'indent', 'blocks', 'align', 'bidi' ] },
        { name: 'links' },
        '/',
        { name: 'styles' },
        { name: 'colors' },
        { name: 'tools' },
        { name: 'others' }
    ],
    height : '150px',
    
    };
  }


  loadForm(){
    this.departmentForm = this._fb.group({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('Description here',Validators.required),
      image_url: '',
      stat: ''
    })
  }

  saveDepartment(){
    
    this._crudService.addItem(this.departmentForm.value, "department")
                      .subscribe(data => {
                        this.responseData = data;
                        if(this.responseData.status ==200){
                          this._toastr.success("Department saved 🙂","",{
                            timeOut:2000
                          })

                          this.departmentForm.reset();
                        }

                      }, error => {
                        this._toastr.info("Oops an error. 🥺","",{
                          timeOut:2000
                        })
                      })
  }


  fileProgress(fileInput: any) {
    this.fileData = <File>fileInput.target.files[0];
    let formData = new FormData();
    console.log(formData)
    formData.append('image', this.fileData, this.fileData.name);
    this._imageService.uploadImage(formData).subscribe(data =>{
      let response: any = data
      this.departmentForm.patchValue({
        image_url: response.data.link
      });
      //this.imgURL = response.link
    }, error=>{
      console.warn(error)
    })
    this.preview();
  }


  preview() {
    // Show preview 
    var mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }
    
    var reader = new FileReader();      
    reader.readAsDataURL(this.fileData); 
    reader.onload = (_event) => { 
      this.previewUrl = reader.result; 
    }
    }

}
