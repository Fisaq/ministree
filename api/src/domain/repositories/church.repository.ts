import { Church } from "../entities/church";

export interface IChurchRepository {
    save(church: Church): Promise<void>;
    update(church: Church): Promise<Church>
}