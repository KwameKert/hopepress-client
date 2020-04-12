import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators, FormControl} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import { CrudService, ImageService } from 'src/app/shared/service/index';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-update-leader',
  templateUrl: './update-leader.component.html',
  styleUrls: ['./update-leader.component.scss']
})
export class UpdateLeaderComponent implements OnInit {

  status: Boolean ;
  ckeConfig: any;
  mycontent: string;
  leaderForm : any;
  responseData: any;
  formData: any;
  fileData: File = null;
  previewUrl:any = null;
  leaderId : any ;

  departments: any = null;

  constructor(private _fb: FormBuilder, private _crudService: CrudService, private _imageService: ImageService, private route: ActivatedRoute, private ngxService: NgxUiLoaderService) {}
  

  ngOnInit(): void {
    this.leaderId = this.route.snapshot.paramMap.get('id');
    this.loadForm();
    this.listDepartments();
    this.loadConfig();
    this.loadLeaderData()

  }


  loadForm(){
    this.leaderForm = this._fb.group({
      id: '',
      name: new FormControl('', [Validators.required]),
      role: new FormControl('', [Validators.required]),
      description: new FormControl('Description here',Validators.required),
      image_url: '',
      department_id: '',
      stat: ''
    })
  }


  loadLeaderData(){
    this._crudService.fetchItem({id: this.leaderId, module: "leader"})
                     .subscribe(data=>{
                      this.responseData = data;                 
                        this.patchLeader(this.responseData.data);
              
                     }, error =>{
                      console.warn(error)

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

    this._crudService.updateItem({data: this.leaderForm.value,module: "leader"})
    .subscribe(data => {
      console.log("updated")
    
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

      console.log(this.leaderForm.value,this.status)


    }




    patchLeader(leader){
     
      this.status = leader.stat == 'active' ? true : false;
      this.previewUrl = leader.image_url;
      this.leaderForm.patchValue({
        id: leader.id,
        name: leader.name,
        role:  leader.role ,
        description: leader.description,
        image_url: leader.image_url,
        department_id: leader.dep_id,
        stat : leader.stat == 'active' ? true: false,
      })

      leader.stat == 'active' ? this.status = true: this.status = false;
      

    }

}
