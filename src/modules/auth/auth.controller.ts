import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Session,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // THIS LOGIN IS NOT FOR PRODUCTION AND NEEDS TO BE UPDATED LATER
  @Post('login')
  async login(
    @Session() session: Record<string, any>,
    @Body() loginUserDto: LoginAuthDto,
  ) {
    const user = await this.authService.login(loginUserDto);
    if (user === null) {
      throw new BadRequestException();
    }

    session.user = user;
    return user;
  }
}
