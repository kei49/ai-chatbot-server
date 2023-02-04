import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { SequelizeModule } from '@nestjs/sequelize';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './private/users/users.module';
import { User } from './private/users/entities/user.entity';
import { Chat } from './private/chats/entities/chat.entity';
import { ChatsModule } from './private/chats/chats.module';
import { AuthMiddleware } from '../shared/auth/auth.middleware';
import { PrivateModule } from './private/private.module';
import { AuthModule } from './auth/auth.module';
import { ChatbotsModule } from './private/chatbots/chatbots.module';

@Module({
  imports: [
    AuthModule,
    PrivateModule,
    RouterModule.register([
      {
        path: 'private',
        module: PrivateModule,
        children: [
          {
            path: 'users',
            module: UsersModule,
          },
          {
            path: 'chats',
            module: ChatsModule,
          },
          {
            path: 'chatbots',
            module: ChatbotsModule,
          },
        ],
      },
    ]),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      database: 'ai-chatbot-server',
      models: [User, Chat],
      autoLoadModels: true,
      synchronize: false,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: 'private/*', method: RequestMethod.ALL });
  }
}
