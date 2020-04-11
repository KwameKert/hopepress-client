import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpdateEventComponent } from './components/update-event/update-event.component';
import { ViewEventComponent } from './components/view-event/view-event.component';
import { AddEventComponent } from './components/add-event/add-event.component';
import { EventRoutingModule } from './event-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ListEventComponent } from './components/list-event/list-event.component';



@NgModule({
  declarations: [UpdateEventComponent, ViewEventComponent, AddEventComponent, ListEventComponent],
  imports: [
    CommonModule, 
    EventRoutingModule,
    SharedModule
  ]
})
export class EventsModule { }
