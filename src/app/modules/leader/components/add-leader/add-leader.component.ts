import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators, FormControl} from '@angular/forms';
import { CrudService, ImageService } from 'src/app/shared/service/index';


@Component({
  selector: 'app-add-leader',
  templateUrl: './add-leader.component.html',
  styleUrls: ['./add-leader.component.scss']
})
export class AddLeaderComponent implements OnInit {


  status: Boolean = false;
  ckeConfig: any;
  mycontent: string;
  leaderForm : any;
  responseData: any;
  fileData: File = null;
  previewUrl:any = null;

  departments: any = null;

  constructor(private _fb: FormBuilder, private _crudService: CrudService, private _imageService: ImageService) {
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

  saveLeader(){
    
    console.log(this.leaderForm.value)
    
    this._crudService.addItem(this.leaderForm.value, "leader")
                      .subscribe(data => {
                        this.responseData = data;
                        this.leaderForm.reset();
                        this.previewUrl = null;
                      }, error => {

                      console.warn(error)
                      })
  }




  fileProgress(fileInput: any) {
    this.fileData = <File>fileInput.target.files[0];
    let formData = new FormData();
    formData.append('image', this.fileData, this.fileData.name);
    this._imageService.uploadImage(formData).subscribe(data =>{
      let response: any = data
      this.leaderForm.patchValue({
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



    listDepartments(){
      this._crudService.fetchAll("department").subscribe(data=>{
        this.responseData = data;
        if(this.responseData.data != null){
          this.responseData = data;
        
          //console.log(this.responseData.data)
          this.departments = this.responseData.data.filter((department)=> department.stat == "true");
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
