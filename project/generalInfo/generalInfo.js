import { useState, useContext, useEffect } from 'react'
import clsx from 'clsx'
import { Formik, Form, getIn } from 'formik'
import { useRouter } from 'next/router'
import { animateScroll, Link as LinkScroll } from 'react-scroll'
import { isObject, flatMap } from 'lodash'
import SiteContext from '../../context/Site/SiteContext'
import { gaPageView, gaEvent } from '../../helpers'
import routes from '../../templates/helpers/routes'
import params from '../../calculations/eitc/EITCParams.json'
import Alert from '../../components/Alert'
import FormBuilder from '../../components/FormBuilder'
import Heading from '../../components/Heading'
import HtmlBuilder from '../../components/HtmlBuilder'
import NavButtons from '../../components/NavButtons/NavButtons'
import RadioGroup from '../../components/Radio/RadioGroup'
import AutoSubmit from './Form/AutoSubmit'
import { generalInfoFormElements, generalInfoARPAFormElements, showStudent, showQualifiedHomelessYouth,generalInfoARPAFormElements21 } from './Form/FormObject'
import Touched from '../filingStatus/Form/Touched'
import * as ToolTips from './Structure/ToolTipsHtml'
import disqualifiers from './Validation/disqualifiers'
import validationSchema from './Validation/validationSchema'
import YearModal from './Structure/YearModal'
import resetForms from './helpers/resetForms'

