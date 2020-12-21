import {Injectable, Optional} from "@angular/core";
import {UserService} from "../shared/user.service";
import {Observable} from "rxjs/Rx";
import {AngularFireDatabase} from "angularfire2/database";
import {ChatMessageModel} from "./model/chat.model";
import * as moment from "moment";
import "rxjs-compat/add/operator/switchMap";
import "rxjs-compat/add/operator/map";
import "rxjs-compat/add/operator/first";
import {ChatFriendModel} from "./model/chat-friend-model";
@Injectable({
  providedIn: 'root'
})
export class ChatService {
  static PATH = 'chat';
  user = this.userService._user;
  userId;
  friendId;

  constructor(protected userService: UserService,
              @Optional() protected afDb?: AngularFireDatabase) {
    this.user.subscribe(data => this.userId = data);
    console.log(this.userId.id);

  }

  addMessage(roomId: string, msg: string): Observable<boolean> {
    return this.userService.getCurrentUser()
      .switchMap(
        user => {
          return new Observable<boolean>(
            observer => {
              const room = this.afDb.list(`${ChatService.PATH}/${roomId}`);
              room.push(
                new ChatMessageModel({
                  $id: '',
                  msg,
                  userId: user.id,
                  userName: user.name,
                  userPictureUrl: user.profilePictureUrl,
                  created: moment().unix()
                })
              ).then(
                () => {
                  observer.next(true);
                  observer.complete();
                },
                error => {
                  observer.next(false);
                  observer.error(error);
                  observer.complete();
                }
              );
            }
          );
        }
      );
  }

  getRoomMessages(roomId: string) {
    const mess = [];
    return this.afDb.list<ChatMessageModel>(`${ChatService.PATH}/${roomId}`).snapshotChanges().map(
      (chat, index) => chat.forEach(elem => mess.push(elem.key))).switchMap(data => {
        return this.afDb.list<ChatMessageModel>(`${ChatService.PATH}/${roomId}`).valueChanges()
          .map(
            list =>
              list.map(
                (chatMessage, index) =>
                  new ChatMessageModel(Object.assign(chatMessage, {$id: mess[index]}))
              )
          );
      }
    );
  }


  getMyFriendList(): Observable<ChatFriendModel[]> {
    const el = [];
    return this.afDb.list<ChatFriendModel>(`chat_friend_list/${this.userId.id}`).snapshotChanges().map(
      (fr, index) => fr.forEach(elem => el.push(elem.key))).switchMap(data => {
        return this.afDb.list<ChatFriendModel>(`chat_friend_list/${this.userId.id}`).valueChanges().map(
          friends => friends.map(
            (friend, index) => new ChatFriendModel(Object.assign(friend, {$id: el[index]}))
          )
        );
      }
    );
  }

  getAllFriend(index): any {
    return this.afDb.list<ChatFriendModel>(`${ChatService.PATH}/friend_list/${this.userId.id}`).snapshotChanges().map(
      friend => friend[index].key
    );
  }
}
