import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { joinRoomService } from './joinroom.service';
import { BlockUserDto } from './joinRoom.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { ChatroomService } from '../chatroom.service';

@Controller('join')
@UseGuards(AuthGuard('authGuard'))
export class JoinRoomController {
  constructor(
    private readonly joinRooms: joinRoomService,
    private readonly room: ChatroomService,
  ) {}
  @Post('joined')
  async joinRoom(
    @Body('roomId', new ParseIntPipe()) id: number,
    @Body('userId', new ParseIntPipe()) userId: number,
    @Body('password') password?: string,
    @Req() req?: Request,
  ) {
    await this.room.protectedUser(userId, req.user['id']);
    return await this.joinRooms.joinRoom(id, userId, password);
  }
  @Post('block')
  async blockUser(@Body() body: BlockUserDto, @Req() req: Request) {
    await this.room.protectedUser(body.adminId, req.user['id']);
    return await this.joinRooms.blockUser(body);
  }
  @Post('unblock')
  async unblockUser(
    @Body('userId', new ParseIntPipe()) userId: number,
    @Body('roomId', new ParseIntPipe()) roomId: number,
    @Body('adminId', new ParseIntPipe()) adminId: number,
    @Req() req: Request,
  ) {
    await this.room.protectedUser(adminId, req.user['id']);
    return this.joinRooms.unblockUser(userId, roomId, adminId);
  }
  @Post('makeadmin')
  async makeAdmin(
    @Body('userId', new ParseIntPipe()) userId: number,
    @Body('roomId', new ParseIntPipe()) roomId: number,
    @Body('ownerId', new ParseIntPipe()) ownerId: number,
    @Body('isAdmin', new ParseBoolPipe()) isAdmin: boolean,
    @Req() req: Request,
  ) {
    await this.room.protectedUser(ownerId, req.user['id']);
    return this.joinRooms.makeAdmin(userId, roomId, ownerId, isAdmin);
  }
  @Post('leave')
  async leaveRoom(
    @Body('userId', new ParseIntPipe()) userId: number,
    @Body('roomId', new ParseIntPipe()) roomId: number,
    @Req() req: Request,
  ) {
    await this.room.protectedUser(userId, req.user['id']);
    return this.joinRooms.leaveRoom(userId, roomId);
  }

  @Post('checkmute')
  async checkMute(@Body() body: any) {
    return this.joinRooms.chekMuted(body.userId, body.roomId);
  }
  @Get('info/room/:id')
  async getInfoRoom(@Param('id', new ParseIntPipe()) id: any) {
    return this.joinRooms.getInfoRoom(id);
  }
}
