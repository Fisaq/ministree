import { EUserRoles, User } from "../../domain/entities/user";
import { IUserRepository } from "../../domain/repositories/user-repository";
import { prisma } from "../database/prisma-client";

export class UserRepositoryPrisma implements IUserRepository {
    public async save(user: User): Promise<void> {
        await prisma.appUser.create({
            data: {
                id: user.id,
                name: user.name,
                email: user.email.value,
                password: user.password.value,
                role: user.role,
                createdAt: user.createdAt,
            }
        });
    }

    public async count(): Promise<number> {
        return await prisma.appUser.count();
    }

    public async findById(id: string): Promise<User | null> {
        const data = await prisma.appUser.findUnique({ where: { id } })
        if (!data) return null;

        return new User(
            data.name,
            data.email,
            data.password,
            data.id,
            data.role as EUserRoles,
            data.createdAt
        )
    }
}