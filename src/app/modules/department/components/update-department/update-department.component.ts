import { Component, OnInit, ViewChild } from '@angular/core';
import {FormBuilder, Validators, FormControl} from '@angular/forms';
import { CrudService } from 'src/app/shared/service/crud.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ImageService } from 'src/app/shared/service';

@Component({
  selector: 'app-update-department',
  templateUrl: './update-department.component.html',
  styleUrls: ['./update-department.component.scss']
})
export class UpdateDepartmentComponent implements OnInit {

  status: boolean ;
  departmentId: any;
  ckeConfig: any;
  mycontent: string;
  departmentForm : any;
  responseData: any;
  fileData: File = null;
  formData: any ;
  previewUrl:any = null;




  constructor(private route: ActivatedRoute,private _fb: FormBuilder, private _toastr: ToastrService, private _crudService: CrudService, private ngxService: NgxUiLoaderService, private _imageService: ImageService) { }

   ngOnInit() {
    this.departmentId = this.route.snapshot.paramMap.get('id');
    this.loadForm();
    this.loadConfig();
    this.loadDepartmentData();
   
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
      id:'',
      name: new FormControl('', [Validators.required]),
      description: new FormControl('Description here',Validators.required),
      image_url: '',
      stat: ''
    })
  }


  loadDepartmentData(){
    this.ngxService.start();
    this._crudService.fetchItem({id: this.departmentId, module: "department"})
                     .subscribe(data=>{
                      this.responseData = data;                 
                        this.patchDepartmentForm(this.responseData.data);
              
                     }, error =>{
                      this._toastr.info("Oops an error. 🥺","",{
                        timeOut:2000
                      })

                     }) .add(()=>{
                       this.ngxService.stop()
                     })



  }



  uploadImage = () =>{

 
    return new Promise((resolve,reject)=>{
      this._imageService.uploadImage(this.formData).subscribe( data => {
        let response: any = data
        this.departmentForm.patchValue({
          image_url: response.data.link
        })
        resolve(response);
       
      }, error =>{
        reject(error)
      })

    })
  }


  saveDepartment = async () => {

    this.ngxService.start()
    if(this.formData){
      await this.uploadImage().then(()=>{
         this.persistData();
      })
    }else{
       this.persistData();
    }
    this.ngxService.stop();
    
  }


  persistData(){
    this._crudService.updateItem({data: this.departmentForm.value, module: "department"})
    .subscribe(data => {
      this.responseData = data;
    }, error => {
    console.warn(error)
    })
  }


  patchDepartmentForm(department){

    this.previewUrl = department.image_url;

    this.departmentForm.patchValue({
      id: department.id,
      name: department.name,
      image_url: department.image_url,
      description: department.description,
      stat : department.stat 
    })

    this.status = department.stat == 'active' ? true: false;
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
