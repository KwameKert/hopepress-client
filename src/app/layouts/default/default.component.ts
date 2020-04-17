import { Component, OnInit } from '@angular/core';
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
    })

  }

  ngOnInit() {


  }

  toggleSidebar(){
    this.sideBarOpen = !this.sideBarOpen;
  }


  changeName(name){
    this.currentLink = name;
  }


}
