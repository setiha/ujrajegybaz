import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild} from "@angular/core";
import {EventService} from "../event.service";
import {UserService} from "../../shared/user.service";

import { Observable } from 'rxjs';
import { BehaviorSubject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import {EventModel} from "../../shared/event-model";


@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css'],

})
export class EventListComponent implements OnInit, AfterViewInit, OnDestroy {
  public events: EventModel[];
  @ViewChild('searchInput') searchInput: ElementRef;
  private filteredText$ = new BehaviorSubject<any>(null);
  private eventSubscription: Subscription;
  private isLoggedInSubscription: Subscription;
  isLoggedIn: boolean;


  constructor(private _eventService: EventService,
              public userService: UserService,
              private cdr: ChangeDetectorRef) {
    this.isLoggedInSubscription = userService.isLoggedIn$.subscribe(
      isLoggedIn => this.isLoggedIn = isLoggedIn
    );
  }

  ngOnInit() {

    this.eventSubscription = this._eventService.getAllEvents()
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
      ).subscribe(
        events => {
          this.events = events;
          this.cdr.detectChanges();
        }
      );
  }

  ngAfterViewInit(): void {
    Observable.fromEvent(this.searchInput.nativeElement, 'keyup').pipe(map((event: Event) => {
      return (event.srcElement as HTMLInputElement).value;
    })).distinctUntilChanged().subscribe(
      text => {
        if (text.length === 0) {
          text = null;
        }
        this.filteredText$.next(text);
        console.log(this.filteredText$.value);
      }
    );
    this.cdr.detach();
  }

  ngOnDestroy(): void {
    this.eventSubscription.unsubscribe();
    this.isLoggedInSubscription.unsubscribe();
  }
}
