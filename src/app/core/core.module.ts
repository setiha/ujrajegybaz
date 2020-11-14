import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {JumbotronComponent} from "./jumbotron/jumbotron.component";
import {FooterComponent} from "./footer/footer.component";
import {NavbarComponent} from "./navbar/navbar.component";
import {NavbarItemComponent} from "./navbar-item/navbar-item.component";
import {LoadingSpinnerComponent} from "./loading-spinner/loading-spinner.component";
import {CollapseModule} from "ngx-bootstrap/collapse";
import {RouterModule} from "@angular/router";



@NgModule({
  declarations: [
    JumbotronComponent,
    FooterComponent,
    NavbarComponent,
    LoadingSpinnerComponent,
    NavbarItemComponent
  ],
  imports: [
    CommonModule,
    CollapseModule,
    RouterModule
  ],

  exports: [
    FooterComponent,
    NavbarComponent,
    JumbotronComponent,
    LoadingSpinnerComponent
  ]
})
export class CoreModule { }
