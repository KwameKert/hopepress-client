import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpdateLeaderComponent } from './components/update-leader/update-leader.component';
import { ListLeaderComponent } from './components/list-leader/list-leader.component';





@NgModule({
  declarations: [UpdateLeaderComponent, ListLeaderComponent],
  imports: [
    CommonModule
  ]
})
export class LeaderModule { }
