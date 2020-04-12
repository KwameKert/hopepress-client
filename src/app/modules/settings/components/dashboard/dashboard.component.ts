import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ViewEventComponent } from 'src/app/modules/event/components/view-event/view-event.component';
import { MatDialog } from '@angular/material/dialog';
import { CrudService } from 'src/app/shared/service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @ViewChild('cd', { static: false }) private countdown;
  leftTime = 30;
  status: boolean = true;
  found: boolean = false;
    
  displayedColumns: string[] = ['id', 'name', 'description' ,'start','end', 'status', 'action' ];
  dataSource : any;
  responseData: any;
  showTable: boolean;
  isLoading: boolean ;
  pageEvent: PageEvent;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private _toastr: ToastrService,  public dialog: MatDialog, private _crudService: CrudService) { }

  ngOnInit() {
   
    this.isLoading  = true;
    this.listEvents(null);
   
  }

  listEvents(event?:PageEvent){
    this._crudService.fetchAll("event").subscribe(data=>{
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
    }).add(()=>{
      this.isLoading = false;
    })

   
  }

public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }


  openEvent(event): void {
    const dialogRef = this.dialog.open(ViewEventComponent, {
      width: '950px',
      height: '520px',
      data: event
    });

    dialogRef.afterClosed().subscribe(result => {
    //  console.log('The dialog was closed');
      // this.animal = result;
    });
  }



  handleEvent(event: any){
  if(event.left < 1){
    console.log("Counter done")
  }  
  }






}
