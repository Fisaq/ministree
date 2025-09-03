import bcrytp from 'bcrypt';
import { IEncryption } from '../domain/services/encryption';

export class BcryptAdapter implements IEncryption {
    constructor(private readonly _salt = 10) { }

    public async hash(data: string): Promise<string> {
        return await bcrytp.hash(data, this._salt);
    }

    public async compare(data: string, encrypted: string): Promise<boolean> {
        return await bcrytp.compare(data, encrypted);
    }
}