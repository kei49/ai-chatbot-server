import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from '../users/entities/user.entity';
import { SessionUser } from '../users/user.decorator';
import { ChatsService } from './chats.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { ChatBelogToUserGuard, ChatbotExisted } from './guard/chat.guard';

@ApiTags('User')
@Controller('')
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  @UseGuards(ChatbotExisted)
  @Post()
  create(
    @SessionUser() sessionUser: User,
    @Body() createChatDto: CreateChatDto,
  ) {
    return this.chatsService.create(sessionUser.id, createChatDto);
  }

  @Get()
  findAll(@SessionUser() sessionUser: User) {
    const userId = sessionUser.id;
    return this.chatsService.findAllByUserId(userId);
  }

  @UseGuards(ChatBelogToUserGuard)
  @Get(':id')
  findOne(@SessionUser() sessionUser: User, @Param('id') id: number) {
    return this.chatsService.findOneByUserId(sessionUser.id, id);
  }

  @UseGuards(ChatBelogToUserGuard)
  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateChatDto: UpdateChatDto) {
    await this.chatsService.update(id, updateChatDto);
  }

  @UseGuards(ChatBelogToUserGuard)
  @Patch('/:id/join')
  async joinChat(@SessionUser() sessionUser: User, @Param('id') id: number) {
    await this.chatsService.joinChat(id, sessionUser.id);
  }

  @UseGuards(ChatBelogToUserGuard)
  @Delete(':id')
  async remove(@Param('id') id: number) {
    await this.chatsService.remove(id);
  }
}
