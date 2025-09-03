import { EUserStatus } from "../../../entities/user";
import { IUserRepository } from "../../../repositories/user-repository";
import { ITokenGenerator } from "../../../services/token-generator";

export class VerifyUserEmailUseCase {
    constructor(private readonly _userRepo: IUserRepository, private _token: ITokenGenerator) { }

    public async execute(token: string) {
        try {
            const payload = this._token.verify(token);
            const user = await this._userRepo.findById(payload.userId);

            if (!user) throw new Error('User not found!');
            if (user.status === EUserStatus.ACTIVE) return user;

            user.activate();
            const updatedUser = await this._userRepo.update(user);
            return updatedUser;
        } catch (error) {
            throw new Error('Verification failed. Invalid token or expired.');
        }
    }
}