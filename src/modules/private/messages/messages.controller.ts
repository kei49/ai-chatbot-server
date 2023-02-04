import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  InternalServerErrorException,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from '../users/entities/user.entity';
import { SessionUser } from '../users/user.decorator';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { ChatBelogToUserGuard } from '../chats/guard/chat.guard';

@ApiTags('User')
@UseGuards(ChatBelogToUserGuard)
@Controller('')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post('')
  async create(
    @SessionUser() sessionUser: User,
    @Body() createMessageDto: CreateMessageDto,
  ) {
    const chatbotMessage = await this.messagesService.create(
      sessionUser.id,
      sessionUser.currentChatId,
      createMessageDto,
    );

    if (chatbotMessage === null) {
      throw new InternalServerErrorException();
    }

    return chatbotMessage;
  }

  @Get('')
  findAllByChatId(@SessionUser() sessionUser: User) {
    return this.messagesService.findAllByChatId(
      sessionUser.id,
      sessionUser.currentChatId,
    );
  }

  @Delete(':messageId')
  async remove(@Param('messageId') messageId: number) {
    await this.messagesService.remove(messageId);
  }
}
