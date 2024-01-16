import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';
import { PrismaService } from '../../../prisma/prisma.service';

import { Server } from "socket.io";

import { readNotificationDto, CreateNotificationDto } from '../../dtos/notification.dtos';

const io = new Server();

@Injectable()
export class NotificationService {

    constructor(private prisma: PrismaService) { }

    async createNotification(data: CreateNotificationDto) {
    
        const notification = await this.prisma.notification.create({
          data: {
            userId: data.to,
            type: data.type,
          },
        });


        const roomNotification = await this.prisma.roomNotification.create({
          data: {
            notificationId: notification.id,
            senderUserId: data.from,
            message: "You have a new message",
          },
        });

        return roomNotification;
    
    }

    async getNotification() {

        const notification = await this.prisma.notification.findMany({
           
            orderBy: [
              {
                read: 'asc',
              },
              {
                createdAt: 'desc',
              }
            ],

            select: {
              id: true,
              read: true,
              createdAt: true,
              type: true,
              notification: {
                select: {
                  senderUser: {
                    select: {
                      UserName: true,
                      avatar: true,
                    },
                  },
                },
              },
              roomRotification: true, 
            },
          });

          this.emitNotification();

        return notification;
    }

    async countNotification() {
        const count = await this.prisma.notification.count(
            {
                where: {
                    read: false
                }
            }
        );
        return count;
    }


    async markAsRead(id: number) {
      console.log(id);
      
        const notification = await this.prisma.notification.update({
            where: {
                id: id
            },
            data: {
                read: true
            }
        });


        console.log(notification);

        return notification;
    }


    emitNotification() {
    
      io.emit('notification', {message: 'You have a new notification'});
    }
}
