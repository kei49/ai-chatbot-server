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
  ParseIntPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserBaseDto } from './dto/update-user.dto';
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
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserBaseDto: UpdateUserBaseDto,
  ) {
    console.log('sessionUser', sessionUser, id);
    if (sessionUser.id !== id) throw new BadRequestException();

    return this.usersService.update(id, updateUserBaseDto);
  }

  @ApiTags('User')
  @Get('me')
  getMe(@SessionUser() sessionUser: User) {
    return this.usersService.findOne(sessionUser.id);
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
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }
}
