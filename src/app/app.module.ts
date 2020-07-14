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
import {FormsModule} from '@angular/forms';
import {AuthInterceptor} from './shared/auth-interceptor';


@NgModule({
  declarations: [
    AppComponent,
    JumbotronComponent,
    EventcardComponent,
    FooterComponent,
    NavbarComponent,
    ...AppRoutingModule.routableComponent,
    EventListComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CollapseModule.forRoot(),
    AlertModule.forRoot(),
    HttpClientModule
  ],
  providers: [EventService, UserService, TicketService, LoggedInGuard,
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
