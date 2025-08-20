import { EUserRoles } from "../../../entities/user";
import { Email } from "../../../value-objects/email";
import { Password } from "../../../value-objects/password";

export interface ICreateUserInputDTO {
    name: string;
    email: string;
    password: string;
}

export interface ICreateUserOutpuDTO {
    id: string;
    name: string;
    email: Email;
    password: Password;
    role: EUserRoles;
    createAt: Date;
}