import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpdateEventComponent } from './components/update-event/update-event.component';
import { ViewEventComponent } from './components/view-event/view-event.component';
import { AddEventComponent } from './components/add-event/add-event.component';
import { ListEventsComponent } from './components/list-events/list-events.component';



@NgModule({
  declarations: [UpdateEventComponent, ViewEventComponent, AddEventComponent, ListEventsComponent],
  imports: [
    CommonModule
  ]
})
export class EventsModule { }
