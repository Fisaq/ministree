import { Router } from "express";
import { UserController } from "../controllers/user-controller";

const userRoutes = Router();
const userController = new UserController();

userRoutes.post('/register', userController.register.bind(userController));
userRoutes.put('/update/:id', userController.update.bind(userController));

export default userRoutes;