import { BcryptAdapter } from "../../../../services/bcrypt-adapter";
import { IUserRepository } from "../../../repositories/user-repository";
import { Password } from "../../../value-objects/password";
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

            const newPassword = new Password(data.password);
            const newPasswordHashed = await encryption.hash(newPassword.value);

            user.changePassword(newPasswordHashed);
        }

        return await this._userRepo.update(user);
    }
}
