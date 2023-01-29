import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('@@@@@ status', req.session);
    if (!req.session || !(req.session as any)?.user?.id) {
      throw new UnauthorizedException();
    }

    console.log('Successfully authorized:', req.session);
    next();
  }
}
