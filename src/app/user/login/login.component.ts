import {Component, OnInit} from '@angular/core';
import {UserService} from '../../shared/user.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public error: string;

  constructor(private _userService: UserService, private _router: Router) {
  }

  ngOnInit(): void {
  }

  login(email: string, password: string) {
    if (!this._userService.login(email, password)) {
      this.error = 'Hiba a belepesi adatokban. Probald ujra vagy igyal egy kavet';
    } else {
      this._router.navigate(['/user']);
    }
  }

  clearError() {
    delete(this.error);
  }
}
