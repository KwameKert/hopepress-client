import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  @Output() linkSelected: EventEmitter<any> = new EventEmitter<any>();

 
  constructor() { }

  ngOnInit() {
  }


 


  changeName(name){
    this.linkSelected.emit(name);
  }

}
