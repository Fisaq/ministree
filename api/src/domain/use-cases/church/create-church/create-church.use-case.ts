import { RoleFactory } from "../../../../application/factories/role-factory";
import { Church } from "../../../entities/church";
import { EUserStatus, User } from "../../../entities/user";
import { IChurchRepository } from "../../../repositories/church.repository";
import { IUserRepository } from "../../../repositories/user-repository";
import { Password } from "../../../value-objects/password";

export class CreateChurchUseCase {
    constructor(
        private readonly _churchRepo: IChurchRepository,
        private readonly _userRepo: IUserRepository
    ) { }

    public async execute(currentUser: User, churchName: string) {

        if (!currentUser) {
            throw new Error('Could not create a church without a current user.')
        }

        const newChurch = Church.create(churchName);
        const userRole = RoleFactory.createAdminRole();

        const userUpdated = User.restore({
            id: currentUser.id,
            name: currentUser.name,
            email: currentUser.email.value,
            password: Password.fromHash(currentUser.password),
            churchId: newChurch.id,
            roleId: userRole.id,
            status: currentUser.status as EUserStatus,
            createdAt: currentUser.createdAt,
        });

        await this._userRepo.update(userUpdated);


        return await this._churchRepo.save(newChurch);
    }
}