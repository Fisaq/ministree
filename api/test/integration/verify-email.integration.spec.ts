import { bootstrap } from '../../src/config/bootstrap';
import { prisma } from '../../src/infra/database/prisma-client';

describe('Teste de Integração - Envio de Email de Verificação', () => {
    let app: any;

    beforeAll(async () => {
        app = await bootstrap();
    })

    beforeEach(async () => {
        await prisma.appUser.deleteMany({});
    });

    const userExample = {
        name: 'Usuário Email',
        email: 'teste@email.com',
        password: '@MasterPassword123'
    }

    it('Deve enviar um email de verificação quando um usuário for criado', async () => {
        const newUser = await app.createUserUseCase.execute(userExample);
        const token = await app.jwtToken.generate(newUser.id, newUser.email.value);

        const emailService = await app.emailService.sendVerificationEmail(newUser.email.value, token);

        expect(token).toBeDefined();
        expect(newUser.status).toBe('P');
        expect(emailService.envelope.to).toContain(newUser.email.value);
        expect(emailService.messageId).toBeDefined();
    });

    it('Deve atualizar o status do usuário para ativo após a verificação por email', async () => {
        const newUser = await app.createUserUseCase.execute(userExample);
        const token = await app.jwtToken.generate(newUser.id, newUser.email.value);

        const updatedUser = await app.verifyEmailUseCase.execute(token);
        
        expect(updatedUser.status).toBe('A');
    });

    afterAll(async () => {
        if (app.close) {
            await app.close();
        }
    });
});