import { NextFunction, Request, Response } from "express";
import { EUserStatus, User } from "../domain/entities/user";
import { JWTAdapter } from "../services/jwt-adapter";
import { prisma } from "../infra/database/prisma-client";
import { Password } from "../domain/value-objects/password";
import { IdGenerator } from "../services/id-generator";

export interface AuthenticatedRequest extends Request {
    currentUser?: User;
}

export const authMiddleware = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const jwt = new JWTAdapter();

    const authHeader = req.headers["authorization"];

    if (!authHeader) {
        return res.status(401).json({ error: 'The token JWT is missing' });
    }

    const [, token] = authHeader.split(" ");

    try {
        const payload = jwt.verify(token) as { userId: string; };

        const dbUser = await prisma.appUser.findUnique({ where: { id: payload.userId } });

        if (!dbUser) {
            return res.status(404).json({ error: 'User not found!' });
        }

        const idGenerator = new IdGenerator();

        const currentUser = User.create({
            churchId: dbUser.churchId,
            name: dbUser.name,
            email: dbUser.email,
            password: new Password(dbUser.password),
            roleId: dbUser.role,
            status: dbUser.status as EUserStatus,
        }, idGenerator);

        req.currentUser = currentUser;

        next();
    } catch (error) {
        return res.status(401).json('Invalid token.');
    }
}