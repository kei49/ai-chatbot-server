import { ApiProperty } from '@nestjs/swagger';

export class JoinChatDto {
  @ApiProperty()
  userId: number;
}
