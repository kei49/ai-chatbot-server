import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { CreateChatDto } from './create-chat.dto';

export class UpdateChatDto extends PartialType(CreateChatDto) {
  @ApiProperty()
  name?: string;

  @ApiProperty()
  chatbotId?: number;
}
