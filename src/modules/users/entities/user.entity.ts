import { Column, Model, Table, HasMany } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Chat } from '../../chats/entities/chat.entity';

@Table
export class User extends Model {
  @ApiProperty()
  @Column
  userName: string;

  @ApiProperty()
  @Column
  name: string;

  // @HasOne(() => Chat, {
  //   foreignKey: 'id',
  //   constraints: false,
  // })
  // currentChat: number;

  @ApiProperty()
  @HasMany(() => Chat)
  chats: Chat[];
}
