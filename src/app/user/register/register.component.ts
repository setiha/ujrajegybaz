import {Component, OnInit} from '@angular/core';
import {UserService} from "../../shared/user.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private _userService: UserService) {
  }

  ngOnInit(): void {
  }

  register() {
    this._userService.register();
  }
}
