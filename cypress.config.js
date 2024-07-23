const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    retries: {
      runMode: 3,
      openMode: 0,
    },
    baseUrl: "https://platform.withintelligence.com/", // Adjust to your application's base URL
    fixturesFolder: "cypress/fixtures",
    supportFile: "cypress/support/e2e.js",
    specPattern: "cypress/e2e/specs/*.cy.js",
    pageLoadTimeout: 120000,
  },
});
