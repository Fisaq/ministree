import { EUserStatus, User } from "../../../entities/user";
import { IUserRepository } from "../../../repositories/user-repository";
import { ICreateUserInputDTO } from "./create-user.dto";
import { IEmailService } from "../../../services/email-service";
import { ITokenGenerator } from "../../../services/token-generator";
import { IEncryption } from "../../../services/encryption";
import { IIdGenerator } from "../../../services/id-generator";
import { Password } from "../../../value-objects/password";
import { ERoleId, Role } from "../../../entities/role";
import { RoleFactory } from "../../../../application/factories/role-factory";

export class CreateUserUseCase {
    constructor(
        private readonly _userRepo: IUserRepository,
        private readonly _token: ITokenGenerator,
        private readonly _emailService: IEmailService,
        private readonly _encryption: IEncryption,
        private readonly _uuidGenerator: IIdGenerator,
    ) { }

    public async execute(currentUser: User, data: ICreateUserInputDTO, churchId?: number) {
        let role: Role;

        if (!currentUser) {
            if (!churchId) {
                throw new Error("Is necessary create a new Church before create a new User.");
            }
            role = RoleFactory.createAdminRole();
        }

        else {
            churchId = currentUser.churchId;

            if (currentUser.roleId === ERoleId.ADMIN) {
                role = RoleFactory.createMinisterRole();
            }
            else if (currentUser.roleId === ERoleId.MINISTER) {
                role = RoleFactory.createVoluntaryRole();
            }
            else {
                throw new Error('Voluntary not have permission to create a user.');
            }
        }

        const status = EUserStatus.PENDING;
        const userId = this._uuidGenerator;
        const newPassword = new Password(data.password);

        const user = User.create({
            churchId: churchId,
            name: data.name,
            email: data.email,
            password: newPassword,
            roleId: role.id,
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