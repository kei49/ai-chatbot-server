import { Column, Model, Table, AllowNull } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

@Table
export class Chatbot extends Model {
  @ApiProperty()
  @AllowNull(false)
  @Column
  name: string;

  @ApiProperty()
  @AllowNull(false)
  @Column
  language: string;

  @ApiProperty()
  @Column
  apiName: string;

  @ApiProperty()
  @Column
  apiEndpoint: string;
}
