import {Injectable} from '@angular/core';
import {EventModel} from "../shared/event-model";
import {HttpClient} from '@angular/common/http';
import {$} from "protractor";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs/index";
import {map} from 'rxjs/internal/operators';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private _http: HttpClient) {
  }

  getAllEvents(): Observable<any> {
    return this._http.get(`${environment.firebase.baseUrl}/events.json`).pipe(map(data => Object.keys(data).map(key => data[key])));

  }

  getEventById(id: string) {;
    return this._http.get<EventModel>(`${environment.firebase.baseUrl}/events/${id}.json`);
    /* const ev = this._events.filter(x => x.id === +id);
     return ev.length > 0 ? ev[0] : new EventModel(EventModel.emptyEvent);*/
  }

  save(param: EventModel) {
    if (param.id) {//update ag
      return this._http.put(`${environment.firebase.baseUrl}/events/${param.id}.json`, param);
    } else { //create ag
      return this._http.post(`${environment.firebase.baseUrl}/events.json`, param)
        .map((fbPostReturn: { name: string }) => fbPostReturn.name)
        .switchMap(fbId => this._http.patch(
          `${environment.firebase.baseUrl}/events/${fbId}.json`,
          {id: fbId}
        ));
    }
  }

  delete(param: EventModel) {
    return this._http.delete(`${environment.firebase.baseUrl}/events/${param.id}.json`);
  }

  addTicket(eventId: string, ticketId: string): Observable<string> {
    return this._http.patch(
      `${environment.firebase.baseUrl}/events/${eventId}/tickets.json`,
      {[ticketId]: true}
    )
      .map(rel => Object.keys(rel)[0]);
  }
}

