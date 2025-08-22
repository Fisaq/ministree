import { Church } from "../entities/church";

export interface IChurchRepository {
    save(church: Church): Promise<Church>;
    update(id: string): Promise<Church>
}