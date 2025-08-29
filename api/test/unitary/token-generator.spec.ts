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

        const userId = 'c079bba1-2284-42dd-84d2-9b4f53411afd';
        const email = 'admin@adm.com';
        const generate = jwtAdapter.generate(userId, email);
        const verify = jwtAdapter.verify(generate);

        expect(generate).toBeDefined();
        expect(verify.email).toBe(email);
        expect(verify.userId).toBe(userId);
    });
});