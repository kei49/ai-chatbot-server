import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { Chat } from './chats/entities/chat.entity';
import { ChatsModule } from './chats/chats.module';

@Module({
  imports: [
    UsersModule,
    ChatsModule,
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      // username: 'root',
      // password: 'root',
      database: 'ai-chatbot-server',
      models: [User, Chat],
      autoLoadModels: true,
      synchronize: false,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
