import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import "rxjs/add/observable/of";
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";
import "rxjs/add/operator/switchMap";
import {Observable} from "rxjs/Observable";
import {environment} from "../../environments/environment";
import {FirebaseRegistrationModel} from "./firebase-registration-model";
import {UserModel} from "./user-model";
import {ReplaySubject} from "rxjs/ReplaySubject";
import * as firebase from "firebase";
import "rxjs/add/observable/fromPromise";
import "rxjs/add/operator/mergeMap";
import {AngularFireAuth} from "angularfire2/auth";
import {AngularFireDatabase} from "angularfire2/database";

@Injectable()
export class UserService {
  isLoggedIn$ = new ReplaySubject<boolean>(1);

  private _user = new ReplaySubject<any>(1);

  constructor(private _router: Router,
              // private _http: HttpClient
              private afAuth: AngularFireAuth,
              private afDb: AngularFireDatabase) {

    this.afAuth.authState.subscribe(
      user => {
        if (user != null) {
          this.getUserById(user.uid).valueChanges().subscribe(remoteUser => {
            this._user.next(remoteUser);
            this.isLoggedIn$.next(true);
          });
        } else {
          this._user.next(null);
          this.isLoggedIn$.next(false);
        }
      }
    );
  }


  login(email: string, password: string): Observable<any> {
      return Observable.fromPromise(this.afAuth.auth.signInWithEmailAndPassword(email, password));
  }

  register(param: UserModel, password: string) {
return Observable.fromPromise(
  this.afAuth.auth.createUserWithEmailAndPassword(param.email, password)
).do(
  user => this.save({...param, id: user.user.uid})
);
  }

save(param){
  return this.afDb.object(`users/${param.id}`).set(param).then(
    user => user
  );
}

  getUserById(fbid: string) {
    return this.afDb.object(`users/${fbid}`);
  }

  getCurrentUser() {
    return this._user.asObservable();
  }

  logout() {
    this.afAuth.auth.signOut();
    this._router.navigate(['/home']);
    console.log('kileptunk');
  }

addTicket(ticketId: string): Observable<any>{
  return this._user.first().flatMap(
    user => {
      return this.afDb.list(`users/${user.id}/tickets`).push(ticketId);
    });
}

}
