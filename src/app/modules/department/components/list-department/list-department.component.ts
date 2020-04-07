import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatDialog} from '@angular/material/dialog';
import {  MatSnackBar,  } from '@angular/material/snack-bar';
import {  MatTableDataSource,  } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { CrudService } from 'src/app/shared/service/crud.service';
import { Router } from '@angular/router';
import { DeleteItemComponent } from 'src/app/modules/shared/delete-item/delete-item.component';
import { ViewDepartmentComponent } from '../view-department/view-department.component';

@Component({
  selector: 'app-list-department',
  templateUrl: './list-department.component.html',
  styleUrls: ['./list-department.component.scss']
})
export class ListDepartmentComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'description' ,'status','uploaded', 'action' ];
  dataSource : any;
  responseData: any;
  showTable: boolean;
  isLoading: boolean ;
  pageEvent: PageEvent;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor( private _toastr: ToastrService, public dialog: MatDialog, private _crudService: CrudService, private _snackBar: MatSnackBar, private _router: Router) { }

  ngOnInit() {
   
    this.isLoading  = true;
    this.listDepartments(null);
    this.isLoading = false;
  }

  listDepartments(event?:PageEvent){
    this._crudService.fetchAll("department").subscribe(data=>{
      this.responseData = data;
      if(this.responseData.data != null){
        this.responseData = data;
        this.dataSource = new MatTableDataSource(this.responseData.data);
        this.dataSource.paginator = this.paginator;
        this.showTable=true;
      }
      
    }, error=>{
      this._toastr.error("Oops an error. 🥺","",{
        timeOut:2000
      })
    })

   
  }

public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }


  openDepartment(department): void {
    const dialogRef = this.dialog.open(ViewDepartmentComponent, {
      width: '850px',
      height: '380px',
      data: department
    });

    dialogRef.afterClosed().subscribe(result => {
    //  console.log('The dialog was closed');
      // this.animal = result;
    });
  }


  deleteDepartment(id: Number){
    let data = {
      module: 'department',
      id
    }
    const dialogRef = this.dialog.open(DeleteItemComponent, {
      width: '550px',
      height: '180px',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.event){
        this._snackBar.open("Department Deleted 🙂  ", "", {
          duration: 2000,
        });
        if(result.data != null){
          this.dataSource = new MatTableDataSource(result.data);
          this.dataSource.paginator = this.paginator;
          this.showTable=true;
        }

      }else{

        this._toastr.error("Oops an error. 🥺","",{
          timeOut:2000
        })
      }
    });
  }


  updateDepartment(id: any){
    this._router.navigate([`departments/update/${id}`]);
  }

}
