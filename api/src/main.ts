import express from "express";
import { bootstrap } from "./config/bootstrap";
import { UserController } from "./interfaces/controllers/user-controller";
import { userRoutes } from "./interfaces/routes/user.routes";

async function startServer() {
    const app = express();
    const PORT = process.env.API_PORT;

    app.use(express.json());

    const {
        createUserUseCase,
        updateUserUseCase,
        verifyEmailUseCase
    } = await bootstrap();

    const userController = new UserController(
        createUserUseCase,
        updateUserUseCase,
        verifyEmailUseCase
    );

    app.use('/users', userRoutes(userController));

    app.listen(PORT, () => console.info(`Server running on  http://localhost:${PORT}.`));
}

startServer();


