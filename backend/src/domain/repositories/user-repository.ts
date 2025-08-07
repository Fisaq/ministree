import { User } from "../entities/user";

export interface IUserRepository {
    save(user: User): Promise<void>;
    findById(id: string): Promise<User | null>;
    count(): Promise<number>;
}