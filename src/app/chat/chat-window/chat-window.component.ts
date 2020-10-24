import {
  AfterViewChecked, ChangeDetectionStrategy, Component, ElementRef, Input, OnInit,
  ViewChild
} from "@angular/core";
import {environment} from "../../../environments/environment";
import {MockedChatDatas} from "../mocked-chat.service";
import {Observable} from "rxjs/Rx";
import {ChatMessageModel} from "../model/chat.model";
import {ChatService} from "../chat.service";


@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatWindowComponent implements OnInit, AfterViewChecked {

  @Input() roomId = environment.production ? null : MockedChatDatas.mockedRoomId;
  resetForm = false;
  chatMessage$: Observable<ChatMessageModel[]>;
  @ViewChild('cardBody') cardBody: ElementRef;
  private shouldScrolling = true;

  constructor(private chatService: ChatService) {
  }

  ngOnInit(): void {
    this.chatMessage$ = this.chatService.getRoomMessages(this.roomId);
  }

  ngAfterViewChecked(): void {
    if (this.shouldScrolling){
      this.cardBody.nativeElement.scrollTo(0, this.cardBody.nativeElement.scrollHeight);
      this.shouldScrolling = false;
    }
  }

  onNewMessage(newMessage: string) {
    this.chatService.addMessage(this.roomId, newMessage)
      .subscribe(resp => {
        if (resp) {
          this.shouldScrolling = true;
          this.resetForm = true;
        } else {
          alert('hiba a chat uzenet kozben');
        }
      });
  }
  trackByMessages(index: number, model: ChatMessageModel){
    return model.$id;
  }
}
