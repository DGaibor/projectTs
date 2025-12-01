import type{ Request, Response, NextFunction } from 'express';

export const timeLog = ( req:Request,res: Response, next:NextFunction )=>{
    console.log('Middleware timeLog', Date.now());
    next();
}

export const privateRoute = ( req:Request,res: Response, next:NextFunction )=>{
    const token = req.headers.authorization;
    console.log(token);
    next();
}
