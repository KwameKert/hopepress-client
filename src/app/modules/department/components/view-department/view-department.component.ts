import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CrudService } from 'src/app/shared/service';
import { ViewLeaderComponent } from 'src/app/modules/leader/components/view-leader/view-leader.component';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-view-department',
  templateUrl: './view-department.component.html',
  styleUrls: ['./view-department.component.scss']
})
export class ViewDepartmentComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'role' , 'status','uploaded', 'action' ];
  dataSource : any;
  departmentId: any; 
  responseData: any;
  isLoaded: boolean = false;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private route: ActivatedRoute,private _crudService: CrudService, public dialog: MatDialog){}
    

  ngOnInit() {
    this.departmentId = this.route.snapshot.paramMap.get('id');

    this.fetchDepartment();
  }


  fetchDepartment = async () => {

    await this._crudService
              .fetchItem({id: this.departmentId, module: "department"})
              .subscribe(data=>{
                let response: any= data
                this.responseData = response.data
                this.dataSource =this.responseData.leaders

                }, error=>{

                }).add(()=>{
                  this.isLoaded = true;
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


  


}
