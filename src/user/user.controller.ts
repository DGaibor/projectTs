
import type{ Request, Response } from 'express';
import { UserService } from './user.service';

export class UserController {

    service: UserService;

    constructor() {
        this.service = new UserService();
    }

    async create(req: Request , res: Response) {

        try{

            const body = req.body;
            const name = body.name;
            const email = body.email;
            const password = body.password;


            const message = await this.service.create(name, email, password)

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
    
    async login(req: Request , res: Response){
        try{
            const body = req.body;

            const email = body.email;
            const password = body.password;

            const message = await this.service.login(email,password)
            
            return res.status(200).json({
                message: message
            })
        }catch (e) {
            res.status(500).json({
                message: 'Internal Server Error'
            })
        }
       
    }

}
