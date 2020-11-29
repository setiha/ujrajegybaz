import {Injectable} from "@angular/core";
import {EventModel} from "../shared/event-model";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/switchMap";
import {AngularFireDatabase} from "angularfire2/database";

import "rxjs-compat/add/observable/fromPromise";
import {stringify} from "@angular/compiler/src/util";
@Injectable({
  providedIn: 'root'
})
export class EventService {
  private proba = 9;
  constructor(private afDb: AngularFireDatabase) {

}

  getAllEvents() {
    return this.afDb.list(`events`).valueChanges().map(
      events => events.map((event, index) => new EventModel(Object.assign(event)
      )));
  }

  getEventById(id: string) {
    return this.afDb.object(`events/${id}`);
  }

  save(param: EventModel) {
    if (param.id) {
      // update
      return Observable.fromPromise(this.afDb.object(`events/`).update(param.id));
    } else {
      param.id = this.proba ++;
      return Observable.fromPromise(this.afDb.object(`events/${param.id}`).set(param));
    }
  }

  delete(event: EventModel) {
    return Observable.fromPromise(this.afDb.object(`events/${event.id}`).remove());
  }

  addTicket(eventId: string, ticketId: string): Observable<any> {
    return Observable.fromPromise(this.afDb.list(`events/${eventId}/tickets`).push(
      ticketId));
  }

  getMaxId() {
    return this.getAllEvents().subscribe(data => data.reduce((x, y) => x.id > y.id ? x : y).id + 1);
  }
}

