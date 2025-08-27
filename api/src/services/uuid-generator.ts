import { randomUUID } from "crypto";
import { IIdGenerator } from "../domain/services/id-generator";

export class UUIDGenerator implements IIdGenerator {
    public generate(): string {
        return randomUUID();
    }
}