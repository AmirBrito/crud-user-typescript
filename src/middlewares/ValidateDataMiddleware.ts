import { validate } from "class-validator";
import { Request, Response, NextFunction } from "express";
import { User } from "../entities/User";


export async function ValidateDataMiddleware(request: Request, response: Response, next: NextFunction) {
    
        const { name, email, password } = request.body;
        let user = new User;
        user.name = name;
        user.email = email;
        user.password = password;
        
        const errors = await validate(user);

        if(errors.length > 0){
            return response.status(400).json({
                error:"name, email or password invalid!"
            })
        }

        return next();

}
