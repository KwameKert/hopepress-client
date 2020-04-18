import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/dataservice';


@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {

  currentLink: any  = '';
  timeString: string = '';
  sideBarOpen = true;

  constructor(private _dataService: DataService) { 
    
    this._dataService.getLink().subscribe(data=>{
      this.currentLink = data;
    })
    this._dataService.getCountDown().subscribe(data=>{
      this.countDown(data);
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



  convertToString(time){
    let day =  Math.floor(time / (24 * 3600))

    time %= (24 * 3600)

    let hour = Math.floor(time / 3600);

    time %= 3600;

    let minutes = Math.floor(time / 60) ; 
  
    time  %= 60; 
    let seconds = time; 

    if(seconds > 0){
      this.timeString = ` ${seconds}s`;
    }

    if(minutes > 0){

      this.timeString  = `${minutes}m  :`+ this.timeString;
    }

    if( hour > 0) {

      this.timeString  = `${hour}h :`+ this.timeString;
    }

    if(day > 0){
      this.timeString  = `${day}d :`+ this.timeString;
    }
  

    //console.log()
  }


  countDown(time){
    time = Math.floor(time/1000)
      var interval = setInterval(() => { 
        if(time > 0){

          this.convertToString(time--)
        }
    },1000);


  }


}
