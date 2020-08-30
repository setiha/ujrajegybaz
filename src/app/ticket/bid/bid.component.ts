import { Component, OnInit } from '@angular/core';
import {TicketService} from "../../shared/ticket.service";
import {TicketModel} from "../../shared/ticket-model";

@Component({
  selector: 'app-bid',
  templateUrl: './bid.component.html',
  styleUrls: ['./bid.component.css']
})
export class BidComponent implements OnInit {
   ticket: TicketModel;

  constructor(private ticketService: TicketService) { }

  ngOnInit(): void {
    const id = '-Ky0Hz4uP2Es-j9q_Cmw';
    this.ticketService.getOne(id).subscribe(
      ticket => this.ticket = ticket
    );
  }
  onBidWithBidStep(){
    alert('Megnyomtak a gombot');
  }

}
