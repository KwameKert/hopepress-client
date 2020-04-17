import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import {Router} from '@angular/router';
import { DataService } from 'src/app/shared/dataservice';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  selectedLink: string = '';


 // @Output() linkSelected: EventEmitter<any> = new EventEmitter<any>();

 
  constructor(private _router: Router, private _dataService: DataService) { }

  ngOnInit() {
  }



  getLinkName(){
    return this.selectedLink;
  }

  setLinkName(name: string){

    this.selectedLink = name;

    this._dataService.setLink(this.selectedLink);
    this._router.navigate([`/${name}s/list`])
  }



  changeName(name: any){
    
    if(name == 'dashboard'){
      this._router.navigate(['/dashboard'])
    }else{

      //this.linkSelected.emit(name);
      this._dataService.setLink(`/${name}s/list`);
      this._router.navigate([`/${name}s/list`])
    
      
    }

  }

}
