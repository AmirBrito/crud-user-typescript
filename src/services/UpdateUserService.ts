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
    
        try {
            try {
                const user = await repo.findOne({id});

                user.name = name ? name : user.name;
                user.email = email ? email : user.email;
                user.password = password ? password : user.password;

                await repo.save(user);

                return user;

            } catch (error) {
                return {
                    status: 400,
                    message: error.driverError ?? "ID not find",
                    content: null,
                }

            } 
        } catch (error) {
            return {
                status: 500,
                message: error.driverError ?? "Internal server error",
                content: null,
            }
        }
    }
}