import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { SessionUser } from './user.decorator';
import { User } from './entities/user.entity';

@Controller('')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiTags('User')
  @Patch(':id')
  update(
    @SessionUser() sessionUser: User,
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    if (sessionUser.id !== id) throw new BadRequestException();

    return this.usersService.update(id, updateUserDto);
  }

  @ApiTags('Admin')
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @ApiTags('Admin')
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @ApiTags('Admin')
  @Get(':userName')
  async findOne(@Param('userName') userName: string) {
    const user = await this.usersService.findByUsername(userName);

    if (user === null) {
      throw new NotFoundException();
    }

    return user;
  }

  @ApiTags('Admin')
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.usersService.remove(id);
  }
}
