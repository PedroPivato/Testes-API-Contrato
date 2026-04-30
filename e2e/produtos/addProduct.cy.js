/// <reference types="cypress" />
let token

describe('API - Adicionar produto', () => {

    before(() => {
        cy.adminToken().then((tkn) => {
            token = tkn;
        });
    });
    

    it('Deve adicionar novo produto com sucesso', () => {
        cy.addProduct(token, {
            name: 'Produto teste',
            price: '10.99',
            quantity: '100',
            description: 'descrição do produto teste',
            photo: 'any'
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('message', 'product added');
            expect(response.body).to.have.property('success', true);
        });

    });
})