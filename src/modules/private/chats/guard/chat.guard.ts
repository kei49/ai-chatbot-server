import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { SessionData } from 'express-session';
import { ChatRepository } from '../repository/chat.repository';

@Injectable()
export class ChatBelogToUserGuard implements CanActivate {
  constructor(private chatRepository: ChatRepository) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const sessionUser = (request.session as SessionData).user;
    const chatId = request.params.id;
    const chat = await this.chatRepository.findOneByUserId(
      sessionUser.id,
      chatId,
    );

    if (chat) return true;

    return false;
  }
}
