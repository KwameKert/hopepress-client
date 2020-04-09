import { Component, OnInit, ViewChild } from '@angular/core';
import {FormBuilder, Validators, FormControl, NgForm} from '@angular/forms';
import { CrudService, ImageService } from 'src/app/shared/service/index';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.scss']
})
export class AddDepartmentComponent implements OnInit {

  @ViewChild('myForm') myForm: NgForm;
  ckeConfig: any;
  status:  Boolean = false;
  mycontent: string;
  departmentForm : any;
  responseData: any;
  fileData: File = null;
  formData: any ;
  previewUrl:any = null;

 
  constructor(private _fb: FormBuilder, private _crudService: CrudService, private _imageService: ImageService, private _toastr: ToastrService, private ngxService: NgxUiLoaderService) {
    this.mycontent = `<p>Description Here</p>`;
  }

  ngOnInit() {

   // this.ngxService.start();

    this.departmentForm = this._fb.group({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('Description here',Validators.required),
      image_url: '',
      stat: ''
    })

    
    this.loadConfig();
   
  }

  

  uploadImage = (fData) =>{

 
    return new Promise((resolve,reject)=>{
      this._imageService.uploadImage(fData).subscribe( data => {
        let response: any = data
        resolve(response);
       
      }, error =>{
        reject(error)
      })

    })
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


  prepareData(){
    this.ngxService.start();

    if(this.formData != null){

      this.uploadImage(this.formData).then((response: any) => {
        this.departmentForm.patchValue({
          image_url: response.data.link
        });
      }).then(()=>{
        this.saveDepartment();
      }).catch((e)=>{
        console.warn(e);
      })
    }else {
      this.saveDepartment();
    }


    

    

  }

 

  saveDepartment(){

      this._crudService.addItem(this.departmentForm.value, "department")
      .subscribe(data => {
        this.responseData = data;
        this.departmentForm.reset();
        this.myForm.resetForm();
        this.previewUrl = null;
      }, error => {

      console.warn(error)
      }).add(()=>{
        this.ngxService.stop();
      })
   


  }





  fileProgress(fileInput: any) {
    this.fileData = <File>fileInput.target.files[0];
    this.formData = new FormData();
    this.formData.append('image', this.fileData, this.fileData.name);
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


    isActive(){
     
      this.status = !this.status;
      this.departmentForm.patchValue({
        stat : this.status ? 'active' : 'inactive'
      })
    }




}
