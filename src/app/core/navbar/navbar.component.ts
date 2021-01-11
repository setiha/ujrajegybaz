import {AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, DoCheck} from '@angular/core';
import {UserService} from '../../shared/user.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements DoCheck, AfterViewChecked, AfterViewInit {
  public isCollapsed = true;
  isLoggedIn = false;
  public isCollapsedLanguageSwitcher = true;
  currentLang = 'hu';

  constructor(public userService: UserService,
              private cdr: ChangeDetectorRef,
              private translateService: TranslateService) {
    this.userService.isLoggedIn$.subscribe(isLoggedIn => {
        this.isLoggedIn = isLoggedIn;
        this.cdr.detectChanges();
      }
    );
    this.translateService.onLangChange.subscribe(
      newLang => {
        this.currentLang = newLang.lang;
        this.isCollapsedLanguageSwitcher = true;
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

  detectHam() {
    this.cdr.detectChanges();
  }

  toggleLanguageSwitcher($event) {
    $event.stopPropagation();
    $event.preventDefault();
    this.isCollapsedLanguageSwitcher = !this.isCollapsedLanguageSwitcher;
    this.cdr.detectChanges();
  }

  selectLang(lang: string, $event) {
    $event.stopPropagation();
    $event.preventDefault();
    this.translateService.use(lang);
    this.cdr.detectChanges();
  }
  toggleMenu(){
    this.isCollapsed = !this.isCollapsed;
    this.cdr.detectChanges();
  }
}
