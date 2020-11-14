import {Injectable} from "@angular/core";
import "rxjs/add/observable/forkJoin";
import "rxjs/add/observable/of";
import "rxjs/add/observable/zip";
import "rxjs/add/operator/map";
import "rxjs/add/operator/switchMap";
import "rxjs/add/observable/combineLatest";
import {Observable} from "rxjs/Observable";
import {EventModel} from "./event-model";
import {EventService} from "../event/event.service";
import {TicketModel} from "./ticket-model";
import {UserModel} from "./user-model";
import {UserService} from "./user.service";
import "rxjs/add/operator/mergeMap";
import "rxjs/add/operator/first";
import {AngularFireDatabase} from "angularfire2/database";
import "rxjs/add/operator/do";


@Injectable()
export class TicketService {

  constructor(private _eventService: EventService,
              private _userService: UserService,
              private afDb: AngularFireDatabase) {
  }

  getAllTickets() {
    return this.afDb.list('tickets').valueChanges()
      .mapTo(ticketsArray => ticketsArray.map(ticket =>
        Observable.zip(
          Observable.of(new TicketModel(ticket)),
          this._eventService.getEventById(ticket.eventId),
          this._userService.getUserById(ticket.sellerUserId),
          (t: TicketModel, e: EventModel, u: UserModel) => {
            return {
              ...t,
              event: e,
              seller: u
            };
          })
      ))
      .switchMap(zipStreamArray => Observable.forkJoin(zipStreamArray));
  }


  /*.mapTo(ticketsArray => ticketsArray.map(ticket =>
   Observable.zip(
   Observable.of(new TicketModel(ticket)),
   this._eventService.getEventById(ticket.eventId),
   this._userService.getUserById(ticket.sellerUserId),
   (t: any, e: any, u: any) => {
   return {
   ...t,
   event: e,
   seller: u
   };
   })
   )).switchMap(zipStreamArray => Observable.forkJoin(zipStreamArray));*/


  create(ticket: TicketModel) {
    return Observable.fromPromise(this.afDb.list('tickets').push(ticket))
      .map(
        resp => resp.key
      )
      .do(
        ticketId => Observable.combineLatest(
          this._eventService.addTicket(ticket.eventId, ticketId),
          this._userService.addTicket(ticketId)
        )
      );
  }

  getOneOnce(id: string) {
    return this.getOne(id).first();
  }

  getOne(id: string) {
    return this.afDb.object<TicketModel>(`tickets/${id}`).valueChanges()
      .flatMap(
        ticketFirebaseRemoteModel => {
          return Observable.combineLatest(
            Observable.of(ticketFirebaseRemoteModel),
            this._eventService.getEventById(ticketFirebaseRemoteModel.eventId),
            this._userService.getUserById(ticketFirebaseRemoteModel.sellerUserId),
            (t: TicketModel, e: EventModel, u: UserModel) => {
              return t.setEvent(e).setSeller(u);
            });
        }
      );
  }

  modify(ticket: any) {
    return Observable.fromPromise(this.afDb.object(`tickets/${ticket.id}`).update(ticket));
  }
}
