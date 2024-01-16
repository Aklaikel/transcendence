import { Module } from '@nestjs/common';
import { ChatroomService } from './chatroom.service';
import { ChatContoller } from './chatroom.controller';
import { JoinRoomController } from './joinroom/joinroom.controller';
import { joinRoomService } from './joinroom/joinroom.service';
import { UserRoomModule } from './userroom/userroom.module';

@Module({
  imports: [UserRoomModule],
  controllers: [ChatContoller, JoinRoomController],
  providers: [ChatroomService, joinRoomService],
})
export class ChatroomModule {}
