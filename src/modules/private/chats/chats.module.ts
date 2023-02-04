import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { ChatsService } from './chats.service';
import { ChatsController } from './chats.controller';
import { Chat } from './entities/chat.entity';
import { ChatRepository } from './repository/chat.repository';
import { UsersModule } from '../users/users.module';
import { ChatbotsModule } from '../chatbots/chatbots.module';
import { ChatBelogToUserGuard } from './guard/chat.guard';

@Module({
  imports: [UsersModule, ChatbotsModule, SequelizeModule.forFeature([Chat])],
  controllers: [ChatsController],
  providers: [ChatsService, ChatRepository, ChatBelogToUserGuard],
  exports: [ChatBelogToUserGuard, ChatRepository],
})
export class ChatsModule {}
