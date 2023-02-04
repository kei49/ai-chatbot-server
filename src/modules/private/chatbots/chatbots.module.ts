import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { ChatbotsService } from './chatbots.service';
import { ChatbotsController } from './chatbots.controller';
import { Chatbot } from './entities/chatbot.entity';
import { ChatbotRepository } from './repository/chatbot.repository';

@Module({
  imports: [SequelizeModule.forFeature([Chatbot])],
  controllers: [ChatbotsController],
  providers: [ChatbotsService, ChatbotRepository],
  exports: [ChatbotRepository],
})
export class ChatbotsModule {}
