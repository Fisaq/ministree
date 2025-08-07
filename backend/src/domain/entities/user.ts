import { randomUUID } from "crypto";
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
    private readonly _createdAt: Date;

    constructor(name: string, email: string, password: string, id?: string, role?: EUserRoles, createdAt?: Date) {
        this._email = new Email(email);
        this._name = name;
        this._passwordHashed = new Password(password);
        this._id = id ?? randomUUID();
        this._createdAt = new Date();
        this._role = role ?? EUserRoles.VOLUNTARY
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

    get createdAt() {
        return this._createdAt
    }

    public changePassword(value: string) {
        return new Password(value);
    }

    public changeEmail(value: string) {
        return new Email(value);
    }
}