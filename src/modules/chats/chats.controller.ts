import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ChatsService } from './chats.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { JoinChatDto } from './dto/join-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';

@Controller('chats')
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  @Post()
  create(@Body() createChatDto: CreateChatDto) {
    return this.chatsService.create(createChatDto);
  }

  @Get()
  findAll() {
    return this.chatsService.findAll();
  }

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
