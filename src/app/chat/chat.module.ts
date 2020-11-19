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
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CoreModule,
    MomentModule

  ],
  exports: [
    ChatWindowComponent
  ]
})
export class ChatModule {

}
