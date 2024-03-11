const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      specPattern: "cypress/e2e/**/*.js"
    },

    baseUrl: "https://pushing-it.vercel.app",
    fixturesFolder: "cypress/e2e/",
    defaultCommandTimeout: 5000
  },
  env:
  {
    usuario: "pushingit",
    password: "123456!",
    apiUrl: "https://pushing-it.onrender.com/api",
    token: ""

  } 
});
