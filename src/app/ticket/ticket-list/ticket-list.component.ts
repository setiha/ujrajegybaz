///<reference path="../../../../node_modules/rxjs-compat/add/observable/fromEvent.d.ts"/>
import { Observable} from 'rxjs';
import {TicketService} from '../../shared/ticket.service';
import {UserService} from '../../shared/user.service';
import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import 'rxjs-compat/add/observable/fromEvent';
import 'rxjs-compat/add/operator/distinctUntilChanged';
@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css'],
})
export class TicketListComponent implements OnInit, OnDestroy, AfterViewInit {

  tickets: any;
  @ViewChild('searchInput') searchInput: ElementRef;
  private filteredText$ = new BehaviorSubject<string>(null);
  private ticketsSubscription: Subscription;
  isLoggedIn: boolean;
  private isLoggedinSubscription: Subscription;

  constructor(private _ticketService: TicketService,
              userService: UserService,
              private cdr: ChangeDetectorRef ) {
    this.isLoggedinSubscription = userService.isLoggedIn$.subscribe(
      isLoggedin => this.isLoggedIn = isLoggedin
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

  ngOnInit() {
    this.ticketsSubscription = this._ticketService.getAllTickets().flatMap(
      tickets => {
        return this.filteredText$.map(
          filterText => {
            if (filterText === null) {
              return tickets;
            } else {
              return tickets.filter(
                ticket => {
                  return ticket.event.name.toLowerCase().indexOf(filterText.toLowerCase()) > -1;
                }
              );
            }
          }
        );
      }
    ).subscribe(
      tickets => {
        this.tickets = tickets;
        this.cdr.detectChanges();
      }
    );

  }

  ngOnDestroy(): void {
    this.ticketsSubscription.unsubscribe();
    this.isLoggedinSubscription.unsubscribe();
  }
}
