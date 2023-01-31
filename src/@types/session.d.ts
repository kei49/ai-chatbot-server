import { UserModel } from '../modules/private/users/entities/user.entity';

declare module 'express-session' {
  interface SessionData {
    user?: UserModel;
  }
}
