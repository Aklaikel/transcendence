
type usermsg = {
  UserName: string;
  id: number;
  createAt: string;
  updatedAt: string;
  avatar: string;
};
type MessagetTypeDto = {
  id: number;
  message: string;
  roomId: number;
  createAt: string;
  userId: number,
  usermsg: usermsg
};
export default MessagetTypeDto;
// "id": 464,
// "createAt": "2023-07-20T11:01:44.528Z",
// "updatedAt": "2023-07-20T11:01:44.526Z",
// "userId": 2,
// "roomId": 59,
// "message": "hello"
