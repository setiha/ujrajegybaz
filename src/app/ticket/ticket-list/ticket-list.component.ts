import { Component, OnInit } from '@angular/core';
import {TicketService} from '../../shared/ticket.service';
import {UserService} from '../../shared/user.service';
import {TicketModel} from '../../shared/ticket-model';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css']
})
export class TicketListComponent implements OnInit {
public tickets: {};
  constructor(private _ticketService: TicketService, private _userService: UserService) {}

  ngOnInit() {
    this.tickets = this._ticketService.getAllTickets();
  }

}
