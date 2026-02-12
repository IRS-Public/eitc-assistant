import { useState, useContext, useEffect } from 'react'
import clsx from 'clsx'
import { Formik, Form, getIn } from 'formik'
import { useRouter } from 'next/router'
import { animateScroll, Link as LinkScroll } from 'react-scroll'
import { isObject, flatMap } from 'lodash'
import SiteContext from '../../context/Site/SiteContext'
import { gaPageView, gaEvent, updateChildValues } from '../../helpers'
import params from '../../calculations/eitc/EITCParams.json'
import routes from '../../templates/helpers/routes'
import Alert from '../../components/Alert'
import FormBuilder from '../../components/FormBuilder'
import Heading from '../../components/Heading'
import HtmlBuilder from '../../components/HtmlBuilder'
import NavButtons from '../../components/NavButtons/NavButtons'
import AutoSubmit from './Form/AutoSubmit'
import { filingStatusFormElements, filingStatusARPAFormElements, filingStatusARPAFormElements21 } from './Form/FormObject'
import Touched from './Form/Touched'
import fsCalc from './Form/helpers/fsCalc'
import { showNumOfDependents, showUs50Percent } from './Form/helpers/fsScenarios'
import disqualifiers from './Validation/disqualifiers'
import validationSchema from './Validation/validationSchema'

const FilingStatus = () => {
  const router = useRouter()

  const { site, siteDispatch, lang, langCode } = useContext(SiteContext)
  const [showErrors, setShowErrors] = useState(false)
  const { year } = site.forms.generalInfo.values

  const initialValues = site.forms.filingStatus.values

  const handleErrorLink = (event, id) => {
    event.preventDefault()
    document.querySelector(`#${id} input`).focus()
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

  const getErrorsObj = (errors, touched) => flattenObj(errors).filter((item) => getIn(touched, item) === true)

  const updateNum = (site, siteDispatch, value, values, isCompleted, errors) => {
    updateChildValues(site, siteDispatch, value, values, isCompleted, errors)
  }

  const isCompleted = (values) => (
    fsCalc(values) !== ''
    && ((showUs50Percent(values, fsCalc(values), site) && values.us50Percent === 'yes')
      || (showNumOfDependents(values, site) && parseInt(values.numOfDependents) === 10))
  )

  const onSubmit = (values) => {
    gaEvent('EITC', 'FS Known - EITC', 'Click', values.fsKnown)
    router.push(routes(langCode, 'eitc').agi, undefined, { shallow: true })
  }

  useEffect(() => {
    animateScroll.scrollToTop({ duration: 0 })

    langCode === 'en'
      ? gaPageView('/app/eitc/filing-status/', 'EITC - Filing Status | Internal Revenue Service')
      : gaPageView(`/app/eitc/filing-status/${langCode}/`, 'EITC - Filing Status | Internal Revenue Service')
  }, [])

  return (
    <div className={clsx('block fade-in')}>
      <Heading
        level="2"
        className="text-2xl font-bold fade-in"
        data-testid="filingStatusTitle"
      >
        {lang('filingStatus.h2.title')}
      </Heading>

      {(!site.forms.generalInfo.completed) && (
        <Alert
          id="filingStatusSkipAheadWarning"
          title={lang('global.heading.attention')}
          type="warning"
          gaLabel="Filing Status Skip Ahead Warning"
        >
          <p>{year !== '' ? lang('filingStatus.p.skipAhead', { ':year': year }) : lang('filingStatus.p.skipAheadNoYear')}</p>
        </Alert>
      )}

      {site.forms.generalInfo.completed && (
        <>
          <p className="fade-in mt-3" data-testid="filingStatusSubtitle">
            {lang('filingStatus.p.subtitle', { ':year': year })}
          </p>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema(site, lang, site.forms.filingStatus.values)}
            onSubmit={(values) => onSubmit(values)}
            validateOnBlur={false}
          >
            {({ values, errors, isSubmitting, validateForm, touched }) => (
              <>
                <Form className="w-full" noValidate>
                  <AutoSubmit isCompleted={isCompleted(values)} />

                  {showErrors && getErrorsObj(errors, touched).length > 0
                    && (
                      <Alert
                        dataTestId="error"
                        className={clsx('lg:w-10/12', (showErrors && getErrorsObj(errors, touched).length > 0) ? '' : 'hidden')}
                        id="error-messages"
                        title={getErrorsObj(errors, touched).length > 1
                          ? lang('global.heading.errorMultiple', { ':num': getErrorsObj(errors, touched).length })
                          : lang('global.heading.errorSingle')}
                        type="error"
                        gaLabel="Filing Status Errors Alert"
                      >
                        <ol className="ml-4 my-2 list list-decimal">
                          {getErrorsObj(errors, touched).map((error, index) => (
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
                                {getIn(errors, getErrorsObj(errors, touched)[index])}
                              </LinkScroll>
                            </li>
                          ))}
                        </ol>
                      </Alert>
                    )
                  }

                  <HtmlBuilder elements={
                    [
                      {
                        key: 'p1',
                        type: 'Paragraph',
                        text: 'global.span.asterisk',
                        className: 'mt-3 fade-in',
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

                  {!params[year].useARPA &&  (
                    <>
                      <Touched form={filingStatusFormElements(values, site, siteDispatch, lang, updateNum, isCompleted, errors)} />
                      <FormBuilder options={filingStatusFormElements(values, site, siteDispatch, lang, updateNum, isCompleted, errors)} />
                    </>
                  )}

                  {params[year].useARPA && year != "2021" &&(
                    <>
                      <Touched form={filingStatusFormElements(values, site, siteDispatch, lang, updateNum, isCompleted, errors)} />
                      <FormBuilder options={filingStatusARPAFormElements(values, site, siteDispatch, lang, updateNum, isCompleted, errors)} />
                    </>
                  )}

                    {/* added new html builder for 2021 filing status form */}
                    {params[year].useARPA && year == "2021" && (
                    <>
                      <Touched form={filingStatusFormElements(values, site, siteDispatch, lang, updateNum, isCompleted, errors)} />
                      <FormBuilder options={filingStatusARPAFormElements21(values, site, siteDispatch, lang, updateNum, isCompleted, errors)} />
                    </>
                  )}
                  {Object.keys(disqualifiers(values, site, langCode)).length !== 0 && (
                    <Alert
                      id="disqualifiersWarning"
                      title={lang('global.heading.eitcNoQualify')}
                      type="warning"
                      gaLabel="Filing Status Disqualifiers Warning"
                      dataTestId="warning"
                    >
                      {Object.keys(disqualifiers(values, site, langCode)).map((item, index) => (
                        <div key={index}>{disqualifiers(values, site, langCode)[item].elements}</div>
                      ))}
                    </Alert>
                  )}

                  <NavButtons
                    nextOnclick={() => handleErrorCheck(validateForm)}
                    backOnclick={() => router.push(routes(langCode, 'eitc').generalInfo, undefined, { shallow: true })}
                    backText={lang('global.button.back')}
                    nextText={lang('global.button.next')}
                    backDisable={isSubmitting}
                    nextDisable={isSubmitting || Object.keys(disqualifiers(values, site, langCode)).length > 0}
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

export default FilingStatus
