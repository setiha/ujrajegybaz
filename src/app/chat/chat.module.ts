import {ModuleWithProviders, NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ChatService} from "./chat.service";
import {UserService} from "../shared/user.service";
import {MockedChatService} from "./mocked-chat.service";
import {environment} from "../../environments/environment.prod";
import { ChatWindowComponent } from './chat-window/chat-window.component';

export const chatServiceProvideFactoryFn = (userService: UserService) => {
  return environment.production ?
    new ChatService(userService) :
    new MockedChatService(userService);
};

@NgModule({
  declarations: [ChatWindowComponent],
  imports: [
    CommonModule
  ],
  exports: [
    ChatWindowComponent
  ]
})
export class ChatModule {
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
}
