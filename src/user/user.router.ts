import { Router } from 'express';
import { UserController } from './user.controller';

export const userRouter = Router();
const controller = new UserController();

userRouter.post('/', (req, res) => controller.post(req,res));