const GeneralInfo = () => {
  const router = useRouter()

  const { site, siteDispatch, lang, langCode } = useContext(SiteContext)
  const [showErrors, setShowErrors] = useState(false)
  const [previousYearValue, setPreviousYearValue] = useState(site.forms.generalInfo.values.year)
  const [showYearModal, setShowYearModal] = useState(false)
  const yearsArray = Object.keys(params).reverse()

  const initialValues = site.forms.generalInfo.values

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

  const getYearOptions = (lang, langCode, yearsArray) => (yearsArray.map((year) => ({
    id: `year-${year}`,
    value: year,
    label: year,
  }))
  )

  const isCompleted = (values) => {
    const { year, citizen, validSSN, claimedAsDependent, age, qualifiedHomelessYouth, student } = values
    if (params[year]?.useARPA && values.year == "2021") {
      if (age === '17under' || age === '24over') {
        return (
          year !== ''
          && citizen === 'yes'
          && validSSN === 'yes'
          && claimedAsDependent === 'no'
          && age !== ''
          && Object.keys(disqualifiers(values, langCode)).length === 0
        )
      }

      if (age === '18') {
        return (
          year !== ''
          && citizen === 'yes'
          && validSSN === 'yes'
          && claimedAsDependent === 'no'
          && showQualifiedHomelessYouth(values) && qualifiedHomelessYouth !== ''
          && Object.keys(disqualifiers(values, langCode)).length === 0
        )
      }

      if (age === '19-23') {
        return (
          year !== ''
          && citizen === 'yes'
          && validSSN === 'yes'
          && claimedAsDependent === 'no'
          && ((showQualifiedHomelessYouth(values) && qualifiedHomelessYouth === 'yes') || (showStudent(values) && student !== ''))
          && Object.keys(disqualifiers(values, langCode)).length === 0
        )
      }

      return false
    }
    
    return (
      year !== ''
      && citizen === 'yes'
      && validSSN === 'yes'
      && claimedAsDependent === 'no'
      && age !== ''
      && Object.keys(disqualifiers(values, langCode)).length === 0
    )
  }

  const onSubmit = (values) => {
    gaEvent('EITC', 'EITC Year', 'Selected', values.year)

    router.push(routes(langCode, 'eitc').filingStatus, undefined, { shallow: true })
  }

  useEffect(() => {
    document.body.style.overflow = showYearModal ? 'hidden' : 'visible'
  }, [showYearModal])

  useEffect(() => {
    animateScroll.scrollToTop({ duration: 0 })

    langCode === 'en'
      ? gaPageView('/app/eitc/', 'EITC - General Info | Internal Revenue Service')
      : gaPageView(`/app/eitc/${langCode}/`, 'EITC - General Info | Internal Revenue Service')
  }, [])

  return (
    <div className={clsx('block fade-in')}>
      <Heading
        level="2"
        className="text-2xl font-bold fade-in"
        data-testid="generalInfoTitle"
      >
        {lang('generalInfo.h2.title')}
      </Heading>

      <p className="fade-in mt-3" data-testid="generalInfoSubtitle">
        {lang('generalInfo.p.subtitle')}
      </p>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema(lang, site.forms.generalInfo.values)}
        onSubmit={(values) => onSubmit(values)}
        validateOnBlur={false}
      >
        {({ values, errors, isSubmitting, validateForm, touched, setFieldValue, setValues }) => (
          <>
            <Form className="w-full" noValidate>
              <AutoSubmit isCompleted={isCompleted} setPreviousYearValue={setPreviousYearValue} />

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
                    gaLabel="General Info Errors Alert"
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

              <RadioGroup
                label={lang('generalInfo.legend.year')}
                name="year"
                id="year"
                required
                className="mt-6"
                dataTestId="year"
                onChange={() => {
                  values.year !== '' && setShowYearModal(true)
                }}
                helpTip={{
                  page: 'generalInfo',
                  expanded: site.forms.generalInfo.helpTips.year.open,
                  ariaLabel: 'Year - Help Tip',
                  elements: () => ToolTips.yearToolTip(),
                }}
                options={getYearOptions(lang, langCode, yearsArray)}
              />

              {!params[values.year]?.useARPA && (
                <>
                  <Touched form={generalInfoFormElements(values, site, lang, langCode, yearsArray)} />
                  <FormBuilder
                    options={generalInfoFormElements(values, site, lang, langCode, yearsArray)}
                  />
                </>
              )}

                 
              {params[values.year]?.useARPA && values.year != "2021" && (
                <>
                  <Touched form={generalInfoARPAFormElements(values, site, lang, langCode, yearsArray)} />
                  <FormBuilder
                    options={generalInfoARPAFormElements(values, site, lang, langCode, yearsArray)}
                  />
                </>
              )}

              {/* added new html builder for the 2021 form  */}
                {params[values.year]?.useARPA && values.year == "2021" && (
                <>
                  <Touched form={generalInfoARPAFormElements21(values, site, lang, langCode, yearsArray)} />
                  <FormBuilder
                    options={generalInfoARPAFormElements21(values, site, lang, langCode, yearsArray)}
                  />
                </>
              )}

              {Object.keys(disqualifiers(values, langCode)).length !== 0 && (
                <Alert
                  id="disqualifierWarning"
                  title={lang('global.heading.eitcNoQualify')}
                  type="warning"
                  gaLabel="General Info Disqualifer Warning"
                >
                  {Object.keys(disqualifiers(values, langCode)).map((item, index) => (
                    <div key={index} data-testid={item.name}>
                      {disqualifiers(values, langCode)[item].elements}
                    </div>
                  ))}
                </Alert>
              )}

              {showYearModal && (
                <YearModal
                  setShowEitcModal={setShowYearModal}
                  lang={lang}
                  title={lang('global.heading.attention')}
                  handleConfirm={() => {
                    resetForms(site, siteDispatch)
                    setValues({
                      ...values,
                      citizen: '',
                      validSSN: '',
                      foreignIncome: '',
                      claimedAsDependent: '',
                      age: '',
                      qualifiedHomelessYouth: '',
                      student: '',
                    }, false)

                    setShowYearModal(false)
                  }}
                  handleClose={() => {
                    setFieldValue('year', previousYearValue)

                    setShowYearModal(false)

                    setTimeout(() => {
                      const elem = document.getElementById(`year-${previousYearValue}`)
                      elem.focus()
                    }, 100)
                  }}
                />
              )}

              <NavButtons
                nextText={lang('global.button.next')}
                nextDisable={isSubmitting || Object.keys(disqualifiers(values, langCode)).length > 0}
                nextOnly
                nextOnclick={() => handleErrorCheck(validateForm)}
              />
            </Form>
          </>
        )}
      </Formik>
    </div>
  )
}

export default GeneralInfo
