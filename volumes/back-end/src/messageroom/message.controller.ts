import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ChatroomService } from 'src/chatroom/chatroom.service';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { MessageRoomService } from './message.service';

@Controller('chatroom')
@UseGuards(AuthGuard('authGuard'))
export class MessageRoomController {
  constructor(
    private readonly messageRoom: MessageRoomService,
    private readonly room: ChatroomService,
  ) {}

  @Get('gaurdRoom/:roomId/:userId')
  async gaurdRooms(
    @Param('roomId', new ParseIntPipe()) roomId: number,
    @Param('userId', new ParseIntPipe()) userId: number,
    @Req() req: Request,
  ) {
    await this.room.protectedUser(
      parseInt(req.headers.userid as string),
      req.user['id'],
    );
    return this.messageRoom.gardRoom(userId, roomId);
  }

  @Get('conversation/:roomId/:userId/:page?')
  async getAllMessages(
    @Param('roomId', new ParseIntPipe()) roomId: number,
    @Param('userId', new ParseIntPipe()) userId: number,
    @Param('page') page?: number,
    @Req() req?: Request,
  ) {
    await this.room.protectedUser(
      parseInt(req.headers.userid as string),
      req.user['id'],
    );
    return this.messageRoom.getAllMessage(roomId, userId, page);
  }
}
