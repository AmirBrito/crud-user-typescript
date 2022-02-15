import { Request, Response } from "express";
import { getRepository, Repository } from "typeorm";
import { User } from "../entities/User";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export class AuthService {

    async authenticate(request: Request, response: Response){
        try{
            const repo = getRepository(User);
            const { email,  password } = request.body;

            const user = await repo.findOne({ email });

            const isValidPassword = await bcrypt.compare(password, user.password);

            if(!isValidPassword){
                return {
                    status: 401,
                    message: "Password wrong",
                    content: null,
                }
            }

            const token = jwt.sign({ id: user.id }, 'secret', { expiresIn: '1d' });

            delete user.password;
            
            return response.json({
                user,
                token,
            });

        } catch (error) {
            return {
                status: 400,
                message: error.driverError ?? "ID not find",
                content: null,
            }
        }
    }
}