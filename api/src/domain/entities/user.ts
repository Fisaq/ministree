import { IIdGenerator } from "../services/id-generator";
import { Email } from "../value-objects/email";
import { Password } from "../value-objects/password";

export enum EUserRoles {
    ADMIN = 'A',
    MINISTER = 'M',
    VOLUNTARY = 'V'
}

export enum EUserStatus {
    ACTIVE = 'A',
    PENDING = 'P'
}

export class User {
    private readonly _id: string;
    private _email: Email;
    private _password: string;
    private _name: string;
    private _role: string;
    private _status: string;
    private _createdAt: Date;

    constructor(
        name: string,
        email: string,
        password: Password,
        idGenerator?: IIdGenerator,
        id?: string,
        role?: EUserRoles,
        status?: EUserStatus,
        createdAt?: Date
    ) {
        this._email = new Email(email);
        this._name = name;
        this._password = password.value;
        this._id = id ?? idGenerator?.generate() ?? '';
        this._role = role ?? EUserRoles.VOLUNTARY;
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

    get role() {
        return this._role
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

    public static create(props: {
        name: string;
        email: string;
        password: Password;
        role?: EUserRoles;
        status: EUserStatus
    }, idGenerator: IIdGenerator): User {
        return new User(
            props.name,
            props.email,
            props.password,
            idGenerator,
            undefined,
            props.role ?? EUserRoles.VOLUNTARY,
            props.status
        );
    }

    public static restore(props: {
        id: string;
        name: string;
        email: string;
        password: Password;
        role: EUserRoles;
        status: EUserStatus;
        createdAt: Date;
    }): User {
        return new User(
            props.name,
            props.email,
            props.password,
            undefined,
            props.id,
            props.role,
            props.status
        );
    }
}