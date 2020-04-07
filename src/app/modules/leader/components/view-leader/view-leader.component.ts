import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-view-leader',
  templateUrl: './view-leader.component.html',
  styleUrls: ['./view-leader.component.scss']
})
export class ViewLeaderComponent implements OnInit {

  sermonUrl : any;
  constructor(
    public dialogRef: MatDialogRef<ViewLeaderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { 
  
    }

  ngOnInit() {
 //   console.log(this.data.url)
  }

  close(): void {
    this.dialogRef.close();
  }

}
