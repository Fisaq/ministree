export interface ITokenPayloadOutput {
    userId: string;
    email: string;
    issuedAt: number;
    expiration: number;
}

export interface ITokenGenerator {
    generate(userId: string, email: string): string;
    verify(token: string): ITokenPayloadOutput;
}