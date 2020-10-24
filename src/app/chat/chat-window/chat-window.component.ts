import {Component, Input, OnInit} from "@angular/core";
import {environment} from "../../../environments/environment";
import {MockedChatDatas} from "../mocked-chat.service";
import {Observable} from "rxjs/Rx";
import {ChatMessageModel} from "../model/chat.model";
import {ChatService} from "../chat.service";


@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css']
})
export class ChatWindowComponent implements OnInit {
  @Input() roomId = environment.production ? null : MockedChatDatas.mockedRoomId;
resetForm = false;
  chatMessage$: Observable<ChatMessageModel[]>;
  constructor(private chatService: ChatService) {
  }

  ngOnInit(): void {
    this.chatMessage$ = this.chatService.getRoomMessages(this.roomId);
  }

  onNewMessage(newMessage: string) {
    this.chatService.addMessage(this.roomId, newMessage)
      .subscribe(resp => {
        if (resp) {
this.resetForm = true;
        } else {
          alert('hiba a chat uzenet kozben');
        }
      });
  }
}
