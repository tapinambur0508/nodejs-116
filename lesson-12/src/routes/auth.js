import express from 'express';

import {
  registerUserController,
  loginUserController,
  logoutUserController,
  refreshSessionController,
  requestPasswordResetController,
  resetPasswordController,
} from '../controllers/auth.js';

import { validateBody } from '../middlewares/validateBody.js';

import {
  registerSchema,
  loginSchema,
  requestPasswordResetSchema,
  resetPasswordSchema,
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

export default router;
