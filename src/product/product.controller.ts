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
    
    async get(req: Request , res: Response){
        try{
            const products = await this.service.getAll();
            return res.status(200).json({
                data: products
            });
        }catch (e) {
            console.log(e)
            return res.status(500).json({
                message: 'Error getting products'
            });
        }
    }
    
    async update(req: Request , res: Response){
        try{
            const id = parseInt(req?.params?.id ?? '0');
            if (!id){
                return res.status(400).json({
                    message: 'Invalid product ID'
                });
            }
            const body = req.body;
            delete body.user
            const message = await this.service.update(id,body);
            
            return res.status(200).json({
                message: message
            });
        }catch (e) {
            console.log(e)
            return res.status(500).json({
                message: 'Error updating product'
            });
        }
    }
    
}
