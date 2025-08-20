export class Email {
    private _email: string;

    constructor(value: string) {
        console.log(value)
        if (!this.isEmailValid(value)) throw new Error('The email is not a valid email.');
        this._email = value;
    }

    public get value(): string {
        return this._email;
    }

    private isEmailValid(value: string): boolean {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        return regex.test(value);
    }
}