import { Request, Response } from "express";
import { AuthService } from "../services/AuthService";


export class AuthController {

    async handle(request: Request, response: Response){

        const service = new AuthService();
        const result = await service.authenticate(request, response);

        if (result instanceof Error ){
            return response.status(400).json(result.message);
        }

        return response.json(result);
    }
}