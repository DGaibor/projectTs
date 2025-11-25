import { Router } from 'express';
import { UserController } from './user.controller';

export const userRouter = Router();
const controller = new UserController();

userRouter.post('/', (req, res) => controller.create(req,res));
userRouter.post('/login', (req, res) => controller.login(req,res))



