import { ApiProperty } from '@nestjs/swagger';

export class CreateMessageDto {
  @ApiProperty()
  isFromUser: boolean;

  @ApiProperty()
  messageType: string;

  @ApiProperty()
  contents: string;
}
