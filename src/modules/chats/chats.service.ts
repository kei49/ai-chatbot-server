import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { Chat } from './entities/chat.entity';

@Injectable()
export class ChatsService {
  constructor(@InjectModel(Chat) private chatModel: typeof Chat) {}

  async create(createChatDto: CreateChatDto) {
    const chat = await this.chatModel.create({ ...createChatDto });
    return chat;
  }

  async findAll(): Promise<Chat[]> {
    return this.chatModel.findAll();
  }

  async findOne(id: string): Promise<Chat | null> {
    return this.chatModel.findOne({
      where: {
        id,
      },
    });
  }

  async update(id: string, updateChatDto: UpdateChatDto): Promise<any> {
    return await this.chatModel.update({ ...updateChatDto }, { where: { id } });
  }

  async remove(id: string): Promise<void> {
    const chat = await this.findOne(id);
    await chat?.destroy();
  }
}
