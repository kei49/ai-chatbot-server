import {
  Column,
  Model,
  Table,
  AllowNull,
  ForeignKey,
} from 'sequelize-typescript';
import { User } from '../../users/entities/user.entity';

@Table
export class Chat extends Model {
  @Column
  name: string;

  // @ForeignKey(() => Chatbot)
  @AllowNull
  @Column
  chatbotId: number;

  @ForeignKey(() => User)
  @Column
  userId: number;
}
