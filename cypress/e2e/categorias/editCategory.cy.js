/// <reference types="cypress" />
let token
let categoryId

describe('API - editar categoria', () => {

    before(() => {
        cy.adminToken().then((tkn) => {
            token = tkn;

            cy.addCategory(token, {
                name: 'Categoria teste',
                photo: 'any'
            }).then((response) => {
                categoryId = response.body.data._id;
            });
        });
    });


    it('Deve editar nova categoria com sucesso', () => {
        cy.editCategory(token, categoryId, {
            name: 'Categoria teste editada',
            photo: 'any'
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('message', 'category updated');
            expect(response.body).to.have.property('success', true);
        });
    });
})