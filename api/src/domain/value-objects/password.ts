export class Password {
    private _value: string

    constructor(value: string, skipValidation = false) {
        if (!skipValidation && !this.isValid(value)) {
            throw new Error('The password is not valid.');
        }

        this._value = value;
    }

    static fromHash(hash: string): Password {
        return new Password(hash, true);
    }

    get value(): string {
        return this._value;
    }

    private isValid(value: string): boolean {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        return regex.test(value);
    }
}