import { Email } from "../../../value-objects/email";
import { Password } from "../../../value-objects/password";

export interface IUpdateUserInput {
    id: string;
    name?: string;
    email?: string;
    password?: string;
}

export interface IUpdateUserOutput {
    name: string;
    email: Email;
    password: Password;
}