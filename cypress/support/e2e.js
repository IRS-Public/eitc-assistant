/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import './commands'
import '@cypress/code-coverage/support'

const mobileDevice = 'iphone-x'

 // environment options
const local = 'local'
const DEV = 'dev'
const SIT = 'sit'
const EITE = 'eite'
const PETE = 'pete'
const PERF = 'perf'
const PROD = 'prod'

// language options
const english = 'en'
const spanish = 'es'
const chinese1 = 'zh-hans'
const chinese2 = 'zh-hant'
const korean = 'ko'
const russian = 'ru'
const vietnamese = 'vi'
const haitian = 'ht'

/*
TO RUN TESTS
Set env equal to chosen environment on line 33
Set lang equal to chosen language on line 34
*/

const env = PERF
const lang = english


// DO NOT EDIT FROM HERE DOWN

beforeEach('Run Before Each Script', () => {
  cy.fixture(`content-${lang}.json`).as('contentJSON')
  // cy.viewport(mobileDevice)
  if (env === local) {
    cy.visit(`http://localhost:3300/app/eitc${lang === english ? '/' : `/${lang}/`}`)
  }
  if(env === PERF) {
    cy.visit(`https://cloudapps.perf.irs.gov/app/eitc${lang === english ? '/' : `/${lang}/`}`)
  }
  if(env === PROD) {
    cy.visit(`https://apps.irs.gov/app/eitc${lang === english ? '/' : `/${lang}/`}`)
  }
  if(env === DEV) {
    cy.visit(`https://eitc-frontend-bucket-dev.s3.amazonaws.com/app/eitc${lang === english ? '/' : `/${lang}/`}index.html`)
  }
  if(env === SIT) {
    cy.visit(`https://eitc-frontend-bucket-sit.s3-us-gov-west-1.amazonaws.com/app/eitc${lang === english ? '/' : `/${lang}/`}index.html`)
  }
  if(env === EITE) {
    cy.visit(`https://eitc-frontend-bucket-eite.s3-us-gov-west-1.amazonaws.com/app/eitc${lang === english ? '/' : `/${lang}/`}index.html`)
  }
  if(env === PETE) {
    cy.visit(`https://eitc-frontend-bucket-pete.s3-us-gov-west-1.amazonaws.com/app/eitc${lang === english ? '/' : `/${lang}/`}index.html`)
  }
})
