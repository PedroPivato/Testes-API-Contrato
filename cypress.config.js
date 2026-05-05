const { defineConfig } = require("cypress");

module.exports = defineConfig({
  allowCypressEnv: true,
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'cypress/reports',
    overwrite: false,
    html: true,
    json: false,
  },
  e2e: {
    baseUrl: "http://lojaebac.ebaconline.art.br/",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
