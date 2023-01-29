import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';
import { Chat } from '../../chats/entities/chat.entity';
import { LoginUserDto } from '../dto/login-user.dto';

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User) private userModel: typeof User) {}

  async create(createUserDto: CreateUserDto) {
    const res = await this.userModel.create({ ...createUserDto });
    return res.dataValues;
  }

  // THIS LOGIN IS NOT FOR PRODUCTION AND NEEDS TO BE UPDATED LATER
  async login(loginUserDto: LoginUserDto) {
    const user = await this.findByUsername(loginUserDto.userName);
    return user;
  }

  async findAll(): Promise<User[]> {
    return this.userModel.findAll();
  }

  async findOne(id: number): Promise<User | null> {
    return this.userModel.findOne({
      where: {
        id,
      },
      include: [
        {
          model: Chat,
        },
      ],
    });
  }

  async findByUsername(userName: string): Promise<User | null> {
    const user = await this.userModel.findOne({
      where: {
        userName,
      },
      include: [
        {
          model: Chat,
        },
      ],
    });

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<any> {
    return await this.userModel.update({ ...updateUserDto }, { where: { id } });
  }

  async remove(id: number): Promise<void> {
    const user = await this.findOne(id);
    await user?.destroy();
  }
}
