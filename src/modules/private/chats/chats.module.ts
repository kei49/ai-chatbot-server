import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { ChatsService } from './chats.service';
import { ChatsController } from './chats.controller';
import { Chat } from './entities/chat.entity';
import { ChatRepository } from './repository/chat.repository';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule, SequelizeModule.forFeature([Chat])],
  controllers: [ChatsController],
  providers: [ChatsService, ChatRepository],
})
export class ChatsModule {}
