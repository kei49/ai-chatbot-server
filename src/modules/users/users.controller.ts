import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  Session,
  BadRequestException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Post('login')
  async login(
    @Session() session: Record<string, any>,
    @Body() loginUserDto: LoginUserDto,
  ) {
    const user = await this.usersService.login(loginUserDto);
    if (user === null) {
      throw new BadRequestException();
    }

    session.user = user;
    return user;
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':userName')
  async findOne(@Param('userName') userName: string) {
    const user = await this.usersService.findByUsername(userName);

    if (user === null) {
      throw new NotFoundException();
    }

    return user;
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.usersService.remove(id);
  }
}
