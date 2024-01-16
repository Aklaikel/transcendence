import { NotFoundException } from "@nestjs/common";
import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Console, log } from "console";

import { use } from "passport";
import { send } from "process";
import { Socket, Server } from "socket.io";
import { PrismaService } from "src/prisma/prisma.service";

const mm = [
    {
        Socketid: '',
        receiverid: '',
        senderid: '',

    }
]

@WebSocketGateway({
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    },
})
export class privateChatservice {
    constructor(private prisma: PrismaService) { }
    @WebSocketServer()
    server: Server;

    @SubscribeMessage('join')
    async handleJoin(client: Socket, id: string) {
        console.log('join  ===>  ', id);
        client.join(id);
    }
    @SubscribeMessage('leave')
    async leave(client: Socket, id: string) {
        console.log('join  ===>  ', id);
        client.leave(id);
    }
    @SubscribeMessage('privatechat')
    async handleEvent(@MessageBody() event: any) {
       const data = await this.addNewMessage(event);
       this.server.to(event.chatId.toString()).emit('privatechatMsg', data);
    }
    async addNewMessage(event: any) {
        try {
            const availabe = await this.prisma.chat.findMany({
                where: {
                    OR: [
                      { senderid: event.senderid , receiverid: event.receiverid },
                      { senderid: event.receiverid , receiverid: event.senderid }, 
                    ],
                  },
                  select: {
                    id: true,
                  }
            });
             if (!availabe) throw new NotFoundException('chat not found');
            const createMessage = await this.prisma.messageChat.create({
                data: {
                    message: event.message,
                    senderid: event.senderid,
                    receiverid: event.receiverid,
                    chatId: availabe[0].id,
                    mychanellID: availabe[0].id,
                    updatedAt: new Date(),
                }
            });
            await this.prisma.chat.update({
                where: {id: availabe[0].id},
                data: {
                    updatedAt: new Date(),
                }
            });
            return createMessage;

        } catch (error) {
            throw error
        }
        

    }
 

    async listMessage(user1: number, user2: number) {

        const all = await this.prisma.chat.findMany({
            where: {
              OR: [
                { senderid: user1, receiverid: user2 },
                { senderid: user2, receiverid: user1 },
              ],
            },
            orderBy: {
              updatedAt: 'asc',
            },
            select: {
                        id: true,
                        channel: true,
                    }
          });
        return all;
    }


    async getFriends(userId: number) {


        const conversations = await this.prisma.chat.findMany({
            where: {
                OR: [
                    { senderid: userId },
                    { receiverid: userId },
                ],
            },
            orderBy: {updatedAt: 'desc'},
            select: {
                id: true,
                chatBlock: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        avatar: true,
                    },
                },
                  secondPlayer: {
                    select: {
                      id: true,
                      firstName: true,
                      lastName: true,
                      avatar: true,
                    },
                  },
            },
        });
        const usersWithConversations = conversations.flatMap(({ chatBlock,secondPlayer }) => {
            if (chatBlock.id === userId) {
                return secondPlayer;
            } else {
                return chatBlock;
            }
        });

        return usersWithConversations;
    }



}
