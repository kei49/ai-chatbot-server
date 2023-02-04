import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { Message } from './entities/message.entity';
import { MessageRepository } from './repository/message.repository';

@Injectable()
export class MessagesService {
  constructor(private messageRepository: MessageRepository) {}

  async create(
    userId: number,
    chatId: number,
    createMessageDto: CreateMessageDto,
  ): Promise<Message | null> {
    const userMessage = await this.messageRepository.create(
      userId,
      chatId,
      createMessageDto,
    );

    if (userMessage) {
      const chatbotMessageContent =
        'This is the AI Chatbot! What do you want to talk with me?';

      const createChatbotMessageDto = {
        isFromUser: false,
        messageType: 'text',
        contents: chatbotMessageContent,
      } as CreateMessageDto;

      const chatbotMessage = await this.messageRepository.create(
        userId,
        chatId,
        createChatbotMessageDto,
      );
      return chatbotMessage;
    }

    return null;
  }

  async findAllByChatId(userId: number, chatId: number): Promise<Message[]> {
    return this.messageRepository.findAllByChatId(userId, chatId);
  }

  async remove(id: number): Promise<void> {
    return this.messageRepository.remove(id);
  }
}
