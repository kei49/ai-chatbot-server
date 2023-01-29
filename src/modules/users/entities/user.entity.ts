import {
  Column,
  Model,
  Table,
  HasMany,
  AllowNull,
  Unique,
  ForeignKey,
  Default,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Chat } from '../../chats/entities/chat.entity';

@Table
export class User extends Model {
  @ApiProperty()
  @AllowNull(false)
  @Unique
  @Column
  userName: string;

  @ApiProperty()
  @AllowNull(false)
  @Column
  name: string;

  @ForeignKey(() => Chat)
  @Default(null)
  @Column
  currentChatId: number;

  @ApiProperty()
  @HasMany(() => Chat)
  chats: Chat[];
}
