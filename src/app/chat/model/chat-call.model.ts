import {ChatFriendModel} from './chat-friend-model';
export class ChatCallModel {
  $id: string;
  roomId: string;
  friend: ChatFriendModel;

  constructor(data?: ChatCallModel) {
    if (data != null) {
      Object.assign(this, data);
      const $idProperyDescriptior = Object.getOwnPropertyDescriptor(this, '$id');
      $idProperyDescriptior.enumerable = false;
      Object.defineProperty(this, '$id', $idProperyDescriptior);
    }
  }
}
