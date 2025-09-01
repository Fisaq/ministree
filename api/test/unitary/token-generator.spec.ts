import { JWTAdapter } from '../../src/services/jwt-adapter';

describe('Plano de Teste - Servico de Geração de Token', () => {
    const ENVIROMENT = process.env;

    beforeEach(() => {
        jest.resetModules();
        process.env = { ...ENVIROMENT };
    });

    afterAll(() => {
        process.env = ENVIROMENT;
    });

    it('deve gerar um token jwt para o usuário com uma data de expiração', () => {
        process.env.JWT_SECRET = 'mocked_secret';

        const jwtAdapter: JWTAdapter = new JWTAdapter();

        const userId = '78760479-0aef-4361-80b7-0f27a2423182';
        const email = 'fulano.tal@email.com';
        const generate = jwtAdapter.generate(userId, email);
        const verify = jwtAdapter.verify(generate);

        expect(generate).toBeDefined();
        expect(verify.email).toBe(email);
        expect(verify.userId).toBe(userId);
    });
});