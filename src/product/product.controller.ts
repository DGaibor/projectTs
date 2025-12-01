import { ProductService} from './product.service';
import type{ Request, Response } from 'express';

export class ProductController {
    
    service: ProductService;
    
    constructor() {
        this.service = new ProductService();
    }

    async post(req: Request , res: Response) {
        
       try{
           
           const body = req.body;
           const name = body.name;
           const description = body.description;
           const price = body.price;
           
           const message = await this.service.create(name, description, price)
           
           return res.status(201).json({
               message: message
           });
       } catch (e) {
           console.log(e)
              return res.status(500).json({
                message: 'Internal Server Error'
              });
       }
       
       
    }
    
}
