import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {EventService} from "../event.service";
import {EventModel} from "../../shared/event-model";
import {UserService} from "../../shared/user.service";

import {map} from "rxjs/operators";

import "rxjs/add/operator/delay";
import "rxjs/add/observable/fromEvent";
import {Observable} from "rxjs/Observable";
import {distinctUntilChanged} from "rxjs/internal/operators";
import {BehaviorSubject} from "rxjs/Rx";


@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css'],

})
export class EventListComponent implements OnInit, AfterViewInit {

  public eventsGrouppedBy3: EventModel[];
  public events$: Observable<EventModel[]>;
  public events: EventModel[];
  public eventsGrouppedBy3$: Observable<EventModel[][]>;

  @ViewChild('searchInput') searchInput: ElementRef;
  private filteredText$ = new BehaviorSubject<string>(null);

  constructor(private _eventService: EventService, public userService: UserService) {
  }

  ngOnInit(): void {
    this.eventsGrouppedBy3$ = this._eventService.getAllEvents()
      .flatMap(
        events => {
          return this.filteredText$.map(
            filterText => {
              if (filterText === null) {
                return events;
              } else {
                return events.filter(
                  event => {
                    return event.name.toLowerCase().indexOf(filterText.toLowerCase()) > -1;
                  }
                );
              }
            }
          );
        }
      )
      .pipe(map(data => {
        return data.reduce((acc: Array<any>, curr: EventModel, ind: number) => {
          if (ind % 3 === 0) {
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

  ngAfterViewInit(): void {
    Observable.fromEvent(this.searchInput.nativeElement, 'keyup')
      .delay(300)
      .map(
        (event: Event) => {
          return (event.srcElement as HTMLInputElement).value;
        }
      )
      .pipe(distinctUntilChanged())
      .subscribe(text => {
          if (text.length === 0) {
            text = null;
          }
          this.filteredText$.next(text);
        }
      );
  }

}
