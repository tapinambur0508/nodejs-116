import {
  registerUser,
  loginUser,
  logoutUser,
  refreshSession,
  requestPasswordReset,
  resetPassword,
  loginOrRegister,
} from '../services/auth.js';

import { getOAuthURL, validateCode } from '../utils/googleOAuth.js';

export async function registerUserController(req, res) {
  const user = await registerUser(req.body);

  res
    .status(201)
    .json({ status: 201, message: 'User created successfully', data: user });
}

export async function loginUserController(req, res) {
  const session = await loginUser(req.body.email, req.body.password);

  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expire: session.refreshTokenValidUntil,
  });

  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expire: session.refreshTokenValidUntil,
  });

  res.send({
    status: 200,
    message: 'User login successfully',
    data: {
      accessToken: session.accessToken,
    },
  });
}

export async function logoutUserController(req, res) {
  const { sessionId } = req.cookies;

  if (typeof sessionId === 'string') {
    await logoutUser(sessionId);
  }

  res.clearCookie('sessionId');
  res.clearCookie('refreshToken');

  res.send({ status: 200, message: 'User logout successfully' });
}

export async function refreshSessionController(req, res) {
  const { sessionId, refreshToken } = req.cookies;

  const session = await refreshSession(sessionId, refreshToken);

  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expire: session.refreshTokenValidUntil,
  });

  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expire: session.refreshTokenValidUntil,
  });

  res.send({
    status: 200,
    message: 'Refresh session successfully',
    data: {
      accessToken: session.accessToken,
    },
  });
}

export async function requestPasswordResetController(req, res) {
  await requestPasswordReset(req.body.email);

  res.json({ status: 200, message: 'Email successfully sent' });
}

export async function resetPasswordController(req, res) {
  await resetPassword(req.body.token, req.body.password);

  res.json({ status: 200, message: 'Reset password successfully' });
}

export function getOAuthURLController(req, res) {
  const url = getOAuthURL();

  res.json({
    status: 200,
    message: 'Successfully get OAuth url',
    data: {
      oauth_url: url,
    },
  });
}

export async function confirmOAuthController(req, res) {
  const ticket = await validateCode(req.body.code);

  const session = await loginOrRegister(
    ticket.payload.email,
    ticket.payload.name,
  );

  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expire: session.refreshTokenValidUntil,
  });

  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expire: session.refreshTokenValidUntil,
  });

  res.json({
    status: 200,
    message: 'Login via OAuth successfully',
    data: {
      accessToken: session.accessToken,
    },
  });
}
