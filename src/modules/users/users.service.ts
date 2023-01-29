import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userModel: typeof User) {}

  async create(createUserDto: CreateUserDto) {
    const res = await this.userModel.create({ ...createUserDto });
    return res.dataValues;
  }

  async findAll(): Promise<User[]> {
    return this.userModel.findAll();
  }

  async findOne(id: string): Promise<User | null> {
    return this.userModel.findOne({
      where: {
        id,
      },
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<any> {
    return await this.userModel.update(updateUserDto, { where: { id } });
  }

  async findByUsername(userName: string): Promise<User | null> {
    const user = await this.userModel.findOne({
      where: {
        userName,
      },
    });

    return user;
  }

  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);
    await user?.destroy();
  }
}
