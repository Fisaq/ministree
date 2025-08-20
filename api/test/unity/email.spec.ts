import { Email } from "../../src/domain/value-objects/email";

describe('Plano de Testes - Classe Email', () => {
    it('deve retornar um email válido', () => {
        const emails = [
            'fulano@email.com',
            'ciclano12@meudominio.com',
            'FULANO.TAL23@DOMINIO.NET',
            'BELTRANO12@DOMINIO.ORG'
        ];

        for (let email of emails) {
            const resultado = new Email(email);
            expect(resultado.value).toBe(email);
        }
    });

    it('deve retornar um erro caso o email seja inválido', () => {
        const emails = [
            'teste.com.br',
            'fulano1234',
            'email',
            '@isaque.com.br',
            'vaiDARerraD0'
        ];

        for (let email of emails) {
            expect(() => new Email(email)).toThrow('The email is not a valid email.');
        }
    });
});