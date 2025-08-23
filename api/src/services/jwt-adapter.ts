import { ITokenGenerator, ITokenPayloadOutput } from "../domain/services/token-generator";
import jwt from "jsonwebtoken";

export class JWTAdapter implements ITokenGenerator {
    private _secret = process.env.JWT_SECRET;

    public generate(userId: string, email: string): string {
        if (!this._secret) throw new Error('JWT_SECRET not found!');
        const secret = this._secret;

        return jwt.sign(
            { userId, email },
            secret,
            { expiresIn: '24h' }
        )
    }

    public verify(token: string): ITokenPayloadOutput {
        if (!this._secret) throw new Error('JWT_SECRET not found!');
        const secret = this._secret;

        return jwt.verify(token, secret) as ITokenPayloadOutput
    }
}