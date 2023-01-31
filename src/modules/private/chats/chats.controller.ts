import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Session,
  BadRequestException,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SessionData } from 'express-session';
import { getUserIdBySession } from '../../../shared/session';
import { ChatsService } from './chats.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { JoinChatDto } from './dto/join-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';

@ApiTags('User')
@Controller('')
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  @Post()
  create(
    @Session() session: SessionData,
    @Body() createChatDto: CreateChatDto,
  ) {
    const userId = getUserIdBySession(session);
    if (!userId) throw new BadRequestException();

    return this.chatsService.create(userId, createChatDto);
  }

  @Get()
  findAll() {
    return this.chatsService.findAll();
  }

  @ApiTags('Admin')
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.chatsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateChatDto: UpdateChatDto) {
    return this.chatsService.update(id, updateChatDto);
  }

  @Patch('/:id/join')
  joinChat(@Param('id') id: number, @Body() joinChatDto: JoinChatDto) {
    return this.chatsService.joinChat(id, joinChatDto.userId);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.chatsService.remove(id);
  }
}
