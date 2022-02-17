import { Router } from "express";
import { AuthController } from "./controllers/AuthController";
import { CreateUserController } from "./controllers/CreateUserController";
import { DeleteUserController } from "./controllers/DeleteUserController";
import { GetUsersController } from "./controllers/GetUsersController";
import { UpdateUserController } from "./controllers/UpdateUserController";

import { AuthMiddleware } from "./middlewares/AuthMiddleware";
import { ValidateDataMiddleware } from "./middlewares/ValidateDataMiddleware";

const routes = Router();

routes.post("/users", AuthMiddleware, ValidateDataMiddleware, new CreateUserController().handle);
routes.get("/users", AuthMiddleware, new GetUsersController().handle);
routes.delete("/users/:id", AuthMiddleware, new DeleteUserController().handle);
routes.put("/users/:id", AuthMiddleware, ValidateDataMiddleware, new UpdateUserController().handle);

routes.post("/auth", new AuthController().handle);


export { routes };