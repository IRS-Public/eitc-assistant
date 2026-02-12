/* eslint-disable import/no-extraneous-dependencies */
/// <reference types="cypress" />
//* **********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
//* **********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)
const injectNextDevServer = require('@cypress/react/plugins/next')
const injectCodeCoverage = require('@cypress/code-coverage/task')
const cucumber = require('cypress-cucumber-preprocessor').default

/**
 * @type {Cypress.PluginConfig}
*/
// eslint-disable-next-line no-unused-vars
module.exports = (on, config) => {
  on('file:preprocessor', cucumber())

  if (config.testingType === 'component') {
    injectNextDevServer(on, config)
    injectCodeCoverage(on, config)
  }

  return config
}
// excel
const xlsx = require('node-xlsx').default;
const fs = require('fs'); // for file
const path = require('path');
 // for file path
module.exports = (on, config) => {
   on('task', { parseXlsx({ filePath }) {
 return new Promise((resolve, reject) => {
 try {
         const jsonData = xlsx.parse(fs.readFileSync(filePath));
         resolve(jsonData);
         } catch (e) {
            reject(e);
         }
});
       } });
}

       const readXlsx = require('./read-xlsx')

module.exports = (on, config) => {
  on('task', {
    'readXlsx': readXlsx.read
  })
}
