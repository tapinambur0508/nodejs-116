import express from 'express';

import {
  registerUserController,
  loginUserController,
} from '../controllers/auth.js';

import { validateBody } from '../middlewares/validateBody.js';

import { registerSchema, loginSchema } from '../validation/auth.js';

const router = express.Router();

router.post('/register', validateBody(registerSchema), registerUserController);

router.post('/login', validateBody(loginSchema), loginUserController);

export default router;
