import * as session from 'express-session';

import { SESSION_SECRET } from './constants';

export const getSession = () => {
  return session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
    },
  });
};
