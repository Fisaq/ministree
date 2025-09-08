import { EUserStatus, User } from "../../domain/entities/user";
import { IUserRepository } from "../../domain/repositories/user-repository";
import { Password } from "../../domain/value-objects/password";
import { prisma } from "../database/prisma-client";

export class UserRepositoryPrisma implements IUserRepository {
    public async save(user: User): Promise<void> {
        await prisma.appUser.create({
            data: {
                id: user.id,
                name: user.name,
                email: user.email.value,
                password: user.password,
                role: user.roleId,
                churchId: user.churchId
            }
        });
    }

    public async update(user: User): Promise<User> {
        const userUpdated = await prisma.appUser.update({
            where: { id: user.id },
            data: {
                name: user.name,
                email: user.email.value,
                password: user.password,
                status: user.status
            }
        });

        const newPassword = Password.fromHash(userUpdated.password);

        return User.restore({
            id: userUpdated.id,
            churchId: userUpdated.churchId,
            name: userUpdated.name,
            email: userUpdated.email,
            password: newPassword,
            roleId: userUpdated.role,
            status: userUpdated.status as EUserStatus,
            createdAt: userUpdated.createdAt
        });
    }

    public async count(): Promise<number> {
        return await prisma.appUser.count();
    }

    public async findById(id: string): Promise<User | null> {
        const data = await prisma.appUser.findUnique({ where: { id } });
        if (!data) return null;

        const newPassword = Password.fromHash(data.password);

        return new User(
            data.churchId,
            data.name,
            data.email,
            newPassword,
            data.role,
            undefined,
            data.id,
            data.status as EUserStatus,
            data.createdAt
        );
    }

    public async findByEmail(email: string): Promise<User | null> {
        const data = await prisma.appUser.findUnique({ where: { email } });
        if (!data) return null;

        const newPassword = Password.fromHash(data.password);

        return new User(
            data.churchId,
            data.name,
            data.email,
            newPassword,
            data.role,
            undefined,
            data.id,
            data.status as EUserStatus,
            data.createdAt
        );
    }
}