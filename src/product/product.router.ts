import { Router } from 'express';
import { ProductController } from './product.controller';

export const productRouter = Router();
const controller = new ProductController();

productRouter.post('/', (req, res) => controller.post(req,res));



