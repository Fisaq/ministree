import { randomUUID } from "crypto";
import { IIdGenerator } from "../../domain/interfaces/id-generator";

export class UUIDGenerator implements IIdGenerator {
    generate(): string {
        return randomUUID();
    }
}