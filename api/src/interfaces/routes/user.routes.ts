import { Router } from "express";
import { UserController } from "../controllers/user-controller";

export function userRoutes(userController: UserController) {
    const router = Router();

    router.post('/register', userController.register.bind(userController));
    router.put('/update/:id', userController.update.bind(userController));
    router.get('/verify-email', userController.verifyEmail.bind(userController));

    return router;
}