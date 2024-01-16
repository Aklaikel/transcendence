import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
} from '@prisma/client/runtime/binary';
import { PrismaService } from 'src/prisma/prisma.service';
import { MessageRoomDto, MessageSocketDto } from './message.dto';
import { joinRoomService } from 'src/chatroom/joinroom/joinroom.service';
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { RoomMakeUser, RoomSocketDto } from 'src/chatroom/chatroom.dto';

@Injectable()
@WebSocketGateway({
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
})
export class MessageRoomService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly joinRooms: joinRoomService,
  ) {}
  @WebSocketServer()
  server: Server;
  async handleConnection(client: Socket, payload: any) {
    client.on('disconnecting', (data) => {
      console.log('new client connect ', client.id);
    });
  }

  @SubscribeMessage('typing')
  async isTyping(client: Socket, payload: any) {
    if (
      (await this.joinRooms.chekMuted(
        parseInt(payload.userId),
        parseInt(payload.roomId),
      )) !== 0
    )
      return;
    this.server.to(payload.nameroom).emit('totyping', client.id, payload);
  }

  @SubscribeMessage('join')
  async handleEvent(client: Socket, payload: any) {
    client.join(payload.nameroom);
  }
  @SubscribeMessage('joinGlobal')
  async joinGlobal(client: Socket, user: number) {
    client.join(user.toString());
  }

  //send broadcast in room
  @SubscribeMessage('sendMessages')
  private async socketMessage(client: Socket, payload: MessageSocketDto) {
    try {
      const data = await this.addMessage(payload);
      client.join(payload.nameroom);
      if (data.roomId)
        this.server.to(payload.nameroom).emit('messages', client.id, data);
    } catch (error) {
      throw error;
    }
  }
  @SubscribeMessage('setUser')
  async JoinUser(client: Socket, payload: RoomSocketDto) {
    this.server.to(payload.chat.name).emit('notify', payload);
  }
  @SubscribeMessage('setRoom')
  async setRoom(client: Socket, payload: RoomSocketDto) {
    this.server
      .to(payload.userId.toString())
      .emit(
        'getRoom',
        await this.getLastRoomAdd(payload.userId, payload.roomId),
      );
  }

  @SubscribeMessage('makeAdmin')
  async makeAdmin(client: Socket, payload: RoomMakeUser) {
    this.server.to(payload.name).emit('addedAdmin', payload);
  }
  @SubscribeMessage('removeUser')
  async removeUser(client: Socket, payload: any) {
    this.server.to(payload.chat.name).emit('removedUser', payload);
    this.server.to(payload.userId.toString()).emit('removeRoom', payload);
  }
  @SubscribeMessage('muteUser')
  async isMute(client: Socket, payload: RoomSocketDto) {
    this.server.to(payload.chat.name).emit('isMuted', payload);
  }

  private async getLastRoomAdd(userId: number, roomId: number) {
    try {
      const getRooms = await this.prisma.usersRoom.findFirst({
        where: {
          AND: {
            userId: userId,
            roomId: roomId,
          },
        },
        orderBy: { id: 'desc' },
        take: 5,
        include: {
          chat: {
            select: {
              name: true,
              descreption: true,
              createAt: true,
              updatedAt: true,
              ownerId: true,
              avatar: true,
              id: true,
              type: true,
            },
          },
          userroom: {
            select: {
              UserName: true,
              id: true,
            },
          },
        },
      });
      if (!getRooms) throw new ForbiddenException('not found room');
      return getRooms;
    } catch (error) {
      if (error instanceof PrismaClientUnknownRequestError) {
        if (error.message === 'P2002')
          throw new ForbiddenException('Error message');
      }
      throw error;
    }
  }
  async gardRoom(userId: number, roomId: number) {
    try {
      if (await this.joinRooms.chekMuted(userId, roomId))
        throw new NotFoundException('you are muted');
      return this.gardMessage(userId, roomId);
    } catch (error) {
      throw error;
    }
  }
  async gardMessage(userId: number, roomId: number) {
    try {
      const findRoom = await this.prisma.roomChat.findUnique({
        where: { id: roomId },
      });

      const checkListUser = await this.joinRooms.checkListUser(userId, roomId);

      if (checkListUser && checkListUser.locked)
        throw new ForbiddenException('required password');

      if (!checkListUser)
        throw new ForbiddenException(
          `you are not member a this room  ${findRoom.name}`,
        );

      const checkListBlock = await this.joinRooms.checkListBlock(
        userId,
        roomId,
      );
      if (checkListBlock)
        throw new ForbiddenException('you are blocked in this room');
    } catch (error) {
      throw error;
    }
  }

  async getMessages(body) {
    try {
      const getMessage = await this.prisma.messageRoom.findFirst({
        where: {
          AND: {
            roomId: body.roomId,
            userId: body.userId,
            id: body.id,
          },
        },
        include: {
          usermsg: true,
          messageref: {
            select: {
              name: true,
              updatedAt: true,
              id: true,
            },
          },
        },
      });
      return getMessage;
    } catch (error) {}
  }

  async addMessage(body: MessageRoomDto): Promise<MessageRoomDto> {
    try {
      const checkValidRoom = await this.prisma.roomChat.findFirst({
        where: {
          id: body.roomId,
        },
      });
      if (!checkValidRoom) throw new ForbiddenException('cant find room!');
      await this.gardMessage(body.userId, body.roomId);

      if ((await this.joinRooms.chekMuted(body.userId, body.roomId)) !== 0)
        throw new ForbiddenException('you are now muted!').getResponse();
      const inseertMessage = await this.prisma.messageRoom.create({
        data: {
          roomId: body.roomId,
          userId: body.userId,
          message: body.message,
          updatedAt: new Date(),
        },
      });
      if (!inseertMessage)
        throw new ForbiddenException('error get messages').getResponse();

      return await this.getMessages(inseertMessage);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.message === 'P2002')
          throw new ForbiddenException('error add');
      }
      throw error;
    }
  }

  async getAllMessage(roomId: number, userId: number, page: number) {
    try {
      if (!page) page = 0;
      await this.gardMessage(userId, roomId);
      const roomMessages = this.prisma.roomChat.findUnique({
        where: { id: roomId },
        select: {
          name: true,
          avatar: true,
          id: true,
          ownerId: true,
          createAt: true,
          MessageRooms: {
            select: {
              message: true,
              userId: true,
              createAt: true,
              usermsg: {
                select: {
                  UserName: true,
                  avatar: true,
                },
              },
            },
            orderBy: { createAt: 'desc' },
            skip: page === -1 ? (page = 0) : page * 20,
            take: 20,
          },
        },
      });
      return roomMessages;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.message === 'P2002')
          throw new ForbiddenException('error response data');
      }
      throw error;
    }
  }
}
