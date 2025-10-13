import express from 'express';

import {
  registerUserController,
  loginUserController,
  logoutUserController,
  refreshSessionController,
  requestPasswordResetController,
  resetPasswordController,
  getOAuthURLController,
  confirmOAuthController,
} from '../controllers/auth.js';

import { validateBody } from '../middlewares/validateBody.js';

import {
  registerSchema,
  loginSchema,
  requestPasswordResetSchema,
  resetPasswordSchema,
  confirmOAuthSchema,
} from '../validation/auth.js';

const router = express.Router();

router.post('/register', validateBody(registerSchema), registerUserController);

router.post('/login', validateBody(loginSchema), loginUserController);

router.post('/logout', logoutUserController);

router.post('/refresh', refreshSessionController);

router.post(
  '/request-password-reset',
  validateBody(requestPasswordResetSchema),
  requestPasswordResetController,
);

router.post(
  '/reset-password',
  validateBody(resetPasswordSchema),
  resetPasswordController,
);

router.get('/get-oauth-url', getOAuthURLController);

router.post(
  '/confirm-oauth',
  validateBody(confirmOAuthSchema),
  confirmOAuthController,
);

export default router;
