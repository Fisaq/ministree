import { BcryptAdapter } from "../../../../infra/interfaces/bcrypt-adapter";
import { IUserRepository } from "../../../repositories/user-repository";
import { IUpdateUserInput } from "./update-user.dto";

export class UpdateUserUseCase {
    constructor(private readonly _userRepo: IUserRepository) { }

    public async execute(data: IUpdateUserInput) {
        const user = await this._userRepo.findById(data.id);

        if (!user) throw new Error('This Id not refer any user.');

        if (data.name !== undefined) user.changeName(data.name);

        if (data.email !== undefined) user.changeEmail(data.email);

        if (data.password !== undefined) {
            const encryption = new BcryptAdapter();
            const newPassword = await encryption.hash(data.password);
            user.changePassword(newPassword)
        }

        return await this._userRepo.update(user);
    }
}
