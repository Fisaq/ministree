import { randomUUID } from "crypto";
import { Email } from "../value-objects/email";
import { Password } from "../value-objects/password";

export class User {
    private readonly _id?: string;
    private readonly _email: Email;
    private _name: string;
    private _password: Password;

    constructor(email: Email, name: string, password: Password, id?: string) {
        this._email = email;
        this._name = name;
        this._password = password;
        this._id = id ?? randomUUID();
    }
}