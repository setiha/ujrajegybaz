import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { TicketService } from './shared/ticket.service';
import { UserService } from './shared/user.service';
import { TicketDetailsCardComponent } from './ticket/ticket-details-card/ticket-details-card.component';
import { BiddingCardComponent } from './ticket/bidding-card/bidding-card.component';
import { MomentModule } from 'angular2-moment';
import 'moment/locale/hu';
import { BidFormComponent } from './ticket/bid-form/bid-form.component';
import { BidService } from './shared/bid.service';
import * as firebase from 'firebase';
import { environment } from '../environments/environment';
import { EventcardModule } from './event/eventcard/eventcard.module';
import { CoreModule } from './core/core.module';
import { EventModule } from './event/event.module';
import { ChatModule } from './chat/chat.module';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import {CollapseModule} from "ngx-bootstrap/collapse";
import {AlertModule} from "ngx-bootstrap/alert";
import {LoggedInGuard} from "./shared/logged-in.guard";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AboutModule} from "./about/about.module";


@NgModule({
  declarations: [
    AppComponent,
    ...AppRoutingModule.routableComponent,
    TicketDetailsCardComponent,
    BiddingCardComponent,
    BidFormComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    CollapseModule.forRoot(),
    AlertModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    MomentModule,
    EventcardModule,
    CoreModule,
    EventModule.forRoot(),
    ChatModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  providers: [
    UserService,
    TicketService,
    LoggedInGuard,
    BidService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    firebase.initializeApp(environment.firebase);
  }
}
