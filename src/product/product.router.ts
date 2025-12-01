import { Router } from 'express';
import { ProductController } from './product.controller';
import { privateRoute, timeLog } from '../middleware/auth';
import type{ Request, Response } from 'express';


export const productRouter = Router();
const controller = new ProductController();

productRouter.post('/', privateRoute, (req: Request, res: Response) => controller.post(req,res));



