
import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {EventService} from "../event.service";
import {UserService} from "../../shared/user.service";

import "rxjs/add/operator/delay";
import "rxjs/add/observable/fromEvent";
import {Observable} from "rxjs/Observable";
import {BehaviorSubject} from "rxjs/Rx";
import "rxjs-compat/add/operator/map";
import {map} from "rxjs/internal/operators";
import {EventModel} from "../../shared/event-model";
import {distinctUntilChanged} from "rxjs-compat/operator/distinctUntilChanged";

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css'],

})
export class EventListComponent implements OnInit, AfterViewInit {

  public events$: Observable<EventModel[]>;

  @ViewChild('searchInput') searchInput: ElementRef;
  private filteredText$ = new BehaviorSubject<any>(null);

  constructor(private _eventService: EventService, public userService: UserService) {
  }

  ngOnInit() {

    this.events$ = this._eventService.getAllEvents()
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
      );
  }

  ngAfterViewInit(): void {
    Observable.fromEvent(this.searchInput.nativeElement, 'keyup').pipe(map((event: Event) => {
      return (event.srcElement as HTMLInputElement).value; })).distinctUntilChanged().subscribe(
      text => {
        if (text.length === 0) {
          text = null;
        }
        this.filteredText$.next(text);
        console.log(this.filteredText$.value);
      }
    );


  }
}
