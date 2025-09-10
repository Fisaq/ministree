import { Router } from "express";
import { UserController } from "../controllers/user-controller";
import { authMiddleware } from "../../middlewares/auth.middleware";

export function userRoutes(userController: UserController) {
    const router = Router();

    router.post('/register', userController.register.bind(userController));
    router.post('/createUser', authMiddleware, userController.createUser.bind(userController));
    router.put('/update/:id', userController.update.bind(userController));
    router.get('/verify-email', userController.verifyEmail.bind(userController));
    router.post('/login', userController.authenticate.bind(userController));

    return router;
}