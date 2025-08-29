import { BcryptAdapter } from '../../src/services/bcrypt-adapter'

describe('Plano de Testes - Criptografia de Senhas com Hash', () => {
    const bcrypt: BcryptAdapter = new BcryptAdapter();

    it('deve retornar um hash ao receber uma senha', () => {
        const listaSenhas: string[] = [
            '@Master123',
            '@SenhaFORT12',
            '12AEFinoe@#45'
        ];

        listaSenhas.forEach(async senha => {
            const senhaHash = await bcrypt.hash(senha);
            expect(senhaHash).toBeDefined();
        });
    });

    it('deve retornar verdadeiro se uma senha digitada corresponde a um hash armazenado', async () => {
        const senhaInformada = '@Master123';
        const hashArmazenado = await bcrypt.hash(senhaInformada);

        const comparacao = await bcrypt.compare(senhaInformada, hashArmazenado);
        expect(comparacao).toBe(true);
    });

    it('deve retornar falso se uma senha digitada não corresponde a um hash armazenado', async () => {
        const senhaInformada = '@Master123';
        const hashArmazenado = await bcrypt.hash(senhaInformada);

        const outraSenha = "@Master3249";

        const comparacao = await bcrypt.compare(outraSenha, hashArmazenado);
        expect(comparacao).toBe(false);
    });
});