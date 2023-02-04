import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { CreateChatbotDto } from './create-chatbot.dto';

export class UpdateChatbotDto extends PartialType(CreateChatbotDto) {
  @ApiProperty()
  name?: string;

  @ApiProperty()
  language?: string;

  @ApiProperty()
  apiName?: string;

  @ApiProperty()
  apiEndpoint?: string;
}
