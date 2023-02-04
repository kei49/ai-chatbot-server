import {
  Column,
  Model,
  Table,
  AllowNull,
  ForeignKey,
  BelongsTo,
  Default,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/entities/user.entity';
import { Chat } from '../../chats/entities/chat.entity';

@Table
export class Message extends Model {
  @ForeignKey(() => User)
  @ApiProperty()
  @AllowNull(false)
  @Column
  userId: number;

  @ForeignKey(() => Chat)
  @ApiProperty()
  @AllowNull(false)
  @Column
  chatId: number;

  @BelongsTo(() => Chat)
  @ApiProperty()
  chat: Chat;

  @ApiProperty()
  @AllowNull(false)
  @Column
  isFromUser: boolean;

  @ApiProperty()
  @AllowNull(false)
  @Default('text')
  @Column
  messageType: string;

  @ApiProperty()
  @AllowNull(false)
  @Column
  contents: string;
}
