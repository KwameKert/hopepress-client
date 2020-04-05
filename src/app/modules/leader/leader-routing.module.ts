import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddLeaderComponent } from './components/add-leader/add-leader.component';

import { ListLeaderComponent } from './components/list-leader/list-leader.component';
import { UpdateLeaderComponent } from './components/update-leader/update-leader.component';



const routes: Routes = [ 

  {path: 'add', component: AddLeaderComponent},
  {path: 'list', component: ListLeaderComponent},
  {path: 'update/:id', component: UpdateLeaderComponent},
  
];

@NgModule({
  declarations: [],
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  
})
export class LeaderRoutingModule { }
