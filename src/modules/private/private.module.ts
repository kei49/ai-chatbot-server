import { Module } from '@nestjs/common';
import { ChatsModule } from './chats/chats.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule, ChatsModule],
  controllers: [],
  providers: [],
})
export class PrivateModule {}
