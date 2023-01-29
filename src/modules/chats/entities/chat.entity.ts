import {
  Column,
  Model,
  Table,
  AllowNull,
  ForeignKey,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/entities/user.entity';

@Table
export class Chat extends Model {
  @ApiProperty()
  @AllowNull(false)
  @Column
  name: string;

  // @ForeignKey(() => Chatbot)
  @ApiProperty()
  @Column
  chatbotId: number;

  @ApiProperty()
  @ForeignKey(() => User)
  @AllowNull(false)
  @Column
  userId: number;
}
