import {Component, OnInit} from '@angular/core';
import {EventService} from '../../shared/event.service';
import {EventModel} from '../../shared/event-model';
import {UserService} from '../../shared/user.service';
import {Observable } from 'rxjs/index';
import {map, catchError} from 'rxjs/operators';


@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {
  public eventsGrouppedBy3: EventModel[];
  public events$: Observable<EventModel[]>;
  public events: EventModel[];
  public eventsGrouppedBy3$: Observable<EventModel[][]>;

  constructor(private _eventService: EventService, public userService: UserService) {
  }

  ngOnInit(): void {
this.eventsGrouppedBy3$ = this._eventService.getAllEvents().pipe(map(data => {
  return data.reduce((acc: Array<any> , curr: EventModel, ind: number) => {
    if (ind % 3 === 0){
      acc.push([]);
    }
    acc[acc.length - 1].push(curr);
    return acc;
  }, []);
}));
    /*  this._eventService.getAllEvents().subscribe(data => {
     this.eventsGrouppedBy3 = data.reduce((acc, curr: EventModel, ind: number) => {
     if (ind % 3 === 0) {
     acc.push([]);
     }
     acc[acc.length - 1].push(curr);
     return acc;
     }, []);
     });*/
    /*this._eventService.getAllEvents().subscribe(data => {
     this.events = data;
     });*/
  }
}
