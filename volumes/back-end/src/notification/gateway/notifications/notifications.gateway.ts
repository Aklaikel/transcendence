import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';

import { Server } from 'http';

@WebSocketGateway(
  {
    cors: {
      origin: '*',
    },
  }
)
export class NotificationsGateway {


  constructor(
  ) {}

  
  @WebSocketServer()
  server: Server;
  
  
  @SubscribeMessage('message')
  handleMessage(client: any, payload: any) {

    console.log('notification-readed server');
    this.server.emit('notification-readed');

  }


  emitNewNotivication() {

    console.log('new-notification server');
    this.server.emit('new-notification');
  }



  // this.server.to(userId).emit('notificationRead', unreadNotificationCount);

}
