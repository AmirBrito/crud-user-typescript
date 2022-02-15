import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';

export function AuthMiddleware( request: Request, response: Response, next: NextFunction){

    const { authorization } = request.headers;

    if(!authorization){
        return response.sendStatus(401);
    }

    const token = authorization.replace('Bearer', '').trim();


    try {

        const data = jwt.verify(token, 'secret');

    } catch {
        
        return response.sendStatus(401);
    }
}