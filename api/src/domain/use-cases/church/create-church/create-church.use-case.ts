import { Church } from "../../../entities/church";
import { IChurchRepository } from "../../../repositories/church.repository";

export class CreateChurchUseCase {
    constructor(private readonly _churchRepo: IChurchRepository) { }

    public async execute(churchName: string) {
        const newChurch = Church.create(churchName);
        return await this._churchRepo.save(newChurch);
    }
}