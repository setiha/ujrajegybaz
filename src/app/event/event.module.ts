import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventRoutingModule } from './event-routing.module';
import {EventcardComponent} from "./eventcard/eventcard.component";
import {EventComponent} from "./event.component";
import {EventListComponent} from "./event-list/event-list.component";
import {EventDetailComponent} from "./event-detail/event-detail.component";
import {FormsModule} from "@angular/forms";
import {AlertModule} from "ngx-bootstrap/alert";
import {EventcardModule} from "./eventcard/eventcard.module";


@NgModule({
  declarations: [
    EventComponent,
    EventListComponent,
    EventDetailComponent,

  ],
  imports: [
    CommonModule,
    EventRoutingModule,
    FormsModule,
    AlertModule,
    EventcardModule
  ]
})
export class EventModule { }
