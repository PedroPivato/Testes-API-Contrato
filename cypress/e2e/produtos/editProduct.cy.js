/// <reference types="cypress" />
let token
let productId

describe('API - editar produto', () => {

    before(() => {
        cy.adminToken().then((tkn) => {
            token = tkn;

            cy.addProduct(token, {
            name: 'Produto teste',
            price: '10.99',
            quantity: '100',
            description: 'descrição do produto teste',
            photo: 'any'
            }).then((response) => {
                productId = response.body.data._id;
            });
        });
    });


    it('Deve editar novo product com sucesso', () => {
        cy.editProduct(token, productId, {
            name: 'Produto teste editado',
            price: '15.99',
            quantity: '50',
            description: 'descrição do produto teste editada',
            photo: 'any'
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('message', 'product updated');
            expect(response.body).to.have.property('success', true);
        });
    });
})