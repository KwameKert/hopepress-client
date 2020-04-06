import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpdateLeaderComponent } from './components/update-leader/update-leader.component';
import { ListLeaderComponent } from './components/list-leader/list-leader.component';
import { AddLeaderComponent } from './components/add-leader/add-leader.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { LeaderRoutingModule } from './leader-routing.module';
import { ViewLeaderComponent } from './components/view-leader/view-leader.component';





@NgModule({
  declarations: [UpdateLeaderComponent, ListLeaderComponent, AddLeaderComponent, ViewLeaderComponent],
  imports: [
    CommonModule,
    SharedModule,
    LeaderRoutingModule
  ]
})
export class LeaderModule { }
