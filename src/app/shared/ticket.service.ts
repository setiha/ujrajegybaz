import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import "rxjs/add/observable/forkJoin";
import "rxjs/add/observable/zip";
import "rxjs/add/operator/mergeMap";
import {Observable} from "rxjs/Rx";
import {environment} from "../../environments/environment";
import {EventModel} from "./event-model";
import {EventService} from "../event/event.service";
import {TicketModel} from "./ticket-model";
import {UserModel} from "./user-model";
import {UserService} from "./user.service";
import "rxjs/add/observable/of";
import "rxjs/add/operator/map";
import "rxjs/add/operator/switchMap";
import * as firebase from "firebase";
import "rxjs-compat/add/operator/first";
import {AngularFireDatabase} from "angularfire2/database";
import { switchMap } from 'rxjs/operators';

@Injectable()
export class TicketService {

  constructor(private _eventService: EventService,
              private _userService: UserService,
              private afDb: AngularFireDatabase) {
  }

  // Mi is tortenik itt, mert izi :) - logikai lepesekkel, hogy hogyan epulunk fel
  // 1. lepesben lekerjuk http.get-el az osszes ticketet, amik objectben erkeznek meg
  //    {key1: ticketObject1, key2: TicketObject2, key3: ticketObject3, ...}
  // 2. lepesben ezt atalakitjuk tombbe Object.values() segitsegevel
  //    [ticketObject1, ticketObject2, ticketObject3, ...]
  // 3. lepesben vegigmegyunk minden ticketObjectX-en es az Observable.zip() segitsegevel minden ticketObjectX-t atalakitunk
  //    3.a) krealunk 3 streamet: ticketObjectX-nek, illetve Eventnek es Usernek a ticketObjectX-ben tarolt id-k alapjan
  //      ticketObjectX-nek azert kell observable-t generalni, hogy alkalmazni tudjuk ra is a .zip()-et
  //    3.b) miutan a 2 uj streamunk is visszatert ertekkel egybefuzzuk az utolso parameterkent megadott fat arrow function-el
  //    3.c) es csinalunk belole egy uj streamet, amiben 1 ertek van, es ez az osszefuzott verzio
  //         ezen a ponton van egy [zipStream1, zipStream2, zipStream3, ...]
  // 4. osszeallitjuk a vegso streamunket
  //    4.a) Observable.forkJoin segitsegevel az osszes tombben kapott streamunk utolso elemet osszefuzzuk 1 tombbe
  //         es a keletkezett uj streamen ezt az 1 elemet emitteljuk
  //    4.b) mivel minket csak az osszefuzott ertek erdekel a streamen ezert a switchmap-el erre valtunk
  // ----------
  // Gondolatkiserlet: itt azert erdemes megnezni a devtoolbar network tabjat XHR szuresben,
  //                   es vegiggondolni, hogy hogy lehetne spórolni ezekkel a keresekkel!
  // -----
  // puffancs uzeni: "elkepzelheto", hogy egyszerubb megoldas is van, de szerintem ez szep
  //                 es mar nagyon vagytam valami agyzsibbasztora a projektben :)
  getAllTickets() {
    return this.afDb.list('tickets').valueChanges()
      .map(ticketsArray => ticketsArray.map(ticket =>
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
      ));
  }


  getOneOnce(id: string): Observable<TicketModel> {
    return this.getOne(id).first();
  }

  getOne(id: string): Observable<any> {
    return new Observable(
      observer => {
        const dbTicket = firebase.database().ref(`tickets/${id}`);
        dbTicket.on('value', snapshot => {
          const ticket = snapshot.val();

          const subscription = Observable.combineLatest(
            Observable.of(new TicketModel(ticket)),
            this._eventService.getEventById(ticket.eventId),
            this._userService.getUserById(ticket.sellerUserId),
            (t: TicketModel, e: EventModel, u: UserModel) => {
              return t.setEvent(e).setSeller(u);
            }).subscribe(
            ticketModel => {
              observer.next(ticketModel);
              subscription.unsubscribe();
            }
          );
        });
      }
    );
  }
create(ticket: TicketModel){
    return Observable.fromPromise(this.afDb.list('tickets').push(ticket)) ;
}
  modify(ticket: TicketModel) {}
}
