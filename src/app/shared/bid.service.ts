import {Injectable} from "@angular/core";
import {TicketService} from "./ticket.service";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from 'rxjs';
import {AngularFireDatabase} from "angularfire2/database";

@Injectable({
  providedIn: 'root'
})
export class BidService {

  constructor(private ticketService: TicketService,
              private http: HttpClient,
              private afDb: AngularFireDatabase) {
  }

  bid(ticketId: string, value: number) {
    // TODO replace userId
    const userId = 'G6ma0bAgwRMwmbs0eIbV3hy9cbw1';
    return this.http.put(`${environment.firebase.baseUrl}/bids/${ticketId}/${userId}.json`, value)
      .flatMap(
        () => {
          return this.ticketService.getOneOnce(ticketId);
        }
      ).flatMap(
        ticket => {
          return this.ticketService.
          modify(Object.assign(ticket, {currentBid: value, bidCounter: ++ticket.bidCounter}));
        }
      );
  }
}
