import {ChangeDetectionStrategy, Component, OnInit} from "@angular/core";
import {BehaviorSubject} from "rxjs/Rx";
import {ChatWindowConfig} from "../model/chat-window-config";
import {ChatService} from "../chat.service";
import "rxjs-compat/add/operator/first";
import {ChatFriendModel} from "../model/chat-friend-model";
import {UserService} from "../../shared/user.service";


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ChatService]
})
export class ChatComponent  {

  windows$ = new BehaviorSubject<ChatWindowConfig[]>([]);

  constructor(private chatService: ChatService, private userService: UserService) {

  }

  openChat(config: ChatWindowConfig) {

    const windows = this.windows$.getValue();

    if (windows.find(frConfig => frConfig.roomId === `friend_list/${config.roomId}`)
     == null) {
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
        this.openChat({
          title: friend.name, roomId: `${user.id}/${friend.$id}`,
          closeable: true, 'friend': friend
        });
      }
    );
  }
}
