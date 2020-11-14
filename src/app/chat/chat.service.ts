<<<<<<< HEAD
import { Injectable, Optional } from '@angular/core';
import { UserService } from '../shared/user.service';
import { Observable } from 'rxjs/Observable';
import { ChatMessageModel } from './model/chat.model';
import { AngularFireDatabase } from 'angularfire2/database';
import 'rxjs/add/operator/switchMap';
import * as moment from 'moment';


@Injectable()
export class ChatService {
  private static PATH = 'chat/ticket_room';

  constructor(
    protected userService: UserService,
    @Optional() protected afDb?: AngularFireDatabase
  ) { }

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
                  'msg': msg,
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

  getRoomMessages(roomId: string): Observable<any> {
     return this.afDb.list<any>(`${ChatService.PATH}/${roomId}`).valueChanges()
       .map(
        list =>
          list.map(
            chatMessage =>
              new ChatMessageModel(Object.assign(chatMessage, { $id: chatMessage.$key }))
          )
      );
=======
import {Injectable} from "@angular/core";
import {UserService} from "../shared/user.service";
import {Observable} from "rxjs/Rx";
import {ChatMessageModel} from "./model/chat.model";

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(protected userService: UserService) {
  }

  addMessage(roomId: string, msg: string): Observable<boolean> {
    return null;
  }

  getRoomMessages(roomId: string): Observable<ChatMessageModel[]> {
    return null;
>>>>>>> f88b618978b6ff27dd69dc687ed7d5f11d4be11e
  }
}
