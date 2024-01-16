import {
  Body,
  Controller,
  ParseIntPipe,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserRoomService } from './userroom.service';
import { AuthGuard } from '@nestjs/passport';
import { ChatroomService } from '../chatroom.service';
import { Request } from 'express';

@Controller('userroom')
@UseGuards(AuthGuard('authGuard'))
export class UserRoomController {
  constructor(
    private readonly roomuser: UserRoomService,
    private readonly chatRooms: ChatroomService,
  ) {}
  @Post()
  async searchUsersRoom(
    @Body('name') name: string,
    @Body('roomId') roomId: number,
  ) {
    return this.roomuser.searchUsersRoom(name, roomId);
  }
  @Post('search')
  async searchUsers(
    @Body('name') name: string,
    @Body('roomId', new ParseIntPipe()) roomId: number,
    @Body('userId', new ParseIntPipe()) userId: number,
    @Req() req: Request,
  ) {
    await this.chatRooms.protectedUser(
      parseInt(req.headers.userid as string),
      req.user['id'],
    );
    return this.roomuser.searchUsers(name, roomId, userId);
  }
  @Post('invite')
  async inviteUsersRoom(
    @Body('userId', new ParseIntPipe()) userId: number,
    @Body('roomId', new ParseIntPipe()) roomId: number,
    @Body('ownerId', new ParseIntPipe()) ownerId: number,
    @Req() req: Request,
  ) {
    await this.chatRooms.protectedUser(
      parseInt(req.headers.userid as string),
      req.user['id'],
    );
    return this.roomuser.inviteUsersRoom(userId, roomId);
  }
}
