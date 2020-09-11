import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { FirebaseLoginModel } from './firebase-login-model';
import { FirebaseRegistrationModel } from './firebase-registration-model';
import { UserModel } from './user-model';
import {ReplaySubject} from "rxjs/Rx";
import * as firebase from "firebase";

@Injectable()
export class UserService {
  isLoggedin = new ReplaySubject(1);

  private _user = new UserModel();
  private _fbAuthData: FirebaseLoginModel | FirebaseRegistrationModel | undefined;

  constructor(private _router: Router,
              private _http: HttpClient) {
    firebase.auth().onAuthStateChanged(
      user => {
        if(user !== null){
          this.isLoggedin.next(true);
        }else{
          this.isLoggedin.next(false);
        }
      }
    );
  }

  get fbIdToken(): string | null {
    return this._fbAuthData ? this._fbAuthData.idToken : null;
  }

  login(email: string, password: string): Observable<UserModel | void> {
    return this._http.post<FirebaseLoginModel>(
      `${environment.firebase.loginUrl}=${environment.firebase.apiKey}`,
      {
        'email': email,
        'password': password,
        'returnSecureToken': true
      })
      .do((fbAuthResponse: FirebaseLoginModel) => this._fbAuthData = fbAuthResponse)
      .switchMap(fbLogin => this.getUserById(fbLogin.localId))
      .do(user => this._user = user)
      .do(user => console.log('sikeres login ezzel a userrel: ', user));
  }

  register(param: UserModel, password: string) {
    return this._http.post<FirebaseRegistrationModel>(
      `${environment.firebase.registrationUrl}?key=${environment.firebase.apiKey}`,
      {
        'email': param.email,
        'password': password,
        'returnSecureToken': true
      }
    )
      .do((fbAuthResponse: FirebaseRegistrationModel) => this._fbAuthData = fbAuthResponse)
      .map(fbreg => {
        return {
          id: fbreg.localId,
          ...param
        };
      })
      .switchMap(user => this.save(user))
      .do(user => console.log('sikeres reg ezzel a userrel: ', user));
  }

  save(param: UserModel) {
    // na ez itt azert kulonleges, mert a tobbi helyettol elteroen en nem akarom, hogy
    // generaljon nekem kulcsot a firebase, hanem a registraciokor kapott id-t szeretnem
    // kulcs kent hasznalni adatmentesnel kulcskent az adatbazisban
    // illetve put-ra fb a bekuldott adatszerkezetet adja vissz igy tudom tovabb hasznalni
    return this._http.put<UserModel>(`${environment.firebase.baseUrl}/users/${param.id}.json`, param) // return: param
      .do(user => this._user = user);
  }

  // itt ezt azert tettem be igy direktbe, es nem asyncronban bekotve, mert amikor ez a valtozo valtozik
  // azt elintezik a kezelok (login, register, logout) es igy biztosra vehetem, hogy rendben van

  getUserById(fbid: string) {
    return this._http.get<UserModel>(`${environment.firebase.baseUrl}/users/${fbid}.json`);
  }

  // TODO: ez iskolapeldaja lehet egyebkent egy jo kis behaviuorSubject-nek es getValue-nak
  getCurrentUser() {
    return this._user;
  }

  logout() {
    this._user = new UserModel();
    delete(this._fbAuthData);
    this._router.navigate(['/home']);
    console.log('kileptunk');
  }

  getAllUsers() {
    return this._http.get(`${environment.firebase.baseUrl}/users.json`)
      .map(usersObject => Object.values(usersObject).map(user => new UserModel(user)));
  }

  addTicket(ticketId: string): Observable<string> {
    return this._http.patch(
      `${environment.firebase.baseUrl}/users/${this._user.id}/tickets.json`,
      {[ticketId]: true}
    )
      .map(rel => Object.keys(rel)[0]);
  }

  // TODO: refreshtoken-t lekezelni
  // TODO: rememberme-t lekezelni localstorage-el
}
