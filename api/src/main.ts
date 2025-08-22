import express from "express";
import { bootstrap } from "./config/bootstrap";
import { UserController } from "./interfaces/controllers/user-controller";

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

    app.post("/users/register", (req, res) => userController.register(req, res));
    app.put("/users/:id", (req, res) => userController.update(req, res));
    app.get("/users/verify-email", (req, res) => userController.verifyEmail(req, res));

    app.listen(PORT, () => console.info(`Server running on  http://localhost:${PORT}.`));
}

startServer();


