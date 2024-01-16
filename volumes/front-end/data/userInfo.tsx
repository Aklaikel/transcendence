// export const userIdStored =  window.localStorage.getItem('userId') || ''
// const s = useSelector((state: any) => state.auth)
// export const userIdStored =  window.localStorage.getItem('userId') || ''

type userroom = {
  UserName: string;
  avatar: string;
  isOnline: boolean;
  id: number
};
type chat = {
  ownerId: number;
  id: number
};

type userRoomDto = {
  id: number;
  createAt: string;
  updatedAt: string;
  userId: number;
  roomId: number;
  locked: boolean;
  isadmin: boolean;
  timermute: string;
  userroom: userroom;
  chat: chat;
  
};
