import { Module } from '@nestjs/common';
import { MessageRoomController } from './message.controller';
import { MessageRoomService } from './message.service';
import { joinRoomService } from 'src/chatroom/joinroom/joinroom.service';
import { ChatroomService } from 'src/chatroom/chatroom.service';

@Module({
  controllers: [MessageRoomController],
  providers: [MessageRoomService, joinRoomService, ChatroomService],
})
export class MessageRoomModule {}
