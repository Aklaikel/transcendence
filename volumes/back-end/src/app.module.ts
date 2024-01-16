import { MiddlewareConsumer, Module } from '@nestjs/common';
// import { AppController } from './app.controller';
import { AppService } from './app.service';
import { connectmodule } from './connect/connectModule';
import { PassportModule } from '@nestjs/passport';
import { PrismaModule } from './prisma/prisma.module';
import { GameController } from './game/controllers/game/game.controller';
import { GameService } from './game/services/game/game.service';
import { GameModule } from './game/game.module';
import { SearchController } from './search/controller/search/search.controller';
import { SearchService } from './search/services/search/search.service';
import { ProfileController } from './profile/controller/profile/profile.controller';
import { ProfileService } from './profile/services/profile/profile.service';
import { PrismaService } from './prisma/prisma.service';
import { ChatroomModule } from './chatroom/chatroom.module';
import { MessageRoomModule } from './messageroom/message.module';

import { NotificationsGateway } from './notification/gateway/notifications/notifications.gateway';

import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { NotificationModule } from './notification/notification.module';
import { NotificationService } from './notification/services/notification/notification.service';
import { NotificationController } from './notification/controller/notification/notification.controller';
import { LoggerMiddleware } from './connect/strategy/logger.maidlewaire';

import { privateChatModule } from './privatechat/privateChat.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MulterModule.register({
      dest: './upload',
    }),
    NotificationModule,
    MessageRoomModule,
    ChatroomModule,
    connectmodule,
    PrismaModule,
    PassportModule.register({ session: true }),
    GameModule,
    PrismaModule,
  ],
  // controllers: [AppController],

  providers: [
    AppService,
    GameService,
    SearchService,
    ProfileService,
    NotificationService,
    NotificationsGateway,
    PrismaService,
  ],

  controllers: [
    GameController,
    SearchController,
    ProfileController,
    NotificationController,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('room/update');
  }
}
