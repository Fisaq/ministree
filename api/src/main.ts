import express from "express";
import { bootstrap } from "./config/bootstrap";
import { UserController } from "./interfaces/controllers/user-controller";
import { userRoutes } from "./interfaces/routes/user.routes";
import { ChurchController } from "./interfaces/controllers/church-controller";
import { churchRoutes } from "./interfaces/routes/church.routes";

async function startServer() {
    const app = express();
    const PORT = process.env.API_PORT;

    app.use((req, res, next) => {
        next();
    });

    // CORS Headers
    app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        res.setHeader('Access-Control-Allow-Credentials', 'true');
        next();
    });

    app.use((req, res, next) => {
        if (req.method === 'OPTIONS') return res.status(204).end();
        next();
    });

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

    console.log('🛣️ Registrando rotas...');
    app.use('/users', userRoutes(userController));
    app.use('/church', churchRoutes(churchController));

    app.listen(PORT, () => console.info(`✅ Server running on http://localhost:${PORT}.`));
}

startServer();