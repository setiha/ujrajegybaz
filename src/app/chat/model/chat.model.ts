<<<<<<< HEAD
export class ChatMessageModel {
=======
export class ChatMessageModel{
>>>>>>> f88b618978b6ff27dd69dc687ed7d5f11d4be11e
  $id: string;
  msg: string;
  userId: string;
  userName: string;
  userPictureUrl: string;
  created: number;

<<<<<<< HEAD
  constructor(data?: ChatMessageModel) {
    if (data != null) {
      Object.assign(this, data);
    }

    const $idPropertyDescriptior = Object.getOwnPropertyDescriptor(this, '$id');
    $idPropertyDescriptior.enumerable = false;
    Object.defineProperty(this, '$id', $idPropertyDescriptior);
=======
  constructor(data?: ChatMessageModel){
    if (data != null) {
      Object.assign(this, data);
      const $idProperyDescriptior = Object.getOwnPropertyDescriptor(this, '$id');
      $idProperyDescriptior.enumerable = false;
      Object.defineProperty(this, '$id', $idProperyDescriptior);
    }
>>>>>>> f88b618978b6ff27dd69dc687ed7d5f11d4be11e
  }
}
