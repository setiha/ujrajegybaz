import {Injectable} from '@angular/core';
import {EventModel} from "./event-model";
import {HttpClient} from '@angular/common/http';
import {$} from "protractor";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs/index";
import {map} from "rxjs/internal/operators";


@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private _http: HttpClient) {
  }

  getAllEvents(): Observable<any> {
    return this._http.get(`${environment.firebase.baseUrl}/events.json`).pipe(map(data => Object.keys(data).map(key => data[key])));
  }

  getEventById(id: number) {
    return this._http.get<EventModel>(`${environment.firebase.baseUrl}/events/${id}.json`);
   /* const ev = this._events.filter(x => x.id === +id);
    return ev.length > 0 ? ev[0] : new EventModel(EventModel.emptyEvent);*/
  }

  update(param: EventModel) {
    /*this._events = this._events.map(ev => {
      if (ev.id === param.id) {
        return {...param};
      } else {

        return ev;
      }
    });*/

  }

  create(param: EventModel) {
   /* //noinspection TypeScriptValidateTypes
    this._events = [
      ...this._events,
      {
        id: this._getMaxId() + 1,
        ...param
      }
    ];*/
  }

  private _getMaxId() {
   /* return this._events.reduce((x, y) => x.id > y.id ? x : y).id;*/
  }
}
