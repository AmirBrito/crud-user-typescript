import { Router } from "express";
import { CreateUserController } from "./controllers/CreateUserController";
import { DeleteUserController } from "./controllers/DeleteUserController";
import { GetUsersController } from "./controllers/GetUsersController";
import { UpdateUserController } from "./controllers/UpdateUserController";


const routes = Router();

routes.post("/users", new CreateUserController().handle);
routes.get("/users", new GetUsersController().handle);
routes.delete("/users/:id", new DeleteUserController().handle);
routes.put("/users/:id", new UpdateUserController().handle);


export { routes };