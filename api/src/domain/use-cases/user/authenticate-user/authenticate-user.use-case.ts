import { IUserRepository } from "../../../repositories/user-repository";
import { IEncryption } from "../../../services/encryption";
import { ITokenGenerator } from "../../../services/token-generator";
import { IAuthenticateUserInputDTO } from "./authenticate-user.dto";

export class AuthenticateUserUseCase {
    constructor(
        private _userRepo: IUserRepository,
        private _encrypter: IEncryption,
        private _tokenGenerator: ITokenGenerator
    ) { }

    public async execute(data: IAuthenticateUserInputDTO) {
        const user = await this._userRepo.findByEmail(data.email);

        if (!user) throw new Error('Invalid credentials. Incorret email!');

        const matchPassword = await this._encrypter.compare(data.password, user.password);

        if (!matchPassword) throw new Error('Invalid credentials. Incoret password.');

        const token = this._tokenGenerator.generate(user.id, user.email.value);

        return { token };
    }
}