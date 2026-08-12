import createHttpError from 'http-errors';

import { findSessionByAccessToken, findUserById } from '../services/auth.js';

export const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.get('Authorization');

    if (!authHeader) {
      next(createHttpError(401, 'Please provide Authorization header'));
      return;
    }

    const [bearer, accessToken] = authHeader.split(' ');

    if (bearer !== 'Bearer' || !accessToken) {
      next(createHttpError(401, 'Auth header should be of type Bearer'));
      return;
    }

    const session = await findSessionByAccessToken(accessToken);

    if (!session) {
      next(createHttpError(401, 'Session not found'));
      return;
    }

    if (new Date() > new Date(session.accessTokenValidUntil)) {
      next(createHttpError(401, 'Access token expired'));
      return;
    }

    const user = await findUserById(session.userId);

    if (!user) {
      next(createHttpError(401, 'User not found'));
      return;
    }

    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};
