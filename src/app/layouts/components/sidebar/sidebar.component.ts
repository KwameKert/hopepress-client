import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  sermonLinks: boolean = false;
  eventLinks: boolean = false;
  departmentLinks: boolean = false;
  leaderLinks: boolean = false;
  constructor() { }

  ngOnInit() {
  }

  showSermonLinks(){
    this.sermonLinks = !this.sermonLinks;
  }

  showDepartmentLinks(){
    this.departmentLinks = !this.departmentLinks;
  }

  showLeaderLinks(){
    this.leaderLinks = !this.leaderLinks;
  }

  showEventLinks(){
    this.eventLinks = !this.eventLinks;
  }


  changeName(name){
    
  }

}
