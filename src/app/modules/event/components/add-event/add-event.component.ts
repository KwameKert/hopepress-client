import { Component, OnInit, ViewChild } from '@angular/core';
import {FormBuilder, Validators, FormControl, NgForm} from '@angular/forms';
import { CrudService, ImageService } from 'src/app/shared/service/index';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit {

  @ViewChild('myForm') myForm: NgForm;
  ckeConfig: any;
  status:  Boolean ;
  mycontent: string;
  eventForm : any;
  responseData: any;
  fileData: File = null;
  formData: any ;
  previewUrl:any = null;


    constructor(private _fb: FormBuilder, private _crudService: CrudService, private _imageService: ImageService, private _toastr: ToastrService, private ngxService: NgxUiLoaderService) {
    this.mycontent = `<p>Description Here</p>`;
  }


  ngOnInit(): void {


    this.eventForm = this._fb.group({
      name: new FormControl('', Validators.required),
      description: new FormControl('Description here', Validators.required),
      startDate: new FormControl('', Validators.required),
      endDate: new FormControl('', Validators.required),
      image_url: '',
      stat : ''
    })

  }



  uploadImage =  () =>{

 
      this._imageService.uploadImage(this.formData).subscribe( data => {
        let response: any = data
        this.eventForm.patchValue({
          image_url: response.data.link
        })
       
      }, error =>{
       console.error(error)
      })

  }



  saveEvent = async ()=> {

    this.ngxService.start();
    await this.uploadImage();

    this._crudService.addItem(this.eventForm.value,"event").subscribe(data=>{

      this.myForm.resetForm();
      this.previewUrl = null;
    }, error=>{

    }).add(()=>{
      this.ngxService.stop()
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
