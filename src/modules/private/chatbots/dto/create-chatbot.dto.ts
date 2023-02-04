import { ApiProperty } from '@nestjs/swagger';

export class CreateChatbotDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  language: string;

  @ApiProperty()
  apiName?: string;

  @ApiProperty()
  apiEndpoint?: string;
}
