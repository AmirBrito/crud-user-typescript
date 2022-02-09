import { getRepository } from "typeorm";
import { User } from "../entities/User";


type UserRequest = {
    name: string;
    email: string;
    password: string;
}

export class CreateUserService {
    
    async execute({ name, email, password }: UserRequest): Promise<User | Error>{

        const repo = getRepository(User);

        if(await repo.findOne({email})){
            return new Error("Email already registred");
        }
        
        const user = repo.create({
            name,
            email,
            password,
        });

        await repo.save(user);

        return user;
    }
}
