import pactum from 'pactum'
import pf from 'pactum-flow-plugin'

const { reporter } = pactum
const flow = pactum.flow

function addFlowReporter() {
    pf.config.url = 'http://localhost:8081'
    pf.config.projectId = 'lojaebac-api'
    pf.config.projectName = 'Loja EBAC API'
    pf.config.version = '1.0.1'
    pf.config.username = 'scanner'
    pf.config.password = 'scanner'
    reporter.add(pf.reporter)
}

before(async () => {
    addFlowReporter()
    await pactum.spec()
        .post('http://lojaebac.ebaconline.art.br/public/authUser')
        .withJson({ email: 'admin@admin.com', password: 'admin123' })
        .expectStatus(200)
        .stores('token', 'data.token')
})

after(async () => {
    await reporter.end()
})

it('API - deve adicionar categoria', async () => {
    await flow('Add Category')
        .post('http://lojaebac.ebaconline.art.br/api/addCategory')
        .withHeaders({ authorization: '$S{token}' })
        .withJson({ name: 'Categoria Teste', photo: 'any' })
        .expectStatus(200)
        .expectJson('success', true)
        .stores('categoryId', 'data._id')
})

it('API - deve editar categoria', async () => {
    await flow('Edit Category')
        .put('http://lojaebac.ebaconline.art.br/api/editCategory/$S{categoryId}')
        .withHeaders({ authorization: '$S{token}' })
        .withJson({ name: 'Categoria Editada', photo: 'any' })
        .expectStatus(200)
        .expectJson('success', true)
})

it('API - deve deletar categoria', async () => {
    await flow('Delete Category')
        .delete('http://lojaebac.ebaconline.art.br/api/deleteCategory/$S{categoryId}')
        .withHeaders({ authorization: '$S{token}' })
        .expectStatus(200)
        .expectJson('success', true)
})