import { IIdGenerator } from "../interfaces/id-generator";
import { Email } from "../value-objects/email";
import { Password } from "../value-objects/password";

export enum EUserRoles {
    ADMIN = 'A',
    MINISTER = 'M',
    VOLUNTARY = 'V'
}

export class User {
    private readonly _id: string;
    private _email: Email;
    private _passwordHashed: Password;
    private _name: string;
    private _role: string;

    constructor(
        name: string,
        email: string,
        password: string,
        idGenerator?: IIdGenerator,
        id?: string,
        role?: EUserRoles,
        createdAt?: Date
    ) {
        this._email = new Email(email);
        this._name = name;
        this._passwordHashed = new Password(password);
        this._id = id ?? idGenerator?.generate() ?? '';
        this._role = role ?? EUserRoles.VOLUNTARY
        createdAt = new Date();
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
        return this._passwordHashed
    }

    public changeName(value: string) {
        this._name = value;
    }

    public changePassword(value: string) {
        this._passwordHashed = new Password(value);
    }

    public changeEmail(value: string) {
        this._email = new Email(value);
    }

    public static create(props: {
        name: string;
        email: string;
        password: string;
        role?: EUserRoles;
    }, idGenerator: IIdGenerator): User {
        return new User(
            props.name,
            props.email,
            props.password,
            idGenerator,
            undefined,
            props.role ?? EUserRoles.VOLUNTARY
        );
    }


    public static restore(props: {
        id: string;
        name: string;
        email: string;
        password: string;
        role: EUserRoles;
        createdAt: Date;
    }): User {
        return new User(
            props.name,
            props.email,
            props.password,
            undefined,
            props.id,
            props.role
        );
    }
}