export enum ERoleId {
    ADMIN = 1001,
    MINISTER = 2001,
    VOLUNTARY = 3001
}

export enum ERoleName {
    ADMIN = 'A',
    MINISTER = 'M',
    VOLUNTARY = 'V'
}

export enum EAccessType {
    FULL_ACCESS = 'FL',
    READING_AND_EDITING = 'RE',
    JUST_READING = 'JR'
}

export class Role {
    private _roleId: number;
    private _name: string;
    private _accessType: string;

    constructor(roleId: ERoleId, name: ERoleName, accessType: EAccessType) {
        this._roleId = roleId;
        this._name = name;
        this._accessType = accessType;
    }

    get id() {
        return this._roleId;
    }

    get name() {
        return this._name;
    }

    get accessType() {
        return this._accessType;
    }
}