import {Component, OnInit} from "@angular/core";
import {TicketService} from "../../shared/ticket.service";
import {TicketModel} from "../../shared/ticket-model";
import {UserService} from "../../shared/user.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {ReturnStatement} from "@angular/compiler";

@Component({
  selector: 'app-bid',
  templateUrl: './bid.component.html',
  styleUrls: ['./bid.component.css']
})
export class BidComponent implements OnInit {
  ticket: TicketModel;
  isLoggedIn: boolean;

  constructor(private ticketService: TicketService,
              userService: UserService,
              private route: ActivatedRoute,
              private router: Router) {
              this.isLoggedIn = true //userService.isLoggedin;
  }

  ngOnInit(): void {
    const handle404 = () => {
      this.router.navigate(['404']);
    }
    this.route.paramMap.subscribe((params: ParamMap) => {

      this.ticketService.getOne(params.get('id')).subscribe(
        ticket => {
          if (ticket === null){
            handle404();
          }else{
            this.ticket = ticket;
          }
        },
        err => {
          return handle404();
        }
      );
    });
  }
}
