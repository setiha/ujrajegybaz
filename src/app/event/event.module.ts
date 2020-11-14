import {ModuleWithProviders, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventRoutingModule } from './event-routing.module';
import {EventcardComponent} from "./eventcard/eventcard.component";
import {EventComponent} from "./event.component";
import {EventListComponent} from "./event-list/event-list.component";
import {EventDetailComponent} from "./event-detail/event-detail.component";
import {FormsModule} from "@angular/forms";
import {AlertModule} from "ngx-bootstrap/alert";
import {EventcardModule} from "./eventcard/eventcard.module";
import {CoreModule} from "../core/core.module";
import {EventService} from "./event.service";


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
    EventcardModule,
    CoreModule
  ]
})
export class EventModule {
  static forRoot(): ModuleWithProviders{
    return{
      ngModule: EventModule,
      providers: [EventService]
    };
  }
}
