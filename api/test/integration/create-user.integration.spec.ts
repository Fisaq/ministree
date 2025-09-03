import { bootstrap } from '../../src/config/bootstrap';
import { prisma } from '../../src/infra/database/prisma-client';

describe('Teste de Integração - Fluxo de Criação do Usuário', () => {
    let app: any;

    beforeAll(async () => {
        app = await bootstrap();
    })

    beforeEach(async () => {
        await prisma.appUser.deleteMany({});
    });

    it('Deve criar um novo usuário', async () => {
        const userExample = {
            name: 'Fulano de Tal',
            email: 'fulano.tal@email.com',
            password: '@MasterPassword123'
        }

        const newUser = await app.createUserUseCase.execute(userExample);

        expect(newUser).toBeDefined();
        expect(newUser.email.value).toBe(userExample.email);
        expect(newUser.role).toBe('A');
        expect(newUser.status).toBe('P');
    });

    afterAll(async () => {
        if (app.close) {
            await app.close();
        }
    });
});