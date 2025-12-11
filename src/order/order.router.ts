import { type Request, type Response, Router } from 'express';
import { OrderController } from './order.controller';
import { privateRoute } from '../middleware/auth';

export const orderRouter = Router();

const controller = new OrderController()
orderRouter.post('/', ,  (req: Request, res: Response) => controller.create(req, res));
