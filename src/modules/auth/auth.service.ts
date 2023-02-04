import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRepository } from '../private/users/repository/user.repository';
import { LoginAuthDto } from './dto/login-auth.dto';
import { SignupUserDto } from './dto/signup-user.dto';

@Injectable()
export class AuthService {
  constructor(private userRepository: UserRepository) {}

  async login(loginAuthDto: LoginAuthDto) {
    return this.userRepository.findByUsername(loginAuthDto.userName);
  }

  async signup(signupUserDto: SignupUserDto) {
    const user = await this.userRepository.findByUsername(
      signupUserDto.userName,
    );

    if (user !== null)
      throw new BadRequestException(
        `userName: ${signupUserDto.userName} is already used`,
      );

    return this.userRepository.create(signupUserDto);
  }
}
