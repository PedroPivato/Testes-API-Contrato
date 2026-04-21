/// <reference types="cypress" />
let token
let categoryId

describe('API - deletar categoria', () => {

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


    it('Deve deletar nova categoria com sucesso', () => {
        cy.deleteCategory(token, categoryId).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('message', 'category deleted');
            expect(response.body).to.have.property('success', true);
        });
    });
})