import { randomUUID } from "crypto";
import { EUserRoles, User } from "../../../entities/user";
import { IUserRepository } from "../../../repositories/user-repository";
import { ICreateUserInputDTO } from "./create-user.dto";
import { BcryptAdapter } from "../../../../infra/security/bcrypt-adapter";

export class CreateUserUseCase {
    constructor(private readonly _userRepo: IUserRepository) { }

    public async execute(data: ICreateUserInputDTO) {
        const userExisting = await this._userRepo.count();

        const role = userExisting == 0 ? EUserRoles.ADMIN : EUserRoles.VOLUNTARY;

        const encryption = new BcryptAdapter();
        const passwordHashed = await encryption.hash(data.password);

        const user = new User(
            data.name,
            data.email,
            passwordHashed,
            randomUUID(),
            role,
        );

        await this._userRepo.save(user);
    }
}