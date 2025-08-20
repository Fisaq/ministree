import express from "express";
import userRoutes from "./interfaces/routes/user.routes";

const app = express();

const PORT = process.env.API_PORT;

app.use(express.json());

app.use('/users', userRoutes);

app.listen(PORT, () => console.info(`Server running on port ${PORT}.`));