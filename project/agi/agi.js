import { useContext, useEffect, useState } from 'react'
import clsx from 'clsx'
import { Formik, Form, getIn } from 'formik'
import { useRouter } from 'next/router'
import { animateScroll, Link as LinkScroll } from 'react-scroll'
import { isObject, flatMap } from 'lodash'
import SiteContext from '../../context/Site/SiteContext'
import { gaPageView, formatMoney } from '../../helpers'
import routes from '../../templates/helpers/routes'
import Alert from '../../components/Alert'
import FormBuilder from '../../components/FormBuilder'
import Heading from '../../components/Heading'
import HtmlBuilder from '../../components/HtmlBuilder'
import NavButtons from '../../components/NavButtons/NavButtons'
import AutoSubmit from './Form/AutoSubmit'
import { earnedIncomeFormElements, unearnedIncomeFormElements, adjustmentsFormElements } from './Form/FormObject'
import { isAnyIncomeChecked, isEarnedOnlyPrisonIncome } from './Form/helpers/utils'
import {
  noEarnedIncomeWarning,
  onlyPenalIncomeWarning,
  agiLimitWarning,
  earnedIncomeLimitWarning
} from './Structure/AlertsHtml'
import disqualifiers from './Validation/disqualifiers'
import calcAgiForEitc from '../../calculations/agi/calcAgiForEitc'
import validationSchema from './Validation/validationSchema'
import param from '../../calculations/eitc/EITCParams.json'

