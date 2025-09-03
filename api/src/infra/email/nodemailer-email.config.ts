import nodemailer from 'nodemailer';
import { IEmailService } from "../../domain/services/email-service";

export class NodemailerEmailConfiguration implements IEmailService {
    private _transporter!: nodemailer.Transporter;

    public async init() {
        //* Esta conta é apenas para testes.
        //TODO: Implementar os parâmetros reais para envio
        const testAccount = await nodemailer.createTestAccount();
        this._transporter = nodemailer.createTransport({
            host: testAccount.smtp.host,
            port: testAccount.smtp.port,
            secure: testAccount.smtp.secure,
            auth: {
                user: testAccount.user,
                pass: testAccount.pass
            }
        });
    }

    public async sendVerificationEmail(email: string, token: string): Promise<any> {
        const link = `http://localhost:3000/users/verify-email?token=${token}`;
        const info = await this._transporter.sendMail({
            from: 'Email Test: <test@example.com>',
            to: email,
            subject: 'Registration Confirmation - Ministree',
            html: `<p>Click here for confirmation: <a href="${link}">${link}</a></p>`
        });

        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        return info;
    }
}