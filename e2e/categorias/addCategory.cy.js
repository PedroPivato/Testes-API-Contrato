/// <reference types="cypress" />
let token

describe('API - Adicionar categoria', () => {

    before(() => {
        cy.adminToken().then((tkn) => {
            token = tkn;
        });
    });
    

    it('Deve adicionar nova categoria com sucesso', () => {
        cy.request({
            method: 'POST',
            url: 'api/addCategory',
            headers: {
                authorization: token,
            },
            body: {
                name: 'Categoria teste',
                photo: 'any'
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('message', 'category added');
            expect(response.body).to.have.property('success', true);
            expect(response.body.data.name).to.eq('Categoria teste');
        });

    });
})