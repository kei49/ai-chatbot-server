import { Injectable } from '@nestjs/common';
import { CreateChatbotDto } from './dto/create-chatbot.dto';
import { UpdateChatbotDto } from './dto/update-chatbot.dto';
import { Chatbot } from './entities/chatbot.entity';
import { ChatbotRepository } from './repository/chatbot.repository';

@Injectable()
export class ChatbotsService {
  constructor(private chatbotRepository: ChatbotRepository) {}

  async create(createChatbotDto: CreateChatbotDto) {
    return this.chatbotRepository.create(createChatbotDto);
  }

  async findAll(): Promise<Chatbot[]> {
    return this.chatbotRepository.findAll();
  }

  async findOne(id: number): Promise<Chatbot | null> {
    return this.chatbotRepository.findOne(id);
  }

  async update(id: number, updateChatbotDto: UpdateChatbotDto): Promise<any> {
    return this.chatbotRepository.update(id, updateChatbotDto);
  }

  async remove(id: number): Promise<void> {
    return this.chatbotRepository.remove(id);
  }
}
