// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('adminToken', () => {
    const email = Cypress.env('email')
    const password = Cypress.env('password')

    return cy.request({
        method: 'POST',
        url: 'public/authUser',
        body: { email, password }
    }).then((response) => {
        expect(response.status).to.eq(200)
        return response.body.data.token
    })
})

Cypress.Commands.add('addCategory', (token, body) => {
    return cy.request({
        method: 'POST',
        url: 'api/addCategory',
        headers: { authorization: token },
        body
    }).then((response) => {
        expect(response.status).to.eq(200)
        return response
    })
})

Cypress.Commands.add('editCategory', (token, id, body) => {
    return cy.request({
        method: 'PUT',
        url: `api/editCategory/${id}`,
        headers: { authorization: token },
        body
    }).then((response) => {
        expect(response.status).to.eq(200)
    })
})

Cypress.Commands.add('deleteCategory', (token, id) => {
    return cy.request({
        method: 'DELETE',
        url: `api/deleteCategory/${id}`,
        headers: { authorization: token }
    }).then((response) => {
        expect(response.status).to.eq(200)
    })
})

Cypress.Commands.add('addProduct', (token, body) => {
    return cy.request({
        method: 'POST',
        url: 'api/addProduct',
        headers: { authorization: token },
        body
    }).then((response) => {
        expect(response.status).to.eq(200)
        return response
    })
})

Cypress.Commands.add('editProduct', (token, id, body) => {
    return cy.request({
        method: 'PUT',
        url: `api/editProduct/${id}`,
        headers: { authorization: token },
        body
    }).then((response) => {
        expect(response.status).to.eq(200)
    })
})

Cypress.Commands.add('deleteProduct', (token, id) => {
    return cy.request({
        method: 'DELETE',
        url: `api/deleteProduct/${id}`,
        headers: { authorization: token }
    }).then((response) => {
        expect(response.status).to.eq(200)
    })
})