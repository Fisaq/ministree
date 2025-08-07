import { Request, Response } from "express";
import { CreateUserUseCase } from "../../domain/use-cases/user/create-user/create-user.use-case";
import { UserRepositoryPrisma } from "../../infra/repositories/prisma.user-repository";

export class UserController {
    public async register(req: Request, res: Response): Promise<Response> {
        try {
            const { name, email, password } = req.body;

            const userRepo = new UserRepositoryPrisma();
            const createUser = new CreateUserUseCase(userRepo);

            await createUser.execute({ name, email, password });

            return res.status(200).json({ message: 'User created successfuly!' })
        } catch (error: any) {
            return res.status(400).json({ error: error.message })
        }
    }
}