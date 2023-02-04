import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { Message } from './entities/message.entity';
import { MessageRepository } from './repository/message.repository';
import { UsersModule } from '../users/users.module';
import { ChatsModule } from '../chats/chats.module';

@Module({
  imports: [UsersModule, ChatsModule, SequelizeModule.forFeature([Message])],
  controllers: [MessagesController],
  providers: [MessagesService, MessageRepository],
})
export class MessagesModule {}
