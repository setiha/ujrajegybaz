import { Injectable } from '@angular/core';
import {ChatService} from "./chat.service";
import {BehaviorSubject, Observable} from "rxjs/Rx";
import {ChatMessageModel} from "./model/chat.model";
import {UserService} from "../shared/user.service";
import "rxjs-compat/add/operator/delay";
import "rxjs-compat/add/observable/of";
import * as moment from 'moment';

export const MockedChatDatas = {
  mockedRoomId: '-MHz1SHl2d9sT6Ya_5f9',
  mockedUserId: '9KBeOD3RdVbPZWepUXY21s7ZJY52',
  mockedUserName: 'Sebok Tihamer',
  mockedUserPictureUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSlUTxvBxTz-aYC99PskUNiwmA2znsk7am9lQ&usqp=CAU'
};
@Injectable({
  providedIn: 'root'
})
export class MockedChatService extends ChatService{private rooms$ = new BehaviorSubject<BehaviorSubject<ChatMessageModel[]>[]>([]);

  constructor(userService: UserService) {
    super(userService);
    //fill mocked message
    const mockedMessages = [];
    for (let i = 0; i < 10; i++ ){
      mockedMessages.push({
        $id: null,
        msg: `Test messages: ${i}`,
        userId: MockedChatDatas.mockedUserId,
        userName: MockedChatDatas.mockedUserName,
        userPictureUrl: MockedChatDatas.mockedUserPictureUrl,
        created: moment().unix()
      });
    }
    const currentRooms = this.rooms$.getValue();
    currentRooms[MockedChatDatas.mockedRoomId] = new BehaviorSubject<ChatMessageModel[]>(mockedMessages);
    this.rooms$.next(currentRooms);
  }

  addMessage(roomId: string, msg: string): Observable<boolean> {
    const rooms = this.rooms$.getValue();
    const roomMessages = rooms[roomId].getValue();
    return this.userService.getCurrentUser()
      .delay(300)
      .pipe()
      .switchMap(
        user => {
          roomMessages.push(
            new ChatMessageModel({
              $id: null,
              msg: msg,
              userId: MockedChatDatas.mockedUserId,
              userName: MockedChatDatas.mockedUserName,
              userPictureUrl: MockedChatDatas.mockedUserPictureUrl,
              created: moment().unix()

            })
          );
          rooms[roomId].next(roomMessages);
          return Observable.of(true);
        }
      );
  }

<<<<<<< HEAD
  getRoomMessages(roomId: string): Observable<ChatMessageModel> {
=======
  getRoomMessages(roomId: string): Observable<ChatMessageModel[]> {
>>>>>>> f88b618978b6ff27dd69dc687ed7d5f11d4be11e
    const rooms = this.rooms$.getValue();
    if (rooms[roomId] == null){
      //first init room
      rooms[roomId] = new BehaviorSubject<ChatMessageModel[]>([]);
      this.rooms$.next(rooms);
    }
    return rooms[roomId].asObservable();
  }
}
