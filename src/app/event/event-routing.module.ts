import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {EventDetailComponent} from "./event-detail/event-detail.component";
import {LoggedInGuard} from "../shared/logged-in.guard";
import {EventListComponent} from "./event-list/event-list.component";
import {EventComponent} from "./event.component";


const routes: Routes = [
  {
    path: '', component: EventComponent,
    children: [
      {path: 'list', component: EventListComponent},
      {path: 'new', component: EventDetailComponent, canActivate: [LoggedInGuard]},
      {path: ':id', component: EventDetailComponent}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventRoutingModule { }
