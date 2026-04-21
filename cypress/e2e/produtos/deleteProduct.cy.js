/// <reference types="cypress" />
let token
let productId

describe('API - deletar produto', () => {

    before(() => {
        cy.adminToken().then((tkn) => {
            token = tkn;

            cy.addProduct(token, {
                name: 'produto teste',
                price: '10.99',
                quantity: '100',
                description: 'descrição do produto teste',
                photo: 'any'
            }).then((response) => {
                productId = response.body.data._id;
            });
        });
    });


    it('Deve deletar novo produto com sucesso', () => {
        cy.deleteProduct(token, productId).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('message', 'product deleted');
            expect(response.body).to.have.property('success', true);
        });
    });
})