import {Component, OnInit} from '@angular/core';
import {TicketModel} from "../../shared/ticket-model";
import {EventModel} from "../../shared/event-model";
import {TicketService} from "../../shared/ticket.service";
import {EventService} from "../../shared/event.service";
import {UserService} from "../../shared/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-ticket-detail',
  templateUrl: './ticket-detail.component.html',
  styleUrls: ['./ticket-detail.component.css']
})
export class TicketDetailComponent implements OnInit {
  ticket: TicketModel;
  events: EventModel[];
  constructor(private _ticketService: TicketService, private _eventService: EventService, private _userService: UserService, private _router: Router) {
  }

  ngOnInit(): void {
    this.ticket = new TicketModel(TicketModel.emptyTicket);
    this.ticket.sellerUserId = this._userService.getCurrentUser().id;
    this.events = this._eventService.getAllEvents();
  }
  OnSubmit(){
    this._ticketService.create(this.ticket);
    this._router.navigate(['/ticket']);
  }
}
