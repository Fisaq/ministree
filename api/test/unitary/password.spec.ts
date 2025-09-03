import { Password } from '../../src/domain/value-objects/password';

describe('Plano de Testes - Objeto de Valor Password', () => {
    it('deve retornar um erro caso seja passada uma senha inválida', () => {
        const validPasswords = [
            '123456',
            'senha',
            'SENHAFORTE123',
            '@senha',
            'usuario123',
            'senhaBoa12'
        ];

        validPasswords.forEach(pswd => {
            expect(() => new Password(pswd)).toThrow('The password is not valid.');
        });
    });

    it('deve retornar a senha fornecida caso esta seja válida', () => {
        const invalidPasswords = [
            '@Master123',
            '@wurJHOOL1234',
            'Senha@Fort1234',
            '@djiofjgpAIFE1234',
            'usuario123@FORTE',
            '@SEn12445ha'
        ];

        invalidPasswords.forEach(pswd => {
            const valida = new Password(pswd);
            expect(valida.value).toBe(pswd);
        });
    });
});