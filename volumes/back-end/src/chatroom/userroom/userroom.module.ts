import { Module } from '@nestjs/common';
import { UserRoomController } from './userroom.controller';
import { UserRoomService } from './userroom.service';
import { joinRoomService } from '../joinroom/joinroom.service';
import { ChatroomService } from '../chatroom.service';

@Module({
  controllers: [UserRoomController],
  providers: [UserRoomService, joinRoomService, ChatroomService],
})
export class UserRoomModule {}
