import { io } from 'socket.io-client';
const baseURL = process.env.SOCKET_URL || 'ws://localhost:8000/';
// const baseURL = 'ws://e3r2p2.1337.ma:8000/';
const socket = io(baseURL, {
  transports: ['websocket', 'polling', 'flashsocket'],
    autoConnect: true,
  secure: true,
  extraHeaders: {  
    
  },
  auth: (cb) => {
    return cb({ token: 'token' });
  },
});
export default socket;
