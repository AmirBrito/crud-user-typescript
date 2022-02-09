import { getRepository } from "typeorm"
import { User } from "../entities/User";



type UserUpdateRequest = {
    id: string;
    name: string;
    email: string;
    password: string;
}


export class UpdateUserService {
    async execute({ id, name, email, password }: UserUpdateRequest) {

        const repo = getRepository(User);

        const user = await repo.findOne(id);
        
        if(!await repo.findOne(id)){
            return new Error("Id not find!");
        }

        if(await repo.findOne({email})){
            return new Error("Email already registred");
        }
        
        user.name = name ? name : user.name;
        user.email = email ? email : user.email;
        user.password = password ? password : user.password;

        await repo.save(user);

        return user;
    }
}