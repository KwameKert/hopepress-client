import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators, FormControl} from '@angular/forms';
import { CrudService, ImageService } from 'src/app/shared/service/index';
import { async } from '@angular/core/testing';
import { NgxUiLoaderService } from 'ngx-ui-loader';


@Component({
  selector: 'app-add-leader',
  templateUrl: './add-leader.component.html',
  styleUrls: ['./add-leader.component.scss']
})
export class AddLeaderComponent implements OnInit {


  status: Boolean ;
  ckeConfig: any;
  mycontent: string;
  leaderForm : any;
  responseData: any;
  fileData: File = null;
  previewUrl:any = null;
  formData = new FormData();

  departments: any = null;

  constructor(private _fb: FormBuilder, private _crudService: CrudService, private _imageService: ImageService,  private ngxService: NgxUiLoaderService) {
    this.mycontent = `<p>Description Here</p>`;
  }

  ngOnInit(): void {

    this.loadForm();
    this.listDepartments()
  }


  loadForm(){
    this.leaderForm = this._fb.group({
      name: new FormControl('', [Validators.required]),
      role: new FormControl('', [Validators.required]),
      description: new FormControl('Description here',Validators.required),
      image_url: '',
      department_id: '',
      stat: ''
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

 


  uploadImage(){

    return new Promise((resolve,reject)=>{
      this._imageService.uploadImage(this.formData).subscribe(data =>{
        let response: any = data
        this.leaderForm.patchValue({
          image_url: response.data.link
        });
        resolve(true)
      }, error=>{
        console.warn(error)
        reject(false)
      })


    })
  

  }



  persitData(){

    this._crudService.addItem(this.leaderForm.value, "leader")
    .subscribe(data => {
      this.responseData = data;
      this.leaderForm.reset();
      this.previewUrl = null;
    }, error => {

    console.warn(error)
    })
  }



  saveLeader = async () =>{
    
    this.ngxService.start();

    if(this.formData){
      await this.uploadImage().then(()=>{
        this.persitData();
      }).catch(()=>{
        this.persitData()
      })
    }else{
      this.persitData()
    }
    
    
    this.ngxService.stop()
   
  }


  fileProgress(fileInput: any) {
    this.fileData = <File>fileInput.target.files[0];
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



    listDepartments(){
      this._crudService.fetchAll("department").subscribe(data=>{
        this.responseData = data;
        if(this.responseData.data != null){
          this.responseData = data;
        
          //console.log(this.responseData.data)
          this.departments = this.responseData.data.filter((department)=> department.stat == "active");
          //console.log(this.departments)
        }
        
      }, error=>{
        console.warn(error)
      })
  
     
    }
  

    isActive(){
     
      this.status = !this.status;
      this.leaderForm.patchValue({
        stat : this.status ? 'active' : 'inactive'
      })
    }



}
