import { IEncryption } from '../security/encryption';

export class Password {
    constructor(private readonly _value: string) { }

    get value(): string {
        return this._value;
    }

    public static async create(value: string, encryption: IEncryption): Promise<Password> {
        if (this.isValid(value)) throw new Error('The password is not valid.');

        const hash = await encryption.hash(value);
        return new Password(hash);
    }

    private static isValid(value: string): boolean {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        return regex.test(value);
    }

    public async compareWith(raw: string, encryption: IEncryption): Promise<Boolean> {
        return await encryption.compare(raw, this._value)
    }
}