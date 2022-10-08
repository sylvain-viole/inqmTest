const { defineConfig } = require('cypress')

module.exports = defineConfig({
  numTestsKeptInMemory: 10,
  viewportWidth: 1920,
  viewportHeight: 1080,
  waitForAnimations: true,
  chromeWebSecurity: false,
  requestTimeout: 60000,
  responseTimeout: 120000,
  pageLoadTimeout: 60000,
  defaultCommandTimeout: 10000,
  trashAssetsBeforeRuns: true,
  video: false,
  videoUploadOnPasses: false,
  blockHosts: [
    '*google-analytics.com',
    '*googleadservices.com',
    '*googletagmanager.com',
    '*criteo.net',
    '*iadvize.com',
    '*msecnd.net',
    '*facebook.net',
  ],
  projectId: '',
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config)
    },
    baseUrl: 'https://www.welcometothejungle.com/',
  },
})
