import {Injectable} from '@angular/core';
import {TicketModel} from './ticket-model';
import {UserService} from './user.service';
import {EventService} from './event.service';


@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private tickets: TicketModel[];

  constructor(private _eventService: EventService, private _userService: UserService) {
    this.tickets = [
      new TicketModel( <TicketModel> {
        'id': 1,
        'date': '2018-05-02',
        'artist': 'Iron Maiden',
        'numberOfTickets': 5,
        'minimalBidPrice': 200,
        'bidStep': 500,
        'bidStartDate': '2017-11-05',
        'eventId': 1,
        'sellerUserId': 1
      }),
      new TicketModel( <TicketModel> {
        'id': 2,
        'date': '2018-05-02',
        'artist': 'Diótörő Balett',
        'numberOfTickets': 5,
        'minimalBidPrice': 200,
        'bidStep': 500,
        'bidStartDate': '2017-11-05',
        'eventId': 2,
        'sellerUserId': 2
      })
    ];
  }

  getAllTickets() {
    return this.tickets.map(ticket => {
      return {
        ...ticket,
        event: this._eventService.getEventById(ticket.eventId),
        seller: this._userService.getUserById(ticket.sellerUserId)
      };

    });
  }
  getEventNameById(id: number){
    return this._eventService.getEventById(id).name;
  }
}
