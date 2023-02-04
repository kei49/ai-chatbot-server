import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { CreateMessageDto } from '../dto/create-message.dto';
import { UpdateMessageDto } from '../dto/update-message.dto';
import { Message } from '../entities/message.entity';

@Injectable()
export class MessageRepository {
  constructor(@InjectModel(Message) private messageModel: typeof Message) {}

  async create(
    userId: number,
    createMessageDto: CreateMessageDto,
  ): Promise<Message> {
    const res = await this.messageModel.create({ ...createMessageDto, userId });
    return res.dataValues;
  }

  async findAll(): Promise<Message[]> {
    return this.messageModel.findAll();
  }

  async findAllByChatId(userId: number, chatId: number): Promise<Message[]> {
    return this.messageModel.findAll({ where: { userId, chatId } });
  }

  async findOne(id: number): Promise<Message | null> {
    return this.messageModel.findOne({
      where: {
        id,
      },
    });
  }

  async update(id: number, updateMessageDto: UpdateMessageDto): Promise<any> {
    return await this.messageModel.update(
      { ...updateMessageDto },
      { where: { id } },
    );
  }

  async remove(id: number): Promise<void> {
    const message = await this.findOne(id);
    await message?.destroy();
  }
}
