import { Module } from '@nestjs/common';
import { ChatbotsModule } from './chatbots/chatbots.module';
import { ChatsModule } from './chats/chats.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule, ChatsModule, ChatbotsModule],
  controllers: [],
  providers: [],
})
export class PrivateModule {}
