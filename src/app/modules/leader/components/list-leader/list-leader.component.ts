import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatDialog} from '@angular/material/dialog';
import {  MatSnackBar,  } from '@angular/material/snack-bar';
import {  MatTableDataSource,  } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { CrudService } from 'src/app/shared/service/crud.service';
import { Router } from '@angular/router';
import { DeleteItemComponent } from 'src/app/modules/shared/delete-item/delete-item.component';
import { ViewLeaderComponent } from '../view-leader/view-leader.component';

@Component({
  selector: 'app-list-leader',
  templateUrl: './list-leader.component.html',
  styleUrls: ['./list-leader.component.scss']
})
export class ListLeaderComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'role' ,'uploaded', 'action' ];
  dataSource : any;
  responseData: any;
  showTable: boolean;
  isLoading: boolean ;
  pageEvent: PageEvent;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor( private _toastr: ToastrService, public dialog: MatDialog, private _crudService: CrudService, private _snackBar: MatSnackBar, private _router: Router) { }

  ngOnInit() {
   
    this.isLoading  = true;
    this.listLeaders();
    this.isLoading = false;
  }

  listLeaders(){
    this._crudService.fetchAll("leader").subscribe(data=>{
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


  openLeader(leader): void {
    const dialogRef = this.dialog.open(ViewLeaderComponent, {
      width: '850px',
      height: '380px',
      data: leader
    });

    dialogRef.afterClosed().subscribe(result => {
    //  console.log('The dialog was closed');
      // this.animal = result;
    });
  }


  deleteLeader(id: Number){
    let data = {
      module: 'leader',
      id
    }
    const dialogRef = this.dialog.open(DeleteItemComponent, {
      width: '550px',
      height: '180px',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.event){
        this._snackBar.open("Leader Deleted 🙂  ", "", {
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


  updateLeader(id: any){
    this._router.navigate([`leaders/update/${id}`]);
  }


}
