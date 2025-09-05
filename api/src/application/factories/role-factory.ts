import { Role, ERoleId, ERoleName, EAccessType } from "../../domain/entities/role"

export class RoleFactory {
    public static createAdminRole(): Role {
        return {
            id: ERoleId.ADMIN,
            name: ERoleName.ADMIN,
            accessType: EAccessType.FULL_ACCESS
        } as Role
    }

    public static createMinisterRole(): Role {
        return {
            id: ERoleId.MINISTER,
            name: ERoleName.MINISTER,
            accessType: EAccessType.READING_AND_EDITING
        } as Role
    }

    public static createVoluntaryRole(): Role {
        return {
            id: ERoleId.VOLUNTARY,
            name: ERoleName.VOLUNTARY,
            accessType: EAccessType.JUST_READING
        } as Role
    }
}