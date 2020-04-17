import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { DataService } from 'src/app/shared/dataservice';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  selectedLink: string = '';

  links: Array<object> = [
    {name: 'dashboard', icon: 'home'},
    {name: 'sermon',  icon: 'subscriptions'},
    {name: 'event',  icon: 'event'},
    {name: 'department',  icon: 'business'},
    {name: 'leader', icon: 'supervised_user_circle'},
  ]
    

 
  constructor(private _router: Router, private _dataService: DataService) { }

  ngOnInit() {
  }




  setLinkName(name: string){

    this.selectedLink = name;

    this._dataService.setLink(this.selectedLink);

    if(name == 'dashboard'){
      this._router.navigate(['/dashboard'])
    }else{
      this._router.navigate([`/${name}s/list`])
    }

  }


}
