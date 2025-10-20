import { IIdGenerator } from "../services/id-generator";
import { Email } from "../value-objects/email";
import { Password } from "../value-objects/password";

export enum EUserStatus {
    ACTIVE = 'A',
    PENDING = 'P'
}

export class User {
    private readonly _id: string;
    private _churchId: number | undefined;
    private _email: Email;
    private _password: string;
    private _name: string;
    private _roleId: number;
    private _status: string;
    private _createdAt: Date;

    constructor(
        name: string,
        email: string,
        password: Password,
        roleId: number,
        churchId?: number | undefined,
        idGenerator?: IIdGenerator,
        id?: string,
        status?: EUserStatus,
        createdAt?: Date
    ) {
        this._churchId = churchId ?? undefined;
        this._email = new Email(email);
        this._name = name;
        this._password = password.value;
        this._id = id ?? idGenerator?.generateUUID() ?? '';
        this._roleId = roleId;
        this._status = status ?? EUserStatus.PENDING;
        this._createdAt = createdAt ?? new Date();
    }


    get id() {
        return this._id
    }

    get name() {
        return this._name
    }

    get email() {
        return this._email
    }

    get roleId() {
        return this._roleId
    }

    get password() {
        return this._password
    }

    get status() {
        return this._status;
    }

    get createdAt() {
        return this._createdAt
    }

    get churchId() {
        return this._churchId
    }

    public activate() {
        this._status = EUserStatus.ACTIVE;
    }

    public changeName(value: string) {
        this._name = value;
    }

    public changePassword(hashedPassword: string) {
        this._password = hashedPassword;
    }

    public changeEmail(value: string) {
        this._email = new Email(value);
    }

    public changeChurchId(value: number) {
        this._churchId = value;
    }

    public changeRoleId(value: number) {
        this._roleId = value;
    }

    public static create(props: {
        name: string,
        email: string,
        password: Password,
        roleId: number,
        churchId: number | undefined,
        status: EUserStatus
    }, idGenerator: IIdGenerator): User {
        return new User(
            props.name,
            props.email,
            props.password,
            props.roleId,
            props.churchId,
            idGenerator,
            undefined,
            props.status
        );
    }

    public static restore(props: {
        id: string,
        name: string,
        email: string,
        password: Password,
        roleId: number,
        churchId: number | undefined,
        status: EUserStatus,
        createdAt: Date,
    }): User {
        return new User(
            props.name,
            props.email,
            props.password,
            props.roleId,
            props.churchId,
            undefined,
            props.id,
            props.status
        );
    }
}