import { Request, Response } from "express";
import { CreateUserUseCase } from "../../domain/use-cases/user/create-user/create-user.use-case";
import { UserRepositoryPrisma } from "../../infra/repositories/prisma.user-repository";
import { UpdateUserUseCase } from "../../domain/use-cases/user/update-user/update-user.use-case";

export class UserController {
    public async register(req: Request, res: Response): Promise<Response> {
        try {
            const { name, email, password } = req.body;

            const userRepo = new UserRepositoryPrisma();
            const createUser = new CreateUserUseCase(userRepo);

            await createUser.execute({ name, email, password });

            return res.status(200).json({ message: 'User created successfuly!' })
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    }

    public async update(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const { name, email, password } = req.body;

            const userRepo = new UserRepositoryPrisma();
            const updateUser = new UpdateUserUseCase(userRepo);

            await updateUser.execute({ id, name, email, password });

            return res.status(200).json({ message: `User with id: [${id}] updated successfuly!` });
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    }
}