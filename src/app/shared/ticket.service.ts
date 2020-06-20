import {Injectable} from '@angular/core';
import {TicketModel} from "./ticket-model";
import {UserService} from "./user.service";
import {EventService} from "./event.service";

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private _tickets: TicketModel[];

  constructor(private _eventService: EventService, private _userService: UserService) {
    this._tickets = [
      new TicketModel({
        'id': 1,
        'date': '2018-05-02',
        'artist': 'Iron Maiden',
        'numberOfTickets': 5,
        'minimalBidPrice': 200,
        'bidStep': 500,
        'bidStartDate': '2017-11-05',
        'bidEndDate': '2017-11-05',
        'eventId': 1,
        'sellerUserId': 1,
      })
    ]
  }
}
