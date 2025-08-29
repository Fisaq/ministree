import { BcryptAdapter } from '../../src/services/bcrypt-adapter';

describe('Plano de Testes - Criptografia de Senhas com Hash', () => {
    const bcrypt: BcryptAdapter = new BcryptAdapter();

    it('deve retornar um hash ao receber uma senha', () => {
        const passwords: string[] = [
            '@Master123',
            '@SenhaFORT12',
            '12AEFinoe@#45'
        ];

        passwords.forEach(async pswd => {
            const senhaHash = await bcrypt.hash(pswd);
            expect(senhaHash).toBeDefined();
        });
    });

    it('deve retornar verdadeiro se uma senha digitada corresponde a um hash armazenado', async () => {
        const informedPassword = '@Master123';
        const hash = await bcrypt.hash(informedPassword);

        const compare = await bcrypt.compare(informedPassword, hash);
        expect(compare).toBe(true);
    });

    it('deve retornar falso se uma senha digitada não corresponde a um hash armazenado', async () => {
        const informedPassword = '@Master123';
        const hash = await bcrypt.hash(informedPassword);

        const otherPassword = "@Master3249";

        const compare = await bcrypt.compare(otherPassword, hash);
        expect(compare).toBe(false);
    });
});