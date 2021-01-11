import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CollapseModule} from 'ngx-bootstrap/collapse';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {UserService} from './shared/user.service';
import {AlertModule} from 'ngx-bootstrap/alert';
import {TicketService} from './shared/ticket.service';
import {LoggedInGuard} from './shared/logged-in.guard';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TicketDetailsCardComponent} from './ticket/ticket-details-card/ticket-details-card.component';
import {BiddingCardComponent} from './ticket/bidding-card/bidding-card.component';
import {MomentModule} from 'angular2-moment';
import 'moment/locale/hu';
import {BidFormComponent} from './ticket/bid-form/bid-form.component';
import {BidService} from './shared/bid.service';
import * as firebase from 'firebase';
import {environment} from '../environments/environment';
import {EventModule} from './event/event.module';
import {EventcardModule} from './event/eventcard/eventcard.module';
import {CoreModule} from './core/core.module';
import {AboutModule} from './about/about.module';
import {ChatModule} from './chat/chat.module';
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {ServiceWorkerModule} from '@angular/service-worker';
import {TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HomeComponent} from './home/home.component';
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

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
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CollapseModule.forRoot(),
    AlertModule.forRoot(),
    HttpClientModule,
    MomentModule,
    EventcardModule,
    CoreModule,
    EventModule.forRoot(),
    ChatModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    FontAwesomeModule,
    AboutModule,
    environment.production ? ServiceWorkerModule.register('/ngsw-worker.js') : [],
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]

      }
    })

  ],
  providers: [UserService, TicketService, LoggedInGuard, BidService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(translateService: TranslateService) {
    firebase.initializeApp(environment.firebase);
    translateService.setDefaultLang('hu');
    translateService.use('hu');
  }
}
