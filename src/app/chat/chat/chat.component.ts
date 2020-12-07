import {Component, OnInit} from "@angular/core";
import {BehaviorSubject} from "rxjs/Rx";
import {ChatWindowConfig} from "../model/chat-window-config";



@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  windows$ = new BehaviorSubject<ChatWindowConfig[]>([]);

  constructor() {
  }

  ngOnInit(): void {
this.openChat({title: 'testablak', roomId: 'testelo'});
  }

  openChat(config: ChatWindowConfig) {
    if (config.id === null) {
      //default
      config.id = `${config.roomId}${new Date().getTime()}`;
    }
    if (config.closeable == null){
      //default
      config.closeable = true;
    }
    config.roomId = `friend_list/${config.roomId}`;
    const windows = this.windows$.getValue();
    windows.push(config);
    this.windows$.next(windows);
  }

  removeChat(id: string) {
    const windows = this.windows$.getValue();
    const configIndex = windows.findIndex(config => config.id === id);
    if (configIndex > -1){
      windows.splice(configIndex, 1);
      this.windows$.next(windows);
    }

  }

}
