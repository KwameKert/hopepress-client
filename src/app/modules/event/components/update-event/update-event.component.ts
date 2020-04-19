import { Component, OnInit, ViewChild } from '@angular/core';
import {FormBuilder, Validators, FormControl, NgForm} from '@angular/forms';
import { CrudService, ImageService } from 'src/app/shared/service/index';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import {ActivatedRoute} from '@angular/router';
import { DataService } from 'src/app/shared/dataservice';

@Component({
  selector: 'app-update-event',
  templateUrl: './update-event.component.html',
  styleUrls: ['./update-event.component.scss']
})
export class UpdateEventComponent implements OnInit {

  ckeConfig: any;
  status:  Boolean ;
  mycontent: string;
  eventForm : any;
  responseData: any;
  fileData: File = null;
  formData: any ;
  previewUrl:any = null;
  eventId: any ;
  offset = new Date().getTimezoneOffset() * 1000 * 60

 constructor(private _fb: FormBuilder, private _crudService: CrudService, private _imageService: ImageService, private _toastr: ToastrService, private ngxService: NgxUiLoaderService, private route: ActivatedRoute, private _dataService: DataService) {
    this.mycontent = `<p>Description Here</p>`;
  }


  ngOnInit(): void {

    this.eventId = this.route.snapshot.paramMap.get('id');

    this.eventForm = this._fb.group({
      id: '',
      name: new FormControl('', Validators.required),
      description: new FormControl('Description here', Validators.required),
      startDate: new FormControl('', Validators.required),
      endDate: new FormControl('' , Validators.required),
      imageUrl: '',
      stat : ''
    })


    this.loadEventData();
  
  }



  loadEventData(){

    this._crudService.fetchItem({id: this.eventId , module:"event"}).subscribe(data=>{
        let responseData: any = data

        if (responseData.data != null){
          this.patchEvent(responseData.data);
        }



    }, error =>{
      console.error("Oops an error occured")
    })

  }

  patchEvent(event){

    this.eventForm.patchValue({
      id: event.id,
      name: event.name,
      description: event.description,
      imageUrl: event.imageUrl,
      stat : event.stat,
      startDate: this.getLocalDate(event.startDate),
      endDate: this.getLocalDate(event.endDate),
    })

    this.status = event.stat == 'active' ? true: false;

    //console.log(this.eventForm.value)

    this.previewUrl = event.imageUrl
  }




 getLocalDate = value => {
    const offsetDate = new Date(value).valueOf() - this.offset
    const date = new Date(offsetDate).toISOString()
    return date.substring(0, 16)
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


  uploadImage =  () =>{

    return new Promise((resolve,reject)=>{
     this._imageService.uploadImage(this.formData).subscribe( data => {
       let response: any = data
       this.eventForm.patchValue({
         imageUrl: response.data.link
       })
      
       resolve(true)
     }, error =>{
       reject(error)
      console.error(error)
     })

    }) 

 }



 saveEvent = async ()=> {

   this.ngxService.start();
   if(this.formData){
    await this.uploadImage().then(()=>{
      this.persistData()
    });
  }else{
    this.persistData();
  }

    this.ngxService.stop()

  }

  persistData(){
    this._crudService.updateItem({data: this.eventForm.value,module:"event"}).subscribe(data=>{
      
      console.log("done")
    }, error=>{
      console.error(error)
    }).add(()=>{
      this._dataService.resetCounter();
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
      this.eventForm.patchValue({
        stat : this.status ? 'active' : 'inactive'
      })


    }
}
