import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ViewEventComponent } from 'src/app/modules/event/components/view-event/view-event.component';
import { MatDialog } from '@angular/material/dialog';
import { CrudService } from 'src/app/shared/service';
import { MatTableDataSource } from '@angular/material/table';
import { SettingsService } from '../../settings.service';
import { DataService } from 'src/app/shared/dataservice';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @ViewChild('cd', { static: false }) private countdown;

  timeString: string = '';
  date = new Date('2019-05-26T00:00:00');
  timeLeft: number =  0;
  sermonCount: number = 0;
  eventCount: number = 0;
  status: boolean = true;
  found: boolean = false;
    
  displayedColumns: string[] = ['id', 'name', 'description' ,'start','end', 'status', 'action' ];
  dataSource : any;
  responseData: any;
  showTable: boolean;
  isLoading: boolean ;
  pageEvent: PageEvent;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;



  constructor(private _toastr: ToastrService,  public dialog: MatDialog, private _crudService: CrudService, private _dashboardService: SettingsService,  private _dataService: DataService) { }

  ngOnInit() {
   
    this.isLoading  = true;
    this.listEvents(null);
    this.loadComponents();

   
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

  loadComponents(){
    this._dashboardService.getDashBoard().subscribe(data=>{
        if(data.status == 302){
          this.sermonCount = data.data.sermonCount,
          this.eventCount = data.data.eventCount
         this.timeLeft = Math.round(parseInt(data.data.nextEvent))
        this.countDown(this.timeLeft)
        this._dataService.setCountDown(data.data.nextEvent);
        }
    }, error=>{
      console.error(error)
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


  config = {leftTime: 6535244769.9, clock: ['d', 100, 2, 'h', 100, 2, 'm', 60, 2, 's', 60, 2, 'u', 10, 1] }

  //convert seconds

  convertToString(time){
    let day =  Math.floor(time / (24 * 3600))

    time %= (24 * 3600)

    let hour = Math.floor(time / 3600);

    time %= 3600;

    let minutes = Math.floor(time / 60) ; 
  
    time  %= 60; 
    let seconds = time; 

    this.timeString = `${day}d : ${hour}h : ${minutes}m  : ${seconds}s`;

    //console.log()
  }


  countDown(time){
    var interval = setInterval(() => { 
        this.convertToString(time--)
    },1000);
  }


}
