import { Password } from '../../src/domain/value-objects/password';

describe('Plano de Testes - Objeto de Valor Password', () => {
    it('deve retornar um erro caso seja passada uma senha inválida', () => {
        const senhasInvalidas = [
            '123456',
            'senha',
            'SENHAFORTE123',
            '@senha',
            'usuario123',
            'senhaBoa12'
        ];

        senhasInvalidas.forEach(senha => {
            expect(() => new Password(senha)).toThrow('The password is not valid.');
        });
    });

    it('deve retornar a senha fornecida caso esta seja válida', () => {
        const senhasValidas = [
            '@Master123',
            '@wurJHOOL1234',
            'Senha@Fort1234',
            '@djiofjgpAIFE1234',
            'usuario123@FORTE',
            '@SEn12445ha'
        ];

        senhasValidas.forEach(senha => {
            const valida = new Password(senha);
            expect(valida.value).toBe(senha);
        });
    });
});