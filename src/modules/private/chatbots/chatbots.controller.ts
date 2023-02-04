import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ChatbotsService } from './chatbots.service';
import { CreateChatbotDto } from './dto/create-chatbot.dto';
import { UpdateChatbotDto } from './dto/update-chatbot.dto';

@ApiTags('Admin')
@Controller('')
export class ChatbotsController {
  constructor(private readonly chatbotsService: ChatbotsService) {}

  @Post()
  create(@Body() createChatbotDto: CreateChatbotDto) {
    return this.chatbotsService.create(createChatbotDto);
  }

  @ApiTags('User')
  @Get()
  findAll() {
    return this.chatbotsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const chatbot = await this.chatbotsService.findOne(id);

    if (chatbot === null) {
      throw new NotFoundException();
    }

    return chatbot;
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateChatbotDto: UpdateChatbotDto,
  ) {
    await this.chatbotsService.update(id, updateChatbotDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    await this.chatbotsService.remove(id);
  }
}
