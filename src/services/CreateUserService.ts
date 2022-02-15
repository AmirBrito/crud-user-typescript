import { getRepository } from "typeorm";
import { User } from "../entities/User";
import { UserRequest } from "../dto/UserRequest";



export class CreateUserService {
    
    async execute({ name, email, password }: UserRequest): Promise<{}>{

        const repo = getRepository(User);
        try {
            try {
                await repo.findOne({email});

            } catch (error) {
                return {
                    status: 400,
                    message: error.driverError ?? "Email already registred",
                    content: null
                }
            }
                
            const user = repo.create({
                name,
                email,
                password,
            });

            await repo.save(user);

            return {
                status: 200,
                message: "User successfully created",
                content: user
            }     
            

        } catch (error) {
            return {
                status: 500,
                message: error.driverError ?? "Internal server error",
                content: null
            }
        }
    }
}
