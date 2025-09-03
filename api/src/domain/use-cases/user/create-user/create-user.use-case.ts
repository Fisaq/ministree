import { EUserRoles, EUserStatus, User } from "../../../entities/user";
import { IUserRepository } from "../../../repositories/user-repository";
import { ICreateUserInputDTO } from "./create-user.dto";
import { IEmailService } from "../../../services/email-service";
import { ITokenGenerator } from "../../../services/token-generator";
import { IEncryption } from "../../../services/encryption";
import { IIdGenerator } from "../../../services/id-generator";
import { Password } from "../../../value-objects/password";

export class CreateUserUseCase {
    constructor(
        private readonly _userRepo: IUserRepository,
        private readonly _token: ITokenGenerator,
        private readonly _emailService: IEmailService,
        private readonly _encryption: IEncryption,
        private readonly _uuidGenerator: IIdGenerator
    ) { }

    public async execute(data: ICreateUserInputDTO) {
        const userExisting = await this._userRepo.count();
        const role = userExisting == 0 ? EUserRoles.ADMIN : EUserRoles.VOLUNTARY;
        const status = EUserStatus.PENDING;
        const userId = this._uuidGenerator;
        const newPassword = new Password(data.password)

        const user = User.create({
            name: data.name,
            email: data.email,
            password: newPassword,
            role: role,
            status: status
        }, userId);

        const hashedPassword = await this._encryption.hash(newPassword.value);
        user.changePassword(hashedPassword);

        const token = this._token.generate(user.id, user.email.value);

        await this._emailService.sendVerificationEmail(user.email.value, token);
        await this._userRepo.save(user);

        return user;
    }
}