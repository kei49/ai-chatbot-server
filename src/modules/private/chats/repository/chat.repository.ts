import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { CreateChatDto } from '../dto/create-chat.dto';
import { UpdateChatDto } from '../dto/update-chat.dto';
import { Chat } from '../entities/chat.entity';

@Injectable()
export class ChatRepository {
  constructor(@InjectModel(Chat) private chatModel: typeof Chat) {}

  async create(userId: number, createChatDto: CreateChatDto) {
    const res = await this.chatModel.create({ ...createChatDto, userId });
    return res.dataValues;
  }

  async findAll(): Promise<Chat[]> {
    return this.chatModel.findAll();
  }

  async findAllByUserId(userId: number): Promise<Chat[]> {
    return this.chatModel.findAll({ where: { userId } });
  }

  async findOne(id: number): Promise<Chat | null> {
    return this.chatModel.findOne({
      where: {
        id,
      },
    });
  }

  async findOneByUserId(userId: number, id: number): Promise<Chat | null> {
    return this.chatModel.findOne({
      where: {
        id,
        userId,
      },
    });
  }

  async update(id: number, updateUserDto: UpdateChatDto): Promise<any> {
    return await this.chatModel.update({ ...updateUserDto }, { where: { id } });
  }

  async remove(id: number): Promise<void> {
    const chat = await this.findOne(id);
    await chat?.destroy();
  }
}
