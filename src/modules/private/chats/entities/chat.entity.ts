import {
  Column,
  Model,
  Table,
  AllowNull,
  ForeignKey,
  HasMany,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/entities/user.entity';
import { Chatbot } from '../../chatbots/entities/chatbot.entity';
import { Message } from '../../messages/entities/message.entity';

@Table
export class Chat extends Model {
  @ApiProperty()
  @AllowNull(false)
  @Column
  name: string;

  @ForeignKey(() => Chatbot)
  @ApiProperty()
  @Column
  chatbotId: number;

  @ApiProperty()
  @ForeignKey(() => User)
  @AllowNull(false)
  @Column
  userId: number;

  @ApiProperty()
  @HasMany(() => Message)
  messages: Message;
}
