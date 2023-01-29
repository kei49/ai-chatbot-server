import { Injectable } from '@nestjs/common';
import { UserRepository } from '../private/users/repository/user.repository';
import { LoginAuthDto } from './dto/login-auth.dto';

@Injectable()
export class AuthService {
  constructor(private userRepository: UserRepository) {}

  async login(loginAuthDto: LoginAuthDto) {
    return this.userRepository.findByUsername(loginAuthDto.userName);
  }
}
