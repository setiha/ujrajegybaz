import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {EventService} from "../../shared/event.service";
import {EventModel} from "../../shared/event-model";

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent implements OnInit {
  event: EventModel;

  constructor(private _route: ActivatedRoute, private _eventService: EventService, private _router: Router) {
  }

  ngOnInit(): void {

    const evId = +this._route.snapshot.params['id'];
    if (evId) {
      this.event = this._eventService.getEventById(evId);

    } else {
      this.event = new EventModel(EventModel.emptyEvent);

    }

  }

  onSubmit(form) {
    if (this.event.id){

      this._eventService.update(this.event);
    }else{

      this._eventService.create(this.event);
    }
    this._router.navigate(['/event/list']);
  }
}
