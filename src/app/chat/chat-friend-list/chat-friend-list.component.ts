import {Component, ChangeDetectionStrategy, EventEmitter, OnInit, Output} from "@angular/core";
import { Observable } from 'rxjs';
import {ChatFriendModel} from "../model/chat-friend-model";
import {ChatService} from "../chat.service";

@Component({
  selector: 'app-chat-friend-list',
  templateUrl: './chat-friend-list.component.html',
  styleUrls: ['./chat-friend-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatFriendListComponent implements OnInit {
  friendList$: Observable<ChatFriendModel[]>;
  @Output() Select = new EventEmitter<ChatFriendModel>();

  constructor(private chatService: ChatService) {
  }

  ngOnInit(): void {
    this.friendList$ = this.chatService.getMyFriendList();

  }

  onSelectFriend(friend: ChatFriendModel) {
    this.Select.emit(friend);
    console.log('friend listben mukodik az emit');
  }
}
