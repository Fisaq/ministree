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

    it('Deve registrar um novo usuário ADMIN', async () => {
        const userExample = {
            churchId: 1,
            name: 'Fulano de Tal',
            email: 'fulano.tal@email.com',
            password: '@MasterPassword123'
        }

        const newUser = await app.createUserUseCase.execute(
            null,
            {
                name: userExample.name,
                email: userExample.email,
                password: userExample.password
            },
            userExample.churchId
        );

        expect(newUser).toBeDefined();
        expect(newUser.email.value).toBe(userExample.email);
        expect(newUser.roleId).toBe(1001);
        expect(newUser.status).toBe('P');
    });

    // it('Deve registrar um novo usuário do tipo MINISTRO', async () => {
    //     const currentUser = {
    //         id: 'f1c8c86b-0ef4-4720-8d49-058caa221eaa',
    //         churchId: 1,
    //         roleId: 1001
    //     }

    //     const userExample = {
    //         churchId: 1,
    //         name: 'Ciclano da Silva',
    //         email: 'ciclano.silva@email.com',
    //         password: '@Master123'
    //     }

    //     const newUser = await app.createUserUseCase.execute(currentUser, userExample);

    //     expect(newUser).toBeDefined();
    //     expect(newUser.email.value).toBe(userExample.email);
    //     expect(newUser.role).toBe('M');
    //     expect(newUser.status).toBe('P');
    // });

    // it('Deve registrar um novo usuário do tipo VOLUNTÁRIO', async () => {
    //     const currentUser = {
    //         id: 'f1c8c86b-0ef4-4720-8d49-058caa221eaa',
    //         churchId: 1,
    //         roleId: 2001
    //     }

    //     const userExample = {
    //         churchId: 1,
    //         name: 'Beltrano de Jesus',
    //         email: 'beltrano.jesus@email.com',
    //         password: '@Beltra456'
    //     }

    //     const newUser = await app.createUserUseCase.execute(currentUser, userExample);

    //     expect(newUser).toBeDefined();
    //     expect(newUser.email.value).toBe(userExample.email);
    //     expect(newUser.role).toBe('V');
    //     expect(newUser.status).toBe('P');
    // });

    afterAll(async () => {
        if (app.close) {
            await app.close();
        }
    });
});