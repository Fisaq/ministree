import bcrypt from 'bcrypt';

export class Password {
    private _password: string;

    constructor(password: string) {
        if (this.isValidPassword(password)) throw new Error('The password is not valid.');
        this._password = password;
    }

    private isValidPassword(value: string): boolean {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        return regex.test(value);
    }

    public async ecryptPassword(data: string, saltRounds: number) {
        return await bcrypt.hash(data, saltRounds);
    }

    public async comparePasswords(data: string, encrypted: string) {
        return await bcrypt.compare(data, encrypted);
    }
}