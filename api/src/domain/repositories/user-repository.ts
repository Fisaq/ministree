import { User } from "../entities/user";

export interface IUserRepository {
    save(user: User): Promise<void>;
    update(user: User): Promise<User>;
    findById(id: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    count(): Promise<number>;
}