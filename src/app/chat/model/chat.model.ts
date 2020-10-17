export class ChatMessageModel{
  $id: string;
  msg: string;
  userId: string;
  userName: string;
  userPictureUrl: string;

  constructor(data?: ChatMessageModel){
    if (data != null) {
      Object.assign(this, data);
      const $idProperyDescriptior = Object.getOwnPropertyDescriptor(this, '$id');
      $idProperyDescriptior.enumerable = false;
      Object.defineProperty(this, '$id', $idProperyDescriptior);
    }
  }
}
