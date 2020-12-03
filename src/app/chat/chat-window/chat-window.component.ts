import {
  AfterViewChecked,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  Input,
  OnInit,
  ViewChild
} from "@angular/core";
import {ChatMessageModel} from "../model/chat.model";
import {ChatService} from "../chat.service";
import {faCaretDown, faCaretUp} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ChatService]
})
export class ChatWindowComponent implements OnInit, AfterViewChecked {
  faCaretDown = faCaretDown;
  faCaretUp = faCaretUp;
  @Input() roomId;
  resetForm = false;
  chatMessage$ // : Observable<ChatMessageModel[]>;
  @ViewChild('cardBody') cardBody: ElementRef;
  private shouldScrolling = false;
  collapseBody: boolean;
  @HostBinding('style.height') height = '100%';

  constructor(private chatService: ChatService) {
  }

  ngOnInit(): void {
    this.chatMessage$ = this.chatService.getRoomMessages(this.roomId);
    this.chatMessage$.first().delay(300).subscribe(
      () => {
        this.shouldScrolling = true;
        this.ngAfterViewChecked();
      }
    );
  }

  ngAfterViewChecked(): void {
    if (this.shouldScrolling) {
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

  trackByMessages(index: number, model: ChatMessageModel) {
    return model.$id;
  }

   collapseChat() {
    this.collapseBody = !this.collapseBody;
    if (this.collapseBody) {
      this.height = null;
    } else {
      this.height = '100%';
    }
  }
}
