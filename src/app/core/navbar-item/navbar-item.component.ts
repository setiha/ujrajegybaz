import {AfterViewChecked, Component, DoCheck, Input} from "@angular/core";

@Component({
  selector: 'app-navbar-item',
  templateUrl: './navbar-item.component.html',
  styleUrls: ['./navbar-item.component.css']
})
export class NavbarItemComponent implements DoCheck, AfterViewChecked {
  @Input() url: string;
  @Input() name: string;

  constructor() {
  }

  ngDoCheck(): void {
    //console.log('NavbarItemComponent component ngDoCheck');
  }


  ngAfterViewChecked(): void {
    //console.log('NavbarItemComponent ngAfterViewChecked');
  }


}