const AGI = () => {
  const router = useRouter()

  const { site, lang, langCode } = useContext(SiteContext)
  const [showErrors, setShowErrors] = useState(false)
  const { year } = site.forms.generalInfo.values
  const { numOfDependents } = site.forms.filingStatus.values
  const filingStatus = site.forms.filingStatus.fsCalc
  const reducer = (sum, item) => sum + parseInt(item.amount)

  const initialValues = site.forms.agi.values

  const handleErrorLink = (event, id) => {
    event.preventDefault()
    document.getElementById('noIncome').focus()
  }

  const handleErrorCheck = async (validateForm) => {
    try {
      const results = await validateForm()

      if (Object.keys(results).length > 0) {
        setShowErrors(true)
        animateScroll.scrollTo(370, { duration: 600 })
        document.getElementById('error-messages').focus()
      } else {
        setShowErrors(false)
      }
    } catch (error) {
      console.error('error', error)
    }
  }

  const flattenObj = (val, keys = []) =>
  (isObject(val) // if it's an object or array
    ? flatMap(val, (v, k) => flattenObj(v, [...keys, k])) // iterate it and call fn with the value and the collected keys
    : keys.join('.')) // return the joined keys

  const getErrorsObj = (errors) => flattenObj(errors)

  const isCompleted = (values) => (Object.keys(disqualifiers(values, numOfDependents, filingStatus, year)).length === 0)
    && isAnyIncomeChecked(values)
    && calcAgiForEitc(values).earned > 0

  const onSubmit = () => {
    router.push(routes(langCode, 'eitc').qualifyingChildren, undefined, { shallow: true })
  }

  useEffect(() => {
    animateScroll.scrollToTop({ duration: 0 })

    langCode === 'en'
      ? gaPageView('/app/eitc/agi/', 'EITC - AGI | Internal Revenue Service')
      : gaPageView(`/app/eitc/agi/${langCode}/`, 'EITC - AGI | Internal Revenue Service')
  }, [])

  return (
    <div className={clsx('block fade-in')}>
      <Heading
        level="2"
        className="text-2xl font-bold fade-in"
        data-testid="agiTitle"
      >
        {lang('agi.h2.title')}
      </Heading>

      {(!site.forms.generalInfo.completed || !site.forms.filingStatus.completed) && (
        <Alert
          id="agiSkipAheadWarning"
          title={lang('global.heading.attention')}
          type="warning"
          gaLabel="AGI Skip Ahead Warning"
        >
          <p>{lang('agi.p.previousMessage')}</p>
        </Alert>
      )}

      {site.forms.generalInfo.completed && site.forms.filingStatus.completed && (
        <>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema(lang, site.forms.agi.values)}
            onSubmit={() => onSubmit()}
            validateOnBlur={false}
          >
            {({ values, errors, isSubmitting, setFieldValue, validateForm }) => (
              <>
                <Form className="w-full" noValidate>
                  <AutoSubmit isCompleted={isCompleted} />

                  {showErrors && getErrorsObj(errors).length > 0
                    && (
                      <Alert
                        dataTestId="error"
                        className={clsx('lg:w-10/12', (showErrors && getErrorsObj(errors).length > 0) ? '' : 'hidden')}
                        id="error-messages"
                        title={getErrorsObj(errors).length > 1
                          ? lang('global.heading.errorMultiple', { ':num': getErrorsObj(errors).length })
                          : lang('global.heading.errorSingle')}
                        type="error"
                        gaLabel="AGI Errors Alert"
                      >
                        <ol className="ml-4 my-2 list list-decimal">
                          {getErrorsObj(errors).map((error, index) => (
                            <li className="my-1" key={index} data-testid={`${error}-errorListItem`}>
                              <LinkScroll
                                href="#"
                                to={error}
                                spy
                                offset={-85}
                                smooth
                                className="link"
                                onClick={(event) => handleErrorLink(event, error)}
                              >
                                {getIn(errors, getErrorsObj(errors)[index])}
                              </LinkScroll>
                            </li>
                          ))}
                        </ol>
                      </Alert>
                    )
                  }

                  <div className="mt-4 mb-8 fade-in">
                    <HtmlBuilder elements={
                      [
                        {
                          key: 'p0',
                          type: 'Paragraph',
                          text: filingStatus === 'married' ? lang('agi.subheading.married') : lang('agi.subheading.unMarried'),
                          className: 'my-4',
                          dataTestID: 'agiParagraph1'
                        },
                        {
                          key: 'p1',
                          type: 'Paragraph',
                          text: filingStatus === 'married' ? 'agi.subheading.instructionsMarried' : 'agi.subheading.instructions',
                          className: 'text mt-1 lg:w-5/6',
                          dataTestID: 'agiParagraph2',
                          replacements: [
                            {
                              type: 'simpleText',
                              key: ':year',
                              text: year,
                            },
                          ]
                        },
                        {
                          key: 'p2',
                          type: 'Paragraph',
                          text: 'global.span.asterisk',
                          className: 'my-4',
                          dataTestID: 'reqText',
                          replacements: [
                            {
                              type: 'redText',
                              key: ':*',
                              text: '*'
                            }
                          ]
                        },
                      ]
                    }
                    />
                  </div>

                  {param[year]?.useARPA && year == "2021" && (
                    <Alert
                      id="agiARPAInfoAlert"
                      title={lang('agi.h2.priorYearIncome')}
                      type="info"
                      gaLabel="AGI Prior Year Income"
                      dataTestId="agiARPAInfoAlert"
                    >
                      <HtmlBuilder elements={
                        [
                          {
                            key: 'priorYearIncome-p1',
                            type: 'Paragraph',
                            text: 'agi.p.priorYearIncome',
                            className: 'my-4',
                            dataTestID: 'agiARPAInfoAlertParagraph'
                          },
                          {
                            key: 'priorYearIncome-p2',
                            type: 'Paragraph',
                            text: 'agi.p.priorYearIncome2',
                            className: 'text mt-1',
                            dataTestID: 'priorYearIncome-p2',
                            replacements: [
                              {
                                type: 'link',
                                key: ':irsPub596',
                                href: 'https://www.irs.gov/forms-pubs/about-publication-596',
                                text: 'agi.a.priorYearIncome1',
                                external: true,
                                dataTestID: 'priorYearIncome-a1',
                              }
                            ]
                          },
                        ]
                      }
                      />
                    </Alert>
                  )}

                  {filingStatus === 'married'
                    && (
                      <Alert
                        id="spousesIncomeInfo"
                        title={lang('global.heading.pleaseNote')}
                        type="info"
                        gaLabel="AGI Spouses Income Info"
                        dataTestId="agiSpouseInfoAlert"
                      >
                        <p data-testid="agiSpouseInfoAlertParagraph">{lang('agi.p.mfjIncludeSpouse')}</p>
                      </Alert>
                    )
                  }

                  <FormBuilder options={earnedIncomeFormElements(values, site, lang, setFieldValue)} />

                  <FormBuilder options={unearnedIncomeFormElements(values, site, lang, setFieldValue)} />

                  <FormBuilder options={adjustmentsFormElements(values, site, lang, setFieldValue)} />

                  {values.earnedIncome.selfEmploymentGross.checked || values.earnedIncome.federalIncomeNotWithheld.checked  &&
                      <Alert
                        id="spousesIncomeInfo"
                        title={lang('global.heading.pleaseNote')}
                        type="info"
                        gaLabel="Self Employment Taxes Note"
                        dataTestId="agiSelfEmploymentTaxes"
                      >
                        <p data-testid="agiSelfEmploymentTaxes">{lang('agi.p.federalIncomeNotWithheldNote')}</p>
                      </Alert>
                  }
                  <h3
                    style={{ top: '43px' }}
                    className="text-1.5xl my-4"
                    data-testid="agiTotal"
                  >
                    {lang('agi.h3.yourAgiTitle')} <span className="font-bold">{formatMoney(calcAgiForEitc(values).agi)}</span>
                  </h3>

                  {disqualifiers(values, numOfDependents, filingStatus, year).earned && (
                    <Alert
                      id="earnedIncomeWarning"
                      title={lang('global.heading.eitcNoQualify')}
                      type="warning"
                      gaLabel="AGI Earned Income Over Limit Warning"
                      dataTestId="earnedIncomeLimitWarning"
                    >
                      {earnedIncomeLimitWarning(langCode)}
                    </Alert>
                  )
                  }

                  {!disqualifiers(values, numOfDependents, filingStatus, year).earned
                    && disqualifiers(values, numOfDependents, filingStatus, year).agi && (
                      <Alert
                        id="agiLimitWarning"
                        title={lang('global.heading.eitcNoQualify')}
                        type="warning"
                        gaLabel="AGI Over Limit Warning"
                        dataTestId="agiLimitWarning"
                      >
                        {agiLimitWarning(langCode)}
                      </Alert>
                    )
                  }

                  {((values.noIncome.includes('noIncome') && !isAnyIncomeChecked(values))
                    || disqualifiers(values, numOfDependents, filingStatus, year).earnedIncomeNeg)
                    && (
                      <Alert
                        id="noEarnedIncomeWarning"
                        title={lang('global.heading.eitcNoQualify')}
                        type="warning"
                        gaLabel="AGI No Earned Income Warning"
                        dataTestId="noEarnedIncomeWarning"
                      >
                        {noEarnedIncomeWarning()}
                      </Alert>
                    )
                  }

                  {values.earnedIncome.prisonIncome.info.reduce(reducer, 0) > 0
                    && isEarnedOnlyPrisonIncome(values)
                    && (
                      <Alert
                        id="onlyPenalIncomeWarning"
                        title={lang('global.heading.eitcNoQualify')}
                        type="warning"
                        gaLabel="AGI Prison Only Income Warning"
                        dataTestId="onlyPenalIncomeWarning"
                      >
                        {onlyPenalIncomeWarning(langCode)}
                      </Alert>
                    )
                  }

                  <NavButtons
                    nextOnclick={() => handleErrorCheck(validateForm)}
                    backOnclick={() => router.push(routes(langCode, 'eitc').filingStatus, undefined, { shallow: true })}
                    backText={lang('global.button.back')}
                    nextText={lang('global.button.next')}
                    backDisable={isSubmitting}
                    nextDisable={isSubmitting || Object.keys(disqualifiers(values, numOfDependents, filingStatus, year)).length > 0}
                  />
                </Form>
              </>
            )}
          </Formik>
        </>
      )}
    </div>
  )
}

export default AGI
