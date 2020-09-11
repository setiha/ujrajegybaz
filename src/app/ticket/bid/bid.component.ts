import {Component, OnInit} from "@angular/core";
import {TicketService} from "../../shared/ticket.service";
import {TicketModel} from "../../shared/ticket-model";
import {UserService} from "../../shared/user.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";

@Component({
  selector: 'app-bid',
  templateUrl: './bid.component.html',
  styleUrls: ['./bid.component.css']
})
export class BidComponent implements OnInit {
  ticket: TicketModel;
  isLoggedIn: boolean;
  progressRefreshTicket = false;

  constructor(private ticketService: TicketService,
              userService: UserService,
              private route: ActivatedRoute,
              private router: Router) {
    this.isLoggedIn = true //userService.isLoggedin;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.refreshTicket(params.get('id'));
    });
  }

  private refreshTicket(id: string) {
    this.progressRefreshTicket = true;
    const handle404 = () => {
      this.router.navigate(['404']);
    }
    this.ticketService.getOne(id).subscribe({
      next: ticket => {
        this.progressRefreshTicket = false;
        if (ticket === null) {
          handle404();
        } else {
          this.ticket = ticket;
        }
      },
      error: err => {
        return handle404();
      }
    });
  }

  onRefreshTicket() {
this.refreshTicket(this.ticket.id);
  }
}
