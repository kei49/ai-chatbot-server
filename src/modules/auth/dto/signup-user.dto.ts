import { ApiProperty } from '@nestjs/swagger';

export class SignupUserDto {
  @ApiProperty()
  userName: string;

  @ApiProperty()
  name: string;
}
