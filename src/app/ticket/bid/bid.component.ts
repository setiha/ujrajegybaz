<<<<<<< HEAD
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { TicketService } from '../../shared/ticket.service';
import { TicketModel } from '../../shared/ticket-model';
import { UserService } from '../../shared/user.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import { Subscription } from 'rxjs/Subscription';
=======
import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from "@angular/core";
import {TicketService} from "../../shared/ticket.service";
import {TicketModel} from "../../shared/ticket-model";
import {UserService} from "../../shared/user.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {Observable, Subscription} from "rxjs/Rx";
>>>>>>> f88b618978b6ff27dd69dc687ed7d5f11d4be11e

@Component({
  selector: 'app-bid',
  templateUrl: './bid.component.html',
  styleUrls: ['./bid.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BidComponent implements OnInit, OnDestroy {
<<<<<<< HEAD
  ticket$: Observable<any>;
=======

  ticket$: Observable<TicketModel>;
>>>>>>> f88b618978b6ff27dd69dc687ed7d5f11d4be11e
  isLoggedIn$: Observable<boolean>;
  progressRefreshTicket = false;
  private ticketWatcherSubscription: Subscription;

<<<<<<< HEAD
  constructor(
    private ticketService: TicketService,
    userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.isLoggedIn$ = userService.isLoggedIn$;
  }

  ngOnDestroy(): void {
    this.ticketWatcherSubscription.unsubscribe();
  }

  ngOnInit() {
    this.route.paramMap.subscribe(
      (params: ParamMap) => {
        this.refreshTicket(params.get('id'));
      }
    );
  }

  onBid() {
    this.progressRefreshTicket = true;
=======
  constructor(private ticketService: TicketService,
              userService: UserService,
              private route: ActivatedRoute,
              private router: Router) {
    this.isLoggedIn$ = userService.isLoggedIn$;
  }
  ngOnDestroy(): void {
    this.ticketWatcherSubscription.unsubscribe();
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.refreshTicket(params.get('id'));
    });
>>>>>>> f88b618978b6ff27dd69dc687ed7d5f11d4be11e
  }

  private refreshTicket(id: string) {
    this.progressRefreshTicket = true;
    const handle404 = () => {
      this.router.navigate(['404']);
<<<<<<< HEAD
    };

    this.ticket$ = this.ticketService.getOne(id).share();
    this.ticketWatcherSubscription = this.ticket$.subscribe(
      ticket => {
=======
    }
    this.ticket$ = this.ticketService.getOne(id).share();
    this.ticketWatcherSubscription = this.ticket$.subscribe({
      next: ticket => {
>>>>>>> f88b618978b6ff27dd69dc687ed7d5f11d4be11e
        this.progressRefreshTicket = false;
        if (ticket === null) {
          handle404();
        }
      },
<<<<<<< HEAD
      err => {
        return handle404();
      }
    );
=======
      error: err => {
        return handle404();
      }
    });
  }
  onBid() {
    this.progressRefreshTicket = true;
>>>>>>> f88b618978b6ff27dd69dc687ed7d5f11d4be11e
  }
}
