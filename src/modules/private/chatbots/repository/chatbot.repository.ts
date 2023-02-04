import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { CreateChatbotDto } from '../dto/create-chatbot.dto';
import { UpdateChatbotDto } from '../dto/update-chatbot.dto';
import { Chatbot } from '../entities/chatbot.entity';

@Injectable()
export class ChatbotRepository {
  constructor(@InjectModel(Chatbot) private chatbotModel: typeof Chatbot) {}

  async create(createChatbotDto: CreateChatbotDto) {
    const res = await this.chatbotModel.create({ ...createChatbotDto });
    return res.dataValues;
  }

  async findAll(): Promise<Chatbot[]> {
    return this.chatbotModel.findAll();
  }

  async findOne(id: number): Promise<Chatbot | null> {
    return this.chatbotModel.findOne({
      where: {
        id,
      },
    });
  }

  async update(id: number, updateChatbotDto: UpdateChatbotDto): Promise<any> {
    return await this.chatbotModel.update(
      { ...updateChatbotDto },
      { where: { id } },
    );
  }

  async remove(id: number): Promise<void> {
    const chatbot = await this.findOne(id);
    await chatbot?.destroy();
  }
}
