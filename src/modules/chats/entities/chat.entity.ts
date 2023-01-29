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
  @Column
  name: string;

  // @ForeignKey(() => Chatbot)
  @ApiProperty()
  @AllowNull
  @Column
  chatbotId: number;

  @ApiProperty()
  @ForeignKey(() => User)
  @Column
  userId: number;
}
