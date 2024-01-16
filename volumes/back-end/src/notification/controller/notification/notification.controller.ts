
import { Controller, Get, Post, Body, Patch, ValidationPipe } from '@nestjs/common';
import { CreateNotificationDto, readNotificationDto } from '../../dtos/notification.dtos';


import { NotificationService } from '../../services/notification/notification.service';
import { NotificationsGateway } from '../../gateway/notifications/notifications.gateway';

@Controller('notifications')
export class NotificationController {

    constructor(
        private notificationService: NotificationService,
        private notificationGateway: NotificationsGateway    
    ) {}

    @Get()
    getNotification() {

        return this.notificationService.getNotification();
    }

    @Get('count')
    countNotification() {
        return this.notificationService.countNotification();
    }

    @Post()
    createNotification(@Body() createNotification: CreateNotificationDto) {


        const notification = this.notificationService.createNotification(createNotification);
        this.notificationGateway.emitNewNotivication();
        
        
        return notification;
    }

    @Patch()
    markAsRead(@Body() notification: readNotificationDto) {
        const {id} = notification;
        return this.notificationService.markAsRead(id);
    }

}
