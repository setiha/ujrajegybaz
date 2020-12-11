import {Component, OnInit} from "@angular/core";
import {Observable} from "rxjs/Rx";
import {ChatFriendModel} from "../model/chat-friend-model";
import {ChatService} from "../chat.service";

@Component({
  selector: 'app-chat-friend-list',
  templateUrl: './chat-friend-list.component.html',
  styleUrls: ['./chat-friend-list.component.css']
})
export class ChatFriendListComponent implements OnInit {
  friendList$: Observable<ChatFriendModel[]>;

  constructor(private chatService: ChatService) {
  }

  ngOnInit(): void {
    this.friendList$ = this.chatService.getMyFriendList();
    this.chatService.getAllFriend(0).subscribe(data => console.log(data));
  }

}
