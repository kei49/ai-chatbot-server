import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UserRepository } from '../../modules/private/users/repository/user.repository';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private userRepository: UserRepository) {}

  async use(req: Request, res: Response, next: NextFunction) {
    if (!req.session || !(req.session as any)?.user?.id) {
      throw new UnauthorizedException();
    }

    const user = await this.userRepository.findOneUserOnly(req.session.user.id);
    req.session.user = user?.dataValues;

    console.log('Successfully authorized with', req.session.user);
    next();
  }
}
