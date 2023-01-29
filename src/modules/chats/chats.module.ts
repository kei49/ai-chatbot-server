import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { ChatsService } from './chats.service';
import { ChatsController } from './chats.controller';
import { Chat } from './entities/chat.entity';

@Module({
  imports: [SequelizeModule.forFeature([Chat])],
  controllers: [ChatsController],
  providers: [ChatsService],
})
export class ChatsModule {}
