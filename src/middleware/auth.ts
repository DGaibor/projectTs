import type{ Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from "jsonwebtoken";
import { UserService } from '../user/user.service';
interface MyJwtPayload extends JwtPayload {
    email: string;
    name: string;
}



export const timeLog = ( req:Request,res: Response, next:NextFunction )=>{
    console.log('Middleware timeLog', Date.now());

    next();
}


export const privateRoute = async ( req:Request,res: Response, next:NextFunction )=>{
    const token  = req.headers.authorization;
    if(!token){
        return res.status(401).json({
            message: 'Unauthorized'
        });
    }
    
    const realToken: string = token?.replace('Bearer ', '') ?? '';
    const secretKey:string = process.env.SECRET_KEY ?? '';
    
    try{
        const decode =  jwt.verify(realToken,secretKey) as MyJwtPayload;
        const userService = new UserService();
        const user = await userService.getUserByEmail(decode.email)
        
        if(user == null){
           return res.status(401).json({
                message: 'Unauthorized'
            });
        }

        req.body.user = user;
    }catch (e) {
        return res.status(401).json({
            message: 'Unauthorized'
        })
    }

    next();
}
