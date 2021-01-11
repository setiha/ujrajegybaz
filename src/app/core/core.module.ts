import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {JumbotronComponent} from "./jumbotron/jumbotron.component";
import {FooterComponent} from "./footer/footer.component";
import {NavbarComponent} from "./navbar/navbar.component";
import {NavbarItemComponent} from "./navbar-item/navbar-item.component";
import {LoadingSpinnerComponent} from "./loading-spinner/loading-spinner.component";
import {CollapseModule} from "ngx-bootstrap/collapse";
import {RouterModule} from "@angular/router";
import {TranslateModule} from '@ngx-translate/core';
import {HomeComponent} from '../home/home.component';



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
    RouterModule,
    TranslateModule
  ],

  exports: [
    FooterComponent,
    NavbarComponent,
    JumbotronComponent,
    LoadingSpinnerComponent
  ]
})
export class CoreModule { }
