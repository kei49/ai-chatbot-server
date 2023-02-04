import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Session,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { SignupUserDto } from './dto/signup-user.dto';

// THIS AUTH IS NOT FOR PRODUCTION USAGE AND NEEDS TO BE IMPROVED LATER
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(
    @Session() session: Record<string, any>,
    @Body() signupUserDto: SignupUserDto,
  ) {
    const user = await this.authService.signup(signupUserDto);

    session.user = user;
    return user;
  }

  @Post('login')
  async login(
    @Session() session: Record<string, any>,
    @Body() loginUserDto: LoginAuthDto,
  ) {
    const user = await this.authService.login(loginUserDto);
    if (user === null) {
      throw new BadRequestException();
    }

    session.user = user.dataValues;
    return user;
  }
}
