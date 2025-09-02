import { bootstrap } from '../../src/config/bootstrap';
import { prisma } from '../../src/infra/database/prisma-client';

describe('Teste de Integração - Fluxo de Criação do Usuário', () => {
    let app: any;

    beforeAll(async () => {
        app = await bootstrap();
    });

    beforeEach(async () => {
        await prisma.appUser.deleteMany({});
    });

    it('Deve atualizar um usuário existente através do seu Id', async () => {
        const userExample = {
            name: 'Fulano de Tal',
            email: 'fulano.tal@email.com',
            password: '@MasterPassword123'
        }

        const newUser = await app.createUserUseCase.execute(userExample);

        const update = {
            id: newUser.id,
            name: 'Ciclano de Tal',
            email: 'ciclano.tal@email.com',
            password: '@NewPassword456'
        }

        const userUpdated = await app.updateUserUseCase.execute(update);

        expect(userUpdated).toBeDefined();
        expect(userUpdated.id).toBe(newUser.id);
        expect(userUpdated.name).toBe(update.name);
        expect(userUpdated.email.value).toBe(update.email);

        const isPasswordValid = await app.encryption.compare(update.password, userUpdated.password);
        expect(isPasswordValid).toBe(true);
    });

    afterAll(async () => {
        if (app.close) {
            await app.close();
        }
    });
});