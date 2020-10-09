import {AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, DoCheck} from "@angular/core";
import {UserService} from "../../shared/user.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements DoCheck, AfterViewChecked, AfterViewInit {
  public isCollapsed = true;
  isLoggedIn = false;

  constructor(public userService: UserService,
              private cdr: ChangeDetectorRef) {
    this.userService.isLoggedIn$.subscribe(isLoggedIn => {
        this.isLoggedIn = isLoggedIn;
        this.cdr.detectChanges();
      }
    );
  }

  ngDoCheck(): void {
    // console.log('Navbar component ngDoCheck');
  }

  ngAfterViewChecked(): void {
    // console.log('Navbar component ngAfterViewChecked');
  }

  ngAfterViewInit(): void {
    this.cdr.detach();
  }

  logout() {
    this.userService.logout();
  }
  detectHam(){
    this.cdr.detectChanges();
  }
}
