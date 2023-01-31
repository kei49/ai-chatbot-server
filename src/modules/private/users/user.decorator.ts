import {
  BadRequestException,
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';
import { SessionData } from 'express-session';

export const SessionUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = (request.session as SessionData)?.user;

    if (!user) throw new BadRequestException();

    return user;
  },
);
