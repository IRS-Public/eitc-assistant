const { defineConfig } = require('cypress')

module.exports = defineConfig({
  viewportWidth: 1200,
  viewportHeight: 860,
  defaultCommandTimeout: 15000,
  scrollBehavior: 'center',
  experimentalFetchPolyfill: true,
  screenshotsFolder: 'cypress/screenshots',
  projectId: 'b9j9y7',
  video: false,
  screenshotOnRunFailure: false,
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config)
    },
    specPattern:
      'cypress/e2e/**/*spec.js',
  },
  component: {
    setupNodeEvents(on, config) {},
    specPattern: 'components/**/*.spec.{js,ts,jsx,tsx}',
  },
})
