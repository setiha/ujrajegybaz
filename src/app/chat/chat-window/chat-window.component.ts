import {
<<<<<<< HEAD
  AfterViewChecked,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild
} from '@angular/core';
import 'rxjs/add/operator/skip';
import { Observable } from 'rxjs/Observable';
import { ChatMessageModel } from '../model/chat.model';
import { ChatService } from '../chat.service';
import 'rxjs/add/operator/distinctUntilChanged';
=======
  AfterViewChecked, ChangeDetectionStrategy, Component, ElementRef, Input, OnInit,
  ViewChild
} from "@angular/core";
import {environment} from "../../../environments/environment";
import {MockedChatDatas} from "../mocked-chat.service";
import {Observable} from "rxjs/Rx";
import {ChatMessageModel} from "../model/chat.model";
import {ChatService} from "../chat.service";

>>>>>>> f88b618978b6ff27dd69dc687ed7d5f11d4be11e

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css'],
<<<<<<< HEAD
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ChatService]
})
export class ChatWindowComponent implements OnInit, AfterViewChecked {
  @Input() roomId; // = environment.production ? null : MockedChatDatas.mockedRoomId;
  resetForm = false;
  chatMessage$: Observable<ChatMessageModel>;
  @ViewChild('cardBody') cardBody: ElementRef;
  private shouldScrolling = true;

  constructor(
    private chatService: ChatService
  ) {
  }

  ngAfterViewChecked(): void {
    if (this.shouldScrolling) {
=======
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
>>>>>>> f88b618978b6ff27dd69dc687ed7d5f11d4be11e
      this.cardBody.nativeElement.scrollTo(0, this.cardBody.nativeElement.scrollHeight);
      this.shouldScrolling = false;
    }
  }

<<<<<<< HEAD
  ngOnInit() {
    this.chatMessage$ = this.chatService.getRoomMessages(this.roomId);
  }

  onNewMessage(newMessage: string) {
    this.chatService.addMessage(this.roomId, newMessage)
      .subscribe(
        resp => {
          if (resp) {
            this.shouldScrolling = true;
            this.resetForm = true;
          } else {
            alert('Hiba a chat üzenet küldése közben');
          }
        }
      );
  }

  trackByMessages(index: number, model: ChatMessageModel) {
=======
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
>>>>>>> f88b618978b6ff27dd69dc687ed7d5f11d4be11e
    return model.$id;
  }
}
