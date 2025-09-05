import { IChurchRepository } from "../../domain/repositories/church.repository";
import { Church } from "../../domain/entities/church";
import { prisma } from "../database/prisma-client";

export class ChurchRepositoryPrisma implements IChurchRepository {
    public async save(church: Church): Promise<void> {
        await prisma.appChurch.create({
            data: {
                id: church.id,
                name: church.name,
            }
        });
    }

    public async update(church: Church): Promise<Church> {
        const churchUpdated = await prisma.appChurch.update({
            where: { id: church.id },
            data: {
                name: church.name,
            }
        });

        return Church.restore({
            churchId: churchUpdated.id,
            name: churchUpdated.name
        })
    }
}