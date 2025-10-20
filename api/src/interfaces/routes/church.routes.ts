import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { ChurchController } from "../controllers/church-controller";

export function churchRoutes(churchController: ChurchController) {
    const router = Router();

    router.post('/createChurch', authMiddleware, churchController.createChurch.bind(churchController));

    return router;
}