import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CollapseModule} from 'ngx-bootstrap/collapse';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {JumbotronComponent} from './core/jumbotron/jumbotron.component';
import {EventcardComponent} from './event/eventcard/eventcard.component';
import {FooterComponent} from './core/footer/footer.component';
import {NavbarComponent} from './core/navbar/navbar.component';
import {EventListComponent} from './event/event-list/event-list.component';
import {EventService} from './shared/event.service';
import {UserService} from './shared/user.service';
import {AlertModule} from 'ngx-bootstrap/alert';
import {TicketService} from './shared/ticket.service';
import {LoggedInGuard} from './shared/logged-in.guard';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthInterceptor} from './shared/auth-interceptor';
import { TicketDetailsCardComponent } from './ticket/ticket-details-card/ticket-details-card.component';
import { BiddingCardComponent } from './ticket/bidding-card/bidding-card.component';
import {MomentModule} from "angular2-moment";
import 'moment/locale/hu';
import { BidFormComponent } from './ticket/bid-form/bid-form.component';
import { LoadingSpinnerComponent } from './core/loading-spinner/loading-spinner.component' ;
import {BidService} from "./shared/bid.service";


@NgModule({
  declarations: [
    AppComponent,
    JumbotronComponent,
    EventcardComponent,
    FooterComponent,
    NavbarComponent,
    ...AppRoutingModule.routableComponent,
    EventListComponent,
    TicketDetailsCardComponent,
    BiddingCardComponent,
    BidFormComponent,
    LoadingSpinnerComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CollapseModule.forRoot(),
    AlertModule.forRoot(),
    HttpClientModule,
    MomentModule
  ],
  providers: [EventService, UserService, TicketService, LoggedInGuard, BidService,
{
  provide: HTTP_INTERCEPTORS,
    useClass:  AuthInterceptor,
    multi: true,
}
],
bootstrap: [AppComponent]
})
export class AppModule {
}
