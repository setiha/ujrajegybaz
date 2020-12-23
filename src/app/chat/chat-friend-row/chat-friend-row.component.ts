import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  Output
} from "@angular/core";
import {ChatFriendModel} from "../model/chat-friend-model";
import {Subject} from "rxjs/Rx";
import {ChatService} from "../chat.service";

@Component({
  selector: 'app-chat-friend-row',
  templateUrl: './chat-friend-row.component.html',
  styleUrls: ['./chat-friend-row.component.css']
})
export class ChatFriendRowComponent implements AfterViewInit {
  @Input() friend: ChatFriendModel;
  @HostBinding('class.clearfix') classClearfix = true;
  @HostBinding('class.text-muted') classTextMuted = true;
  @HostBinding('class.focused') classFocused = false;
  private focus$ = new Subject<boolean>();
  @Output() Select = new EventEmitter<ChatFriendModel>();

  constructor(private cdr: ChangeDetectorRef,
              private chatService: ChatService) {
    this.focus$.subscribe(
      value => {
        if (value !== this.classTextMuted) {
          this.classTextMuted = value;
          this.classFocused = !value;
        }
      }
    );
  }

  @HostListener('mouseover', ['$event'])
  onHostFocus($event) {
    $event.stopPropagation();
    $event.preventDefault();
    this.focus$.next(false);
  }

  @HostListener('mouseout', ['$event'])
  onHostBlur($event) {
    $event.stopPropagation();
    $event.preventDefault();
    this.focus$.next(true);
  }

  @HostListener('click', ['$event'])
  onHostClick($event) {
    $event.stopPropagation();
    $event.preventDefault();
    this.Select.emit(this.friend);
    console.log(this.friend);
    console.log($event);
  }

  ngAfterViewInit(): void {
    this.cdr.detach();
  }
}
