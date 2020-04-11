import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AddEventComponent } from './components/add-event/add-event.component';
import { UpdateEventComponent } from './components/update-event/update-event.component';
import { ViewEventComponent } from './components/view-event/view-event.component';
import { ListEventComponent } from './components/list-event/list-event.component';


const routes: Routes= [
  {path: 'add', component: AddEventComponent},
  {path: 'list', component: ListEventComponent },
  {path: 'update/:id', component: UpdateEventComponent},
  {path: 'view/:id', component: ViewEventComponent},
]




@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventRoutingModule { }
