import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { SessionData } from 'express-session';
import { ChatbotRepository } from '../../chatbots/repository/chatbot.repository';
import { ChatRepository } from '../repository/chat.repository';

@Injectable()
export class ChatBelogToUserGuard implements CanActivate {
  constructor(private chatRepository: ChatRepository) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const sessionUser = (request.session as SessionData).user;
    const url = request.url;

    const chatId = url.includes('chats')
      ? request.params.id
      : url.includes('messages')
      ? sessionUser.currentChatId
      : undefined;

    const chat = await this.chatRepository.findOneByUserId(
      sessionUser.id,
      chatId,
    );

    if (chat) return true;

    return false;
  }
}

@Injectable()
export class ChatbotExisted implements CanActivate {
  constructor(private chatbotRepository: ChatbotRepository) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const chatbotId = request.body.chatbotId;
    const chatbot = await this.chatbotRepository.findOne(chatbotId);

    if (chatbot) return true;

    return false;
  }
}
