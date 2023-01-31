import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from '../users/dto/update-user.dto';
import { UserRepository } from '../users/repository/user.repository';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { Chat } from './entities/chat.entity';
import { ChatRepository } from './repository/chat.repository';

@Injectable()
export class ChatsService {
  constructor(
    private chatRepository: ChatRepository,
    private userRepository: UserRepository,
  ) {}

  async create(userId: number, createChatDto: CreateChatDto) {
    return this.chatRepository.create(userId, createChatDto);
  }

  async findAll(): Promise<Chat[]> {
    return this.chatRepository.findAll();
  }

  async findAllByUserId(userId: number): Promise<Chat[]> {
    return this.chatRepository.findAllByUserId(userId);
  }

  async findOne(id: number): Promise<Chat | null> {
    return this.chatRepository.findOne(id);
  }

  async findOneByUserId(userId: number, id: number) {
    return this.chatRepository.findOneByUserId(userId, id);
  }

  async update(id: number, updateChatDto: UpdateChatDto): Promise<any> {
    return this.chatRepository.update(id, updateChatDto);
  }

  async remove(id: number): Promise<void> {
    return this.chatRepository.remove(id);
  }

  async joinChat(id: number, userId: number): Promise<Chat> {
    return this.userRepository.update(userId, {
      currentChatId: id,
    } as UpdateUserDto);
  }
}
