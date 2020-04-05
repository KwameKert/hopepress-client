import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-view-department',
  templateUrl: './view-department.component.html',
  styleUrls: ['./view-department.component.scss']
})
export class ViewDepartmentComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ViewDepartmentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, ) { 
    }

  ngOnInit() {
  }


  close(): void {
    this.dialogRef.close();
  }


}
