import { randomUUID } from "crypto";
import { IIdGenerator } from "../domain/services/id-generator";

export class IdGenerator implements IIdGenerator {
    public generateUUID(): string {
        return randomUUID();
    }
}