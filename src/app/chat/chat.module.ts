<<<<<<< HEAD
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatService } from './chat.service';
import { MockedChatService } from './mocked-chat.service';
import { UserService } from '../shared/user.service';
import { environment } from '../../environments/environment';
import { ChatWindowComponent } from './chat-window/chat-window.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '../core/core.module';
import { ChatMessageRowComponent } from './chat-message-row/chat-message-row.component';
import { ChatMessageSendFormComponent } from './chat-message-send-form/chat-message-send-form.component';
import { MomentModule } from 'angular2-moment';

export const chatServiceProvideFactoryFn =
  (userService: UserService) => {
    return environment.production ?
      new ChatService(userService) :
      new MockedChatService(userService);
  };

@NgModule({
=======
import {ModuleWithProviders, NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ChatService} from "./chat.service";
import {UserService} from "../shared/user.service";
import {MockedChatService} from "./mocked-chat.service";
import {environment} from "../../environments/environment.prod";
import { ChatWindowComponent } from './chat-window/chat-window.component';
import {ReactiveFormsModule} from "@angular/forms";
import {LoadingSpinnerComponent} from "../core/loading-spinner/loading-spinner.component";
import {CoreModule} from "../core/core.module";
import { ChatMessageRowComponent } from './chat-message-row/chat-message-row.component';
import { ChatMessageSendFormComponent } from './chat-message-send-form/chat-message-send-form.component';
import {MomentModule} from "angular2-moment";

export const chatServiceProvideFactoryFn = (userService: UserService) => {
  return environment.production ?
    new ChatService(userService) :
    new MockedChatService(userService);
};

@NgModule({
  declarations: [ChatWindowComponent, ChatMessageRowComponent, ChatMessageSendFormComponent],
>>>>>>> f88b618978b6ff27dd69dc687ed7d5f11d4be11e
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CoreModule,
    MomentModule
<<<<<<< HEAD
  ],
  declarations: [
    ChatWindowComponent,
    ChatMessageRowComponent,
    ChatMessageSendFormComponent
=======

>>>>>>> f88b618978b6ff27dd69dc687ed7d5f11d4be11e
  ],
  exports: [
    ChatWindowComponent
  ]
})
export class ChatModule {
<<<<<<< HEAD
=======
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ChatModule,
      providers: [
        {
          provide: ChatService,
          useFactory: chatServiceProvideFactoryFn,
          deps: [UserService]
        }
      ]
    };
  }
>>>>>>> f88b618978b6ff27dd69dc687ed7d5f11d4be11e
}
