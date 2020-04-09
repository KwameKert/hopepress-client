import { Component, OnInit, ViewChild } from '@angular/core';
import {FormBuilder, Validators, FormControl} from '@angular/forms';
import { CrudService } from 'src/app/shared/service/crud.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';

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


  constructor(private route: ActivatedRoute,private _fb: FormBuilder, private _toastr: ToastrService, private _crudService: CrudService, private ngxService: NgxUiLoaderService) { }

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


  saveDepartment(){

    this._crudService.updateItem({data: this.departmentForm.value, module: "department"})
    .subscribe(data => {
      this.responseData = data;
    }, error => {

    console.warn(error)
    })
    
  }


  patchDepartmentForm(department){
    this.departmentForm.patchValue({
      id: department.id,
      name: department.name,
      description: department.description,
      stat : department.stat == 'active' ? true: false
    })
  }




  isActive(){
     
    
    this.status = !this.status;
    this.departmentForm.patchValue({
      stat : this.status ? 'active' : 'inactive'
    })


  }








}
