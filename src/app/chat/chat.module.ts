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
import {FaIconLibrary, FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import { ChatComponent } from './chat/chat.component';
import { ChatFriendRowComponent } from './chat-friend-row/chat-friend-row.component';
import {ChatFriendListComponent} from "./chat-friend-list/chat-friend-list.component";

export const chatServiceProvideFactoryFn = (userService: UserService) => {
  return environment.production ?
    new ChatService(userService) :
    new MockedChatService(userService);
};

@NgModule({
  declarations: [ChatWindowComponent, ChatMessageRowComponent, ChatMessageSendFormComponent, ChatComponent, ChatFriendListComponent, ChatFriendRowComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CoreModule,
    MomentModule,
    FontAwesomeModule,

  ],
  exports: [
    ChatComponent
  ]
})
export class ChatModule {

}
