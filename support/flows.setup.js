const { reporter, mock } = require('pactum')
const pf = require('pactum-flow-plugin')

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