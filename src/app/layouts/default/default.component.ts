import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader'; 
import { DataService } from 'src/app/shared/dataservice';


@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {

  currentLink: any  = '';
  sideBarOpen = true;

  constructor(private _dataService: DataService) { 

    this._dataService.getLink().subscribe(data=>{
      this.currentLink = data;
      console.log(this.currentLink);
    })

  }

  ngOnInit() {

   // console.log("default is called")
   // this.currentLink  = 'Test'

  }

  toggleSidebar(){
    this.sideBarOpen = !this.sideBarOpen;
  }


  changeName(name){

   // console.log('from default',name)

    this.currentLink = name;

    //console.log(this.currentLink)
  }


}
