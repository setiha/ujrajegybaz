import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {UserModel} from "./user-model";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  isLoggedin = false;

  private _user: UserModel;
  private _allUsers: UserModel[];

  constructor(private _router: Router) {
this._allUsers = [
  new UserModel({
    'id':1,
    'name': 'Pista ba',
    'email':'pistaba@gmail.com',
    'address': 'pistaba lak 12',
    'dateOfBirth': '1900-01-01',
    'gender': 'male'
  }),
  new UserModel({
    'id':2,
    'name': 'Tokany',
    'email':'pistaba@gmail.com',
    'address': 'pistaba lak 12',
    'dateOfBirth': '1900-01-01',
    'gender': 'male'
  }),
  new UserModel({
    'id':3,
    'name': 'Lacika',
    'email':'pistaba@gmail.com',
    'address': 'pistaba lak 12',
    'dateOfBirth': '1900-01-01',
    'gender': 'male'
  })
];
  }

  login(email: string, password: string) {
    if (email === 'angular' && password === 'angular') {
      this._user = new UserModel(UserModel.exampleUser);
      this.isLoggedin = true;
      this._router.navigate(['/user']);
    }
    return false;
  }
  register(param?: UserModel){
    if (param){
      this._user = new UserModel(param);
    }else{
      this._user = new UserModel(UserModel.exampleUser);
    }
    this.isLoggedin = true;
    this._router.navigate(['/user']);
  }

  logout(){
    this._user = new UserModel();
    this.isLoggedin = false;
    this._router.navigate(['/home']);
  }
  getUserById(id: number){
    const user = this._allUsers.filter(u => u.id === id);
    return user.length > 0 ? user[0] : new UserModel(UserModel.emptyUser);
  }
}
