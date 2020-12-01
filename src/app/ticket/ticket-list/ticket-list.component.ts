import {Observable} from "rxjs/Observable";
import {TicketService} from "../../shared/ticket.service";
import {UserService} from "../../shared/user.service";
import {AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {BehaviorSubject} from "rxjs/Rx";
import {map} from "rxjs/internal/operators";

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TicketListComponent implements OnInit, AfterViewInit {
  tickets$: Observable<any>;
  @ViewChild('searchInput') searchInput: ElementRef;
  private filteredText$ = new BehaviorSubject<string>(null);

  constructor(private _ticketService: TicketService,
              public userService: UserService) {
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
  }

  ngOnInit() {
    this.tickets$ = this._ticketService.getAllTickets().flatMap(
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
    );
  }
}
