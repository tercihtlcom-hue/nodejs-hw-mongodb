import bcrypt from 'bcrypt';
import crypto from 'node:crypto';
import createHttpError from 'http-errors';

import { UsersCollection } from '../db/models/user.js';
import { SessionsCollection } from '../db/models/session.js';

const ACCESS_TOKEN_LIFETIME = 15 * 60 * 1000; // 15 minutes
const REFRESH_TOKEN_LIFETIME = 30 * 24 * 60 * 60 * 1000; // 30 days

const createSessionData = () => ({
  accessToken: crypto.randomBytes(30).toString('base64'),
  refreshToken: crypto.randomBytes(30).toString('base64'),
  accessTokenValidUntil: new Date(Date.now() + ACCESS_TOKEN_LIFETIME),
  refreshTokenValidUntil: new Date(Date.now() + REFRESH_TOKEN_LIFETIME),
});

export const registerUser = async (payload) => {
  const existingUser = await UsersCollection.findOne({ email: payload.email });

  if (existingUser) {
    throw createHttpError(409, 'Email in use');
  }

  const encryptedPassword = await bcrypt.hash(payload.password, 10);

  const user = await UsersCollection.create({
    ...payload,
    password: encryptedPassword,
  });

  return user;
};

export const loginUser = async ({ email, password }) => {
  const user = await UsersCollection.findOne({ email });

  if (!user) {
    throw createHttpError(401, 'Email or password is wrong');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw createHttpError(401, 'Email or password is wrong');
  }

  await SessionsCollection.deleteOne({ userId: user._id });

  const newSession = createSessionData();

  return SessionsCollection.create({
    userId: user._id,
    ...newSession,
  });
};

export const refreshSession = async ({ sessionId, refreshToken }) => {
  let session;

  try {
    session = await SessionsCollection.findOne({
      _id: sessionId,
      refreshToken,
    });
  } catch (error) {
    throw createHttpError(401, 'Session not found');
  }

  if (!session) {
    throw createHttpError(401, 'Session not found');
  }

  if (new Date() > new Date(session.refreshTokenValidUntil)) {
    throw createHttpError(401, 'Refresh token expired');
  }

  await SessionsCollection.deleteOne({ _id: sessionId });

  const newSession = createSessionData();

  return SessionsCollection.create({
    userId: session.userId,
    ...newSession,
  });
};

export const logoutUser = async (sessionId) => {
  try {
    await SessionsCollection.deleteOne({ _id: sessionId });
  } catch (error) {
    // ignore malformed session id — nothing to delete anyway
  }
};

export const findSessionByAccessToken = async (accessToken) => {
  return SessionsCollection.findOne({ accessToken });
};

export const findUserById = async (userId) => {
  return UsersCollection.findById(userId);
};
