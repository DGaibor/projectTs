import { OrderService } from './order.service';
import type { Request, Response } from 'express';

export class OrderController{
    
    service: OrderService
    constructor() {
        this.service = new OrderService();
    }

    async create(req: Request , res: Response){
        try{
            const body = req.body;

            const order ={
                description: body.description,
                userId: body.user.id,
                products: body.products,
            }

            await this.service.create(order)
            
            return res.status(201).json({
                message: 'Order created successfully'
            })
        }catch (e) {
            console.log(e)
            res.status(500).send({error: e});
        }
        
    }
    
}
