import { EUserRoles, EUserStatus, User } from "../../../entities/user";
import { IUserRepository } from "../../../repositories/user-repository";
import { ICreateUserInputDTO } from "./create-user.dto";
import { IEmailService } from "../../../services/email-service";
import { ITokenGenerator } from "../../../services/token-generator";
import { IEncryption } from "../../../services/encryption";
import { IIdGenerator } from "../../../services/id-generator";

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
        const passwordHashed = await this._encryption.hash(data.password);
        const userId = this._uuidGenerator;

        const user = User.create({
            name: data.name,
            email: data.email,
            password: passwordHashed,
            role: role,
            status: status
        }, userId);

        const token = this._token.generate(user.id, user.email.value);

        await this._emailService.sendVerificationEmail(user.email.value, token);
        await this._userRepo.save(user);
    }
}