import {ChangeDetectionStrategy, Component} from '@angular/core';
import {BehaviorSubject} from 'rxjs/Rx';
import {ChatWindowConfig} from '../model/chat-window-config';
import {ChatService} from '../chat.service';
import 'rxjs-compat/add/operator/first';
import {ChatFriendModel} from '../model/chat-friend-model';
import {UserService} from '../../shared/user.service';
import {AngularFireDatabase} from 'angularfire2/database';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ChatService]
})
export class ChatComponent {

  windows$ = new BehaviorSubject<ChatWindowConfig[]>([]);

  constructor(private chatService: ChatService, private userService: UserService, private afDb: AngularFireDatabase) {
    this.chatService.getChatCallWatcher().subscribe(
      data => {
        if (data != null && data.length > 0) {
          data.forEach(
            call => {
              this.openChat(
                {title: call.friend.name, roomId: call.roomId, friend: call.friend}
              );
              this.chatService.removeWatcher(call.friend.$id);
            }
          );
        }
      }
    );
  }

  openChat(config: ChatWindowConfig) {
    const windows = this.windows$.getValue();
    if (windows.find(frConfig => frConfig.roomId === `friend_list/${config.roomId}`)
      == null) {
      this.chatService.addChatWait(config.roomId, config.friend);
      if (config.id === null) {
        // default
        config.id = `${config.roomId}${new Date().getTime()}`;
      }
      if (config.closeable == null) {
        // default
        config.closeable = true;
      }
      config.roomId = `friend_list/${config.roomId}`;
      windows.push(config);
      this.windows$.next(windows);

    }
  }

  removeChat(id: string) {
    const windows = this.windows$.getValue();
    const configIndex = windows.findIndex(config => config.id === id);
    if (configIndex > -1) {
      windows.splice(configIndex, 1);
      this.windows$.next(windows);
    }
  }

  onSelectFriend(friend: ChatFriendModel) {
    this.userService.getCurrentUser().subscribe(
      user => {
        let roomIdd = `${user.id}/${friend.$id}`;
        this.afDb.object(`chat/friend_list/${roomIdd}`).valueChanges().subscribe(
          room => {
            if (room) {
              this.openChat({
                title: friend.name, roomId: roomIdd,
                closeable: true, 'friend': friend
              });
            } else {
              roomIdd = `${friend.$id}/${user.id}`;
              this.openChat({
                title: friend.name, roomId: roomIdd,
                closeable: true, 'friend': friend
              });
            }
          }
        );
      });
  }
}
