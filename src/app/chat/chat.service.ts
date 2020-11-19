import {Injectable, Optional} from "@angular/core";
import {UserService} from "../shared/user.service";
import {Observable} from "rxjs/Rx";
import {AngularFireDatabase} from "angularfire2/database";
import {ChatMessageModel} from "./model/chat.model";
import * as moment from 'moment';
import "rxjs-compat/add/operator/switchMap";
import "rxjs-compat/add/operator/map";
import {stringify} from "@angular/compiler/src/util";
@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private static PATH = 'chat/ticket_room';

  constructor(protected userService: UserService,
              @Optional() protected afDb?: AngularFireDatabase) {
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
                  $id: null,
                  msg: msg,
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
    return this.afDb.list(`${ChatService.PATH}/${roomId}`).valueChanges()
      .map(
        list =>
          list.map(
            chatMessage =>
              new ChatMessageModel(Object.assign(chatMessage, {$id: chatMessage.key}))
          )
      );
  }
}
