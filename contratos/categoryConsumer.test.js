import pactum from 'pactum'
import pf from 'pactum-flow-plugin'
import { like } from 'pactum-matchers'

const { reporter, handler, mock } = pactum
const flow = pactum.flow

function addFlowReporter() {
    pf.config.url = 'http://localhost:8081'
    pf.config.projectId = 'lojaebac-front'
    pf.config.projectName = 'Loja EBAC Front'
    pf.config.version = '1.0.1'
    pf.config.username = 'scanner'
    pf.config.password = 'scanner'
    reporter.add(pf.reporter)
}

before(async () => {
    addFlowReporter()
    await mock.start(4000)
})

after(async () => {
    await mock.stop()
    await reporter.end()
})

handler.addInteractionHandler('Add Category Response', () => {
    return {
        provider: 'lojaebac-api',
        flow: 'Add Category',
        request: {
            method: 'POST',
            path: '/api/addCategory',
            headers: {
                authorization: like('token')
            },
            body: {
                name: like('Categoria Teste'),
                photo: like('any')
            }
        },
        response: {
            status: 200,
            body: {
                success: true,
                message: like('category created'),
                data: {
                    _id: like('65766e71ab7a6bdbcec70d0d'),
                    name: like('Categoria Teste'),
                    photo: like('any')
                }
            }
        }
    }
})


handler.addInteractionHandler('Edit Category Response', () => {
    return {
        provider: 'lojaebac-api',
        flow: 'Edit Category',
        request: {
            method: 'PUT',
            path: ('/api/editCategory/65766e71ab7a6bdbcec70d0d'),
            headers: {
                authorization: like('token')
            },
            body: {
                name: like('Categoria editada'),
                photo: like('any')
            }
        },
        response: {
            status: 200,
            body: {
                success: true,
                message: like('category updated')
            }
        }
    }
})


handler.addInteractionHandler('Delete Category Response', () => {
    return {
        provider: 'lojaebac-api',
        flow: 'Delete Category',
        request: {
            method: 'DELETE',
            path: ('/api/deleteCategory/65766e71ab7a6bdbcec70d0d'),
            headers: {
                authorization: like('token')
            }
        },
        response: {
            status: 200,
            body: {
                success: true,
                message: like('category deleted')
            }
        }
    }
})


it('FRONT - deve adicionar categoria', async () => {
    await flow('Add Category')
        .useInteraction('Add Category Response')
        .post('http://localhost:4000/api/addCategory')
        .withHeaders({ authorization: 'token' })
        .withJson({ name: 'Categoria Teste', photo: 'any' })
        .expectStatus(200)
        .expectJson('success', true)
})

it('FRONT - deve editar categoria', async () => {
    await flow('Edit Category')
        .useInteraction('Edit Category Response')
        .put('http://localhost:4000/api/editCategory/65766e71ab7a6bdbcec70d0d')
        .withHeaders({ authorization: 'token' })
        .withJson({ name: 'Categoria Editada', photo: 'any' })
        .expectStatus(200)
        .expectJson('success', true)
})

it('FRONT - deve deletar categoria', async () => {
    await flow('Delete Category')
        .useInteraction('Delete Category Response')
        .delete('http://localhost:4000/api/deleteCategory/65766e71ab7a6bdbcec70d0d')
        .withHeaders({ authorization: 'token' })
        .expectStatus(200)
        .expectJson('success', true)
})