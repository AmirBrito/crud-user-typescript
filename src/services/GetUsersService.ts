import { getRepository } from "typeorm";
import { User } from "../entities/User";



export class GetUsersService {
    async execute() {

        const repo = getRepository(User);

        const users = await repo.find();

        return users;
    }
}