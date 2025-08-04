import { randomUUID } from "crypto";
import { Email } from "../value-objects/email";
import { Password } from "../value-objects/password";

export enum UserRoles {
    ADMIN = 'A',
    MINISTER = 'M',
    VOLUNTARY = 'V'
}

export class User {
    private readonly _id?: string;
    private _role: string;
    private _email: Email;
    private _passwordHashed: Password;
    private _name: string;
    private readonly _createdAt: Date;

    constructor(email: string, name: string, password: string, id?: string) {
        this._email = new Email(email);
        this._name = name;
        this._passwordHashed = new Password(password);
        this._id = id ?? randomUUID();
        this._createdAt = new Date();

        if (this.firstAccess(this._id)) this._role = UserRoles.ADMIN;
        this._role = '';
    }

    public save() {
        //TODO: Criar lógica para salvar usuário
    }

    private firstAccess(id: string): boolean {
        if (!id) return false;
        return true;
    }

    public registerMinister() {
        this._role = UserRoles.MINISTER;
        //TODO: Criar lógica para registrar ministro
    }

    public registerVoluntary() {
        this._role = UserRoles.VOLUNTARY;
        //TODO: Criar lógica para registrar voluntario
    }

    public changePassword() {
        //TODO: Criar lógica para mudar senha
    }

    public changeEmail() {
        //TODO: Criar lógica para mudar email
    }

    public registerChurch() {
        //TODO: Criar lógica para registrar Igreja
    }

    public createMinistery() {
        //TODO: Criar lógica para criar Ministério
    }

    public createSchedule() {
        //TODO: Criar lógica para criar escala
    }

    public createEvent() {
        //TODO: Criar lógica para criar evento
    }
}