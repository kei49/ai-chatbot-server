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
import { ChatBelogToUserGuard } from './guard/chat.guard';

@ApiTags('User')
@Controller('')
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}

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
  update(@Param('id') id: number, @Body() updateChatDto: UpdateChatDto) {
    return this.chatsService.update(id, updateChatDto);
  }

  @UseGuards(ChatBelogToUserGuard)
  @Patch('/:id/join')
  joinChat(@SessionUser() sessionUser: User, @Param('id') id: number) {
    return this.chatsService.joinChat(id, sessionUser.id);
  }

  @UseGuards(ChatBelogToUserGuard)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.chatsService.remove(id);
  }
}
