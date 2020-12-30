import {Injectable} from "@angular/core";
import {EventModel} from "../shared/event-model";
import { switchMap } from 'rxjs/operators';
import {AngularFireDatabase} from "angularfire2/database";
import {map} from "rxjs/operators";
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class EventService {
  private proba = 9;
  constructor(private afDb: AngularFireDatabase) {

}

  getAllEvents() {
    return this.afDb.list(`events`).valueChanges().pipe(map(
      events => events.map((event: EventModel) => new EventModel(Object.assign(event, {id: event.id}))
      )));
  }

  getEventById(id: any) {
    return this.afDb.object<EventModel>(`events/${id}`).valueChanges();
  }

  save(param: EventModel) {
    if (param.id) {

      // update
      return Observable.fromPromise(this.afDb.object(`events/${param.id}`).update(param));
    } else {
      param.id = this.proba ++;
      return Observable.fromPromise(this.afDb.object(`events/${param.id}`).set(param));
    }
  }

  delete(event: EventModel) {
    return Observable.fromPromise(this.afDb.object(`events/${event.id}`).remove());
  }

  addTicket(eventId: number, ticketId: any): Observable<any> {
    return Observable.fromPromise(this.afDb.list(`events/${eventId}/tickets`).push(
      ticketId));
  }

}

