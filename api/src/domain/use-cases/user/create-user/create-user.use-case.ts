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

        const user = User.create({
            name: data.name,
            email: data.email,
            password: passwordHashed,
            role: role
        });

        await this._userRepo.save(user);
    }
}