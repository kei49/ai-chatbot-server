import { Column, Model, Table, AllowNull, HasOne, HasMany } from 'sequelize-typescript';
import { Chat } from '../../chats/entities/chat.entity';

@Table
export class User extends Model {
  @Column
  userName: string;

  @Column
  name: string;

  // @HasOne(() => Chat, {
  //   foreignKey: 'id',
  //   constraints: false,
  // })
  // currentChat: number;

  @HasMany(() => Chat)
  chats: Chat[];
}
