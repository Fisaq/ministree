import express from "express";
import { bootstrap } from "./config/bootstrap";
import { UserController } from "./interfaces/controllers/user-controller";
import { userRoutes } from "./interfaces/routes/user.routes";
import { ChurchController } from "./interfaces/controllers/church-controller";
import { churchRoutes } from "./interfaces/routes/church.routes";

async function startServer() {
    const app = express();
    const PORT = process.env.API_PORT;

    app.use(express.json());

    const {
        createUserUseCase,
        updateUserUseCase,
        verifyEmailUseCase,
        authenticateUserUseCase,
        createChurchUseCase
    } = await bootstrap();

    const userController = new UserController(
        createUserUseCase,
        updateUserUseCase,
        verifyEmailUseCase,
        authenticateUserUseCase
    );

    const churchController = new ChurchController(createChurchUseCase);

    app.use('/users', userRoutes(userController));
    app.use('/church', churchRoutes(churchController))

    app.listen(PORT, () => console.info(`Server running on  http://localhost:${PORT}.`));
}

startServer();