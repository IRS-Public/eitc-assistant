import { useContext, useEffect, useState } from 'react'
import clsx from 'clsx'
import { Formik, Form, FieldArray, getIn } from 'formik'
import { useRouter } from 'next/router'
import { animateScroll, Link as LinkScroll } from 'react-scroll'
import { isObject, flatMap } from 'lodash'
import SiteContext from '../../context/Site/SiteContext'
import { gaPageView } from '../../helpers'
import routes from '../../templates/helpers/routes'
import Accordion, { AccordionItem, AccordionItemBody, AccordionItemTrigger } from '../../components/Accordion'
import Alert from '../../components/Alert'
import FormBuilder from '../../components/FormBuilder'
import Heading from '../../components/Heading'
import HtmlBuilder from '../../components/HtmlBuilder'
import NavButtons from '../../components/NavButtons/NavButtons'
import RadioGroup from '../../components/Radio/RadioGroup'
import AutoSubmit from './Form/AutoSubmit'
import { showSpouseAge, showDeceasedSpouseAge } from '../filingStatus/Form/helpers/fsScenarios'
import { childFormElements, showAge, showValidSSN, showAnotherValidChild } from './Form/FormObject'
import Touched from './Form/Touched'
import disqualifiers from './Validation/disqualifiers'
import * as AlertsHtml from './Structure/AlertsHtml'
import fsCalc from '../filingStatus/Form/helpers/fsCalc'
import calcAgiForEitc from '../../calculations/agi/calcAgiForEitc'
import credit from '../../calculations/eitc/credit'
import * as ToolTips from './Structure/ToolTipsHtml'
import validationSchema from './Validation/validationSchema'
import accordionOpenErrors from './helpers/accordionOpenErrors'
import params from '../../calculations/eitc/EITCParams.json'
import Modal from '../../components/Modal/Modal'
import Button from '../../components/Button'

const QualifyingChildren = () => {
  const router = useRouter()

  const { site, siteDispatch, lang, langCode } = useContext(SiteContext)
  const { year, age, qualifiedHomelessYouth, student } = site.forms.generalInfo.values
  const {
    numOfDependents,
    spouseAge,
    spouseQualifiedHomelessYouth,
    spouseStudent,
    deceasedSpouseAge,
    deceasedSpouseQualifiedHomelessYouth,
    deceasedSpouseStudent,
  } = site.forms.filingStatus.values
  const fsValues = site.forms.filingStatus.values
  const { agi, earned, deductions } = calcAgiForEitc(site.forms.agi.values)
  const { accordionOpenArr } = site.forms.qualifyingChildren
  const [qualifyingChildren, setQualifyingChildren] = useState([])
  const [showIncompleteChildModal, setShowIncompleteChildModal] = useState(false)
  const [showRemoveChildModal, setShowRemoveChildModal] = useState(false)
  const [showMaxChildrenModal, setShowMaxChildrenModal] = useState(false)
  const [removeChildParams, setRemoveChildParams] = useState({
    child: {},
    values: {},
    index: 0,
    remove: () => { },
    push: () => { }
  })
  const [removeChildParamChildren, setRemoveChildParamChildren] = useState()
  const [removeChildSuccessful, setRemoveChildSuccessful] = useState(false)
  const [disableRadio, setDisableRadio] = useState(false)
  const [showErrors, setShowErrors] = useState(false)
  const total = earned - deductions < 0 ? 0 : earned - deductions
  const filingStatus = fsCalc(fsValues)
  const setAccordionOpenArr = (newAccordionOpenArr) => siteDispatch({ type: 'UPDATE_ACCORDION_OPEN', payload: newAccordionOpenArr })

  const initialValues = site.forms.qualifyingChildren.values
  const emptyChild = {
    childName: '',
    live51Pct: '',
    claimOther: '',
    claimOtherConfirm: '',
    fileJoint: '',
    fileJointConfirm: '',
    permanentlyDisabled: '',
    relationship: '',
    age: '',
    student: '',
    younger: '',
    validSSN: '',
  }

  const prevPagesCompleted = () =>
    site.forms.generalInfo.completed && site.forms.filingStatus.completed && site.forms.agi.completed

  const handleErrorLink = (event, id) => {
    event.preventDefault()

    const radioDiv = document.getElementById(id)
    radioDiv.querySelector('input').focus()
  }

  const handleErrorCheck = async (validateForm, values, showAccordion) => {
    try {
      const results = await validateForm()

      if (Object.keys(results).length > 0) {
        setTimeout(() => {
          accordionOpenErrors(values, results, setAccordionOpenArr, accordionOpenArr, showAccordion)
        }, 300)

        incompleteChildModalOpen(values)
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

  const getNumOfQC = () => {
    let final = 0

    qualifyingChildren.forEach((item) => {
      item && final++
    })

    return final
  }

  const qcMaxLimitIndex = () => {
    let lastIndex = null
    let numOfQC = 0

    qualifyingChildren.forEach((child, index) => {
      if (child === true && numOfQC < 2) {
        numOfQC++
      } else if (child === true && numOfQC === 2) {
        lastIndex = index
        numOfQC++
      }
    })

    return lastIndex
  }

  const meetAgeRequirementNoQC = () => {
    let meetsAgeRequirement = false

    if (params[year].useARPA && year == "2021") {
      if (filingStatus === 'married') {
        meetsAgeRequirement = ((age === '24over'
          || ((age === '19-23' || age === '18') && qualifiedHomelessYouth === 'yes')
          || (age === '19-23' && qualifiedHomelessYouth === 'no' && student === 'no')))
          || (showSpouseAge(fsValues, site) && (spouseAge === '24over'
            || ((spouseAge === '19-23' || spouseAge === '18') && spouseQualifiedHomelessYouth === 'yes')
            || (spouseAge === '19-23' && spouseQualifiedHomelessYouth === 'no' && spouseStudent === 'no')))
          || (showDeceasedSpouseAge(fsValues, site) && (deceasedSpouseAge === '24over'
            || ((deceasedSpouseAge === '19-23' || deceasedSpouseAge === '18') && deceasedSpouseQualifiedHomelessYouth === 'yes')
            || (deceasedSpouseAge === '19-23' && deceasedSpouseQualifiedHomelessYouth === 'no' && deceasedSpouseStudent === 'no')))
      } else {
        meetsAgeRequirement = (age === '24over'
          || ((age === '19-23' || age === '18') && qualifiedHomelessYouth === 'yes')
          || (age === '19-23' && qualifiedHomelessYouth === 'no' && student === 'no'))
      }
    }

    if (params[year].useARPA && year != "2021") {
      if (filingStatus === 'married') {
        meetsAgeRequirement = ((age === 'age-25-64'))
          || (showSpouseAge(fsValues, site) && (spouseAge === 'age-25-64'))
          || (showDeceasedSpouseAge(fsValues, site) && (deceasedSpouseAge === 'age-25-64'))
      } else {
        meetsAgeRequirement = (age === 'age-25-64')
      }
    } else if (!params[year].useARPA) {
      if (filingStatus === 'married') {
        meetsAgeRequirement = (age === 'age-25-64' || spouseAge === 'spouseAge-25-64')
      } else {
        meetsAgeRequirement = age === 'age-25-64'
      }
    }

    return filingStatus !== 'married-separate' && meetsAgeRequirement
  }

  const allHaveDQs = (values) => {
    let disqualifiedChild = 0
    let completedChildEntries = 0

    values.children.forEach((child, index) => {
      if (Object.keys(disqualifiers(values, index, site, showYoungerQuestion, filingStatus, spouseAge, deceasedSpouseAge, qualifyUntilSSN)).length !== 0) disqualifiedChild++
      if (Object.values(child).some((val) => val !== "")) completedChildEntries++
    })

    return (completedChildEntries > 0 && (disqualifiedChild === completedChildEntries))
  }

  const qualifyUntilSSN = (values, index) => (
    (values.children[index].live51Pct === 'yes'
      && values.children[index].claimOther === 'no'
      && values.children[index].fileJoint === 'no'
      && values.children[index].permanentlyDisabled === 'yes'
      && (values.children[index].relationship === 'qualifyingRelationship1'
        || values.children[index].relationship === 'qualifyingRelationship2'
        || values.children[index].relationship === 'qualifyingRelationship3'))
    || (values.children[index].live51Pct === 'yes'
      && values.children[index].claimOther === 'yes'
      && values.children[index].claimOtherConfirm === 'yes'
      && values.children[index].fileJoint === 'no'
      && values.children[index].permanentlyDisabled === 'yes'
      && (values.children[index].relationship === 'qualifyingRelationship1'
        || values.children[index].relationship === 'qualifyingRelationship2'
        || values.children[index].relationship === 'qualifyingRelationship3'))
    || (values.children[index].live51Pct === 'yes'
      && values.children[index].claimOther === 'no'
      && values.children[index].fileJoint === 'yes'
      && values.children[index].fileJointConfirm === 'yes'
      && values.children[index].permanentlyDisabled === 'yes'
      && (values.children[index].relationship === 'qualifyingRelationship1'
        || values.children[index].relationship === 'qualifyingRelationship2'
        || values.children[index].relationship === 'qualifyingRelationship3'))
    || (values.children[index].live51Pct === 'yes'
      && values.children[index].claimOther === 'yes'
      && values.children[index].claimOtherConfirm === 'yes'
      && values.children[index].fileJoint === 'yes'
      && values.children[index].fileJointConfirm === 'yes'
      && values.children[index].permanentlyDisabled === 'yes'
      && (values.children[index].relationship === 'qualifyingRelationship1'
        || values.children[index].relationship === 'qualifyingRelationship2'
        || values.children[index].relationship === 'qualifyingRelationship3'))
    || (values.children[index].live51Pct === 'yes'
      && values.children[index].claimOther === 'no'
      && values.children[index].fileJoint === 'no'
      && values.children[index].permanentlyDisabled === 'no'
      && (values.children[index].relationship === 'qualifyingRelationship1'
        || values.children[index].relationship === 'qualifyingRelationship2'
        || values.children[index].relationship === 'qualifyingRelationship3')
      && ((values.children[index].age === 'age-under18' && !showYoungerQuestion(values, index))
        || (values.children[index].age === 'age-under18'
          && showYoungerQuestion(values, index) && values.children[index].younger === 'yes')))
    || (values.children[index].live51Pct === 'yes'
      && values.children[index].claimOther === 'yes'
      && values.children[index].claimOtherConfirm === 'yes'
      && values.children[index].fileJoint === 'no'
      && values.children[index].permanentlyDisabled === 'no'
      && (values.children[index].relationship === 'qualifyingRelationship1'
        || values.children[index].relationship === 'qualifyingRelationship2'
        || values.children[index].relationship === 'qualifyingRelationship3')
      && ((values.children[index].age === 'age-under18' && !showYoungerQuestion(values, index))
        || (values.children[index].age === 'age-under18'
          && showYoungerQuestion(values, index) && values.children[index].younger === 'yes')))
    || (values.children[index].live51Pct === 'yes'
      && values.children[index].claimOther === 'no'
      && values.children[index].fileJoint === 'yes'
      && values.children[index].fileJointConfirm === 'yes'
      && values.children[index].permanentlyDisabled === 'no'
      && (values.children[index].relationship === 'qualifyingRelationship1'
        || values.children[index].relationship === 'qualifyingRelationship2'
        || values.children[index].relationship === 'qualifyingRelationship3')
      && ((values.children[index].age === 'age-under18' && !showYoungerQuestion(values, index))
        || (values.children[index].age === 'age-under18'
          && showYoungerQuestion(values, index) && values.children[index].younger === 'yes')))
    || (values.children[index].live51Pct === 'yes'
      && values.children[index].claimOther === 'yes'
      && values.children[index].claimOtherConfirm === 'yes'
      && values.children[index].fileJoint === 'yes'
      && values.children[index].fileJointConfirm === 'yes'
      && values.children[index].permanentlyDisabled === 'no'
      && (values.children[index].relationship === 'qualifyingRelationship1'
        || values.children[index].relationship === 'qualifyingRelationship2'
        || values.children[index].relationship === 'qualifyingRelationship3')
      && ((values.children[index].age === 'age-under18' && !showYoungerQuestion(values, index))
        || (values.children[index].age === 'age-under18'
          && showYoungerQuestion(values, index) && values.children[index].younger === 'yes')))
    || (values.children[index].live51Pct === 'yes'
      && values.children[index].claimOther === 'no'
      && values.children[index].fileJoint === 'no'
      && values.children[index].permanentlyDisabled === 'no'
      && (values.children[index].relationship === 'qualifyingRelationship1'
        || values.children[index].relationship === 'qualifyingRelationship2'
        || values.children[index].relationship === 'qualifyingRelationship3')
      && ((values.children[index].age === 'age-19-23' && !showYoungerQuestion(values, index))
        || (values.children[index].age === 'age-19-23' && showYoungerQuestion(values, index) && values.children[index].younger === 'yes'))
      && values.children[index].student === 'yes')
    || (values.children[index].live51Pct === 'yes'
      && values.children[index].claimOther === 'yes'
      && values.children[index].claimOtherConfirm === 'yes'
      && values.children[index].fileJoint === 'no'
      && values.children[index].permanentlyDisabled === 'no'
      && (values.children[index].relationship === 'qualifyingRelationship1'
        || values.children[index].relationship === 'qualifyingRelationship2'
        || values.children[index].relationship === 'qualifyingRelationship3')
      && ((values.children[index].age === 'age-19-23' && !showYoungerQuestion(values, index))
        || (values.children[index].age === 'age-19-23' && showYoungerQuestion(values, index) && values.children[index].younger === 'yes'))
      && values.children[index].student === 'yes')
    || (values.children[index].live51Pct === 'yes'
      && values.children[index].claimOther === 'no'
      && values.children[index].fileJoint === 'yes'
      && values.children[index].fileJointConfirm === 'yes'
      && values.children[index].permanentlyDisabled === 'no'
      && (values.children[index].relationship === 'qualifyingRelationship1'
        || values.children[index].relationship === 'qualifyingRelationship2'
        || values.children[index].relationship === 'qualifyingRelationship3')
      && ((values.children[index].age === 'age-19-23' && !showYoungerQuestion(values, index))
        || (values.children[index].age === 'age-19-23' && showYoungerQuestion(values, index) && values.children[index].younger === 'yes'))
      && values.children[index].student === 'yes')
    || (values.children[index].live51Pct === 'yes'
      && values.children[index].claimOther === 'yes'
      && values.children[index].claimOtherConfirm === 'yes'
      && values.children[index].fileJoint === 'yes'
      && values.children[index].fileJointConfirm === 'yes'
      && values.children[index].permanentlyDisabled === 'no'
      && (values.children[index].relationship === 'qualifyingRelationship1'
        || values.children[index].relationship === 'qualifyingRelationship2'
        || values.children[index].relationship === 'qualifyingRelationship3')
      && ((values.children[index].age === 'age-19-23' && !showYoungerQuestion(values, index))
        || (values.children[index].age === 'age-19-23' && showYoungerQuestion(values, index) && values.children[index].younger === 'yes'))
      && values.children[index].student === 'yes')
  )

  const showYoungerQuestion = (values, index) => {
    let shouldShow = false

    if (params[year].useARPA && year == "2021") {
      if (filingStatus === 'married') {
        if (values.children[index].age === 'age-under18') {
          shouldShow = (age === '17under' || age === '18')
            && ((showSpouseAge(site.forms.filingStatus.values, site) && (spouseAge === '17under' || spouseAge === '18'))
              || (showDeceasedSpouseAge(site.forms.filingStatus.values, site)
                && (deceasedSpouseAge === '17under' || deceasedSpouseAge === '18')))
        } else if (values.children[index].age === 'age-19-23') {
          shouldShow = age === '19-23'
            || ((showSpouseAge(site.forms.filingStatus.values, site) && spouseAge === '19-23')
              || (showDeceasedSpouseAge(site.forms.filingStatus.values, site) && deceasedSpouseAge === '19-23'))
        }
      } else {
        if (values.children[index].age === 'age-under18') {
          shouldShow = (age === '17under' || age === '18')
        } else if (values.children[index].age === 'age-19-23') {
          shouldShow = age === '19-23'
        }
      }
    }

    if (params[year].useARPA && year != "2021") {
      if (filingStatus === 'married') {
        if (values.children[index].age === 'age-under18') {
          shouldShow = (age === 'under24')
            && ((showSpouseAge(site.forms.filingStatus.values, site) && (spouseAge === 'under24'))
              || (showDeceasedSpouseAge(site.forms.filingStatus.values, site)
                && (deceasedSpouseAge === 'under24')))
        } else if (values.children[index].age === 'age-19-23') {
          shouldShow = age === '19-23'
            || ((showSpouseAge(site.forms.filingStatus.values, site) && spouseAge === 'over65')
              || (showDeceasedSpouseAge(site.forms.filingStatus.values, site) && deceasedSpouseAge === 'over65'))
        }
      } else {
        if (values.children[index].age === 'age-under18') {
          shouldShow = (age === 'under24')
        } else if (values.children[index].age === 'age-19-23') {
          shouldShow = age === 'over65'
        }
      }
    } else if (!params[year].useARPA) {
      if (filingStatus === 'married') {
        if (values.children[index].age === 'age-under18') {
          shouldShow = age === 'under24'
            && ((showSpouseAge(site.forms.filingStatus.values, site) && spouseAge === 'spouseAge-under24')
              || (showDeceasedSpouseAge(site.forms.filingStatus.values, site) && deceasedSpouseAge === 'deceasedSpouseAge-under24'))
        } else if (values.children[index].age === 'age-19-23') {
          shouldShow = age === 'under24'
            && ((showSpouseAge(site.forms.filingStatus.values, site) && spouseAge === 'spouseAge-under24')
              || (showDeceasedSpouseAge(site.forms.filingStatus.values, site) && deceasedSpouseAge === 'deceasedSpouseAge-under24'))
        }
      } else {
        if (values.children[index].age === 'age-under18') {
          shouldShow = age === 'under24'
        } else if (values.children[index].age === 'age-19-23') {
          shouldShow = age === 'under24'
        }
      }
    }

    return shouldShow && showAge(values, index)
  }

  const remainingQC = (values) => {
    let num = values.children.length

    values.children.forEach((child, index) => {
      if (Object.keys(disqualifiers(values, index, site, showYoungerQuestion, filingStatus, spouseAge, deceasedSpouseAge, qualifyUntilSSN)).length !== 0) {
        num--
      }
    })

    return num
  }

  const maxLimit = (values) => params[year].EITCMaxLimits[filingStatus !== 'married'
    ? 'single' : 'married'][remainingQC(values) > 3 ? 3 : remainingQC(values)]

  const showUs50PercentQuestion = (values) => (allHaveDQs(values)
    && calcAgiForEitc(site.forms.agi.values).agi < maxLimit(values)
    && credit(year, 0, filingStatus, total, agi) > 0
    && meetAgeRequirementNoQC()
  )

  const noValidSSNCondition = (values, index) => params[year].useARPA && qualifyUntilSSN(values, index)
    && showValidSSN(values, index, qualifyUntilSSN)
    && values.children[index].validSSN === 'no'

  const noOtherValidChild = (values, index) => params[year].useARPA && qualifyUntilSSN(values, index)
    && showAnotherValidChild(values, index, qualifyUntilSSN)
    && values.children[0].anotherValidChild === 'no'

  const isQualifyingDependent = (values, index) => qualifyUntilSSN(values, index) && values.children[index].validSSN === 'yes'

  const isQualifyingOrDisqualified = (values, index) => Object.keys(disqualifiers(values, index, site, showYoungerQuestion, filingStatus, spouseAge, deceasedSpouseAge, qualifyUntilSSN)).length > 0
    || isQualifyingDependent(values, index)
    || noValidSSNCondition(values, index)

  const showAccordion = (i, values) => (qcMaxLimitIndex() === null || i <= qcMaxLimitIndex()) && (i === 0
    || (isQualifyingDependent(values, i - 1)
      || (showValidSSN(values, i - 1, qualifyUntilSSN) && values.children[i - 1].validSSN !== '' && showAnotherValidChild(values, i - 1, qualifyUntilSSN) && values.children[i - 1].anotherValidChild === 'yes')
      || Object.keys(disqualifiers(values, i - 1, site, showYoungerQuestion, filingStatus, spouseAge, deceasedSpouseAge, qualifyUntilSSN)).length > 0))

  const isCompleted = (values, errors) => {
    const isAllTrue = (currentValue) => currentValue === true

    let numOfQC = 0
    const qcArr = values.children.map((child, index) => isQualifyingDependent(values, index))
    qcArr.forEach((item) => {
      item && numOfQC++
    })

    const allAnsweredArr = values.children.map((_child, index) => {
      if (isQualifyingDependent(values, index)) {
        return true
      }

      if (params[year].useARPA && showValidSSN(values, index, qualifyUntilSSN) && values.children[index].validSSN !== '' 
        && !(values.children[index].validSSN === 'no' && noOtherValidChild(values, index))) {
        return true
      }
    })

    // check if at least 1 child is completed, qualifying or all claimed children are disqualifying (2023 update)
    const allAnswered = allAnsweredArr.some(isAllTrue) || allHaveDQs(values)

    if (showUs50PercentQuestion(values)) {
      return (
        (Object.keys(errors).length === 0 || !showErrors)
        && values.us50Percent === 'yes'
        && !(allHaveDQs(values)
          && credit(year, 0, filingStatus, total, agi) > 0
          && !meetAgeRequirementNoQC())
        && calcAgiForEitc(site.forms.agi.values).agi < maxLimit(values)
        && (numOfDependents === '0'
          || (showUs50PercentQuestion(values) && values.us50Percent === 'yes')
          || (numOfQC >= 3 || allAnswered))
      )
    }

    return (
      (Object.keys(errors).length === 0 || !showErrors)
      && !(allHaveDQs(values)
        && credit(year, 0, filingStatus, total, agi) > 0
        && !meetAgeRequirementNoQC())
      && calcAgiForEitc(site.forms.agi.values).agi < maxLimit(values)
      && (numOfDependents === '0'
        || (showUs50PercentQuestion(values) && values.us50Percent === 'yes')
        || (numOfQC >= 3 || allAnswered))
    )
  }

  const ignoreValidation = (values, index) => {
    // check if current child is not index 0 AND collapsed AND not in progress AND next child is not in progress/completed
    if (index === 0) return false
    const nextIndex = index === 9 ? 9 : index + 1

    return accordionOpenArr[index] === false
      && !inProgress(values.children[index], values, index)
      && !inProgress(values.children[nextIndex], values, nextIndex)
  }


  const inProgress = (child, values, index) => !isQualifyingOrDisqualified(values, index)
    && Object.values(child).some((val) => val !== '')

  const getAccordionTitle = (child, values, index) => {
    if (child.childName && isQualifyingOrDisqualified(values, index)) return child.childName
    if (index !== 0) return lang('qualifyingChildren.h2.anotherChildAccordionTitle')
    return lang('qualifyingChildren.h2.childAccordionTitle')
  }

  const showRemoveChildButton = (values, index) => isQualifyingOrDisqualified(values, index)

  function incompleteChildModalContainer(setTouched, child, values, index) {
    return (
      <div>
        <Heading
          level="1"
          className="text-2xl font-bold mb-4 break-normal">
          {lang("qualifyingChildren.h2.incompleteChildHeader")}
        </Heading>
        <p className="fade-in mb-8 font-normal break-normal" >
          {lang("qualifyingChildren.p.incompleteChildParagraph")}
        </p>
        <p className="fade-in mb-8 font-normal break-normal" >
          {lang("qualifyingChildren.p.incompleteChildParagraphTwo")}
        </p>
        <Button
          className="mr-4 md: mb-4"
          type="button"
          data-testid="cancelButton"
          id="cancelButton"
          secondary
          aria-label="Cancel"
          onClick={() => {
            incompleteChildModalClose()

          }}
        >
          {lang("global.btn.cancel")}
        </Button>
        <Button
          type="button"
          data-testid="incompleteChildButton"
          id="incompleteChildButton"
          aria-label="incompleteChild"
          onClick={() => {
            incompleteChildModalClose()
            cancelChild(setTouched, child, values, index)
            onSubmit()
          }}
        >
          {lang("qualifyingChildren.button.incompleteChildNext")}
        </Button>
      </div>
    )
  }


  function incompleteChildModalClose() {
    setShowIncompleteChildModal(false)
  }

  function incompleteChildModalOpen(values) {
    // check if incomplete child AND at least 1 qualifying child exists
    if (values.children.some((child, index) => inProgress(child, values, index))
      && values.children.some((_child, index) => isQualifyingDependent(values, index))) {
      setShowIncompleteChildModal(true)
    }
  }

  function removeChildModalContainer() {
    return (
      <div>
        <Heading
          level="1"
          className="text-2xl font-bold mb-4 break-all">
          {removeChildParams.child.childName
            ? lang('qualifyingChildren.h2.removeChildHeader', { ':name': removeChildParams.child.childName })
            : lang('qualifyingChildren.h2.removeChildHeader2')}
        </Heading>
        <p className="fade-in mb-8" >
          {lang("qualifyingChildren.p.removeChildParagraph")}
        </p>
        <Button
          className="mr-4 md: mb-4"
          type="button"
          data-testid="cancelButton"
          id="cancelButton"
          secondary
          aria-label="Cancel"
          onClick={() => {
            removeChildModalClose()
          }}
        >
          {lang("global.btn.cancel")}
        </Button>
        <Button
          type="button"
          data-testid="removeChildButton"
          id="removeChildButton"
          aria-label="removeChild"
          onClick={() => {
            removeChildModalClose()
            removeChild(removeChildParamChildren, removeChildParams.child, removeChildParams.values, removeChildParams.index, removeChildParams.remove, removeChildParams.push)
            setRemoveChildSuccessful(true)
          }}
        >
          {lang("qualifyingChildren.button.removeChildBttRemoval")}
        </Button>
      </div>
    )
  }


  const showMaxChildrenModalContainer = () => {
    return (
      <div>
        <Heading
          level="1"
          className="text-2xl font-bold mb-4 break-word">
          {lang("qualifyingChildren.h2.maxChildernHeader")}
        </Heading>
        <p className="fade-in mb-8" >
          {lang("qualifyingChildren.p.maxChildernParagraph")}
        </p>
        <p className="fade-in mb-8" >
          {lang("qualifyingChildren.p.maxChildernParagraph2")}
        </p>
        <Button
          className="mr-4 md: mb-4"
          type="button"
          data-testid="closeButton"
          id="closeButton"
          aria-label="Close"
          onClick={() => {
            maxChildrenModalClose()
          }}
        >
          {lang("global.btn.close")}
        </Button>
      </div>
    )
  }

  function removeChildModalClose() {
    setShowRemoveChildModal(false)
  }

  function maxChildrenModalClose() {
    setDisableRadio(false)
    setShowMaxChildrenModal(false)
  }

  function cancelChild(setTouched, setFieldValue, valuesChildren, index) {
    setTouched({}, false)
    const newAccordionOpenArr = [...accordionOpenArr]
    if (newAccordionOpenArr[1] === true) newAccordionOpenArr[index] = false

    setFieldValue(valuesChildren[index] = emptyChild)

    const newChildrensArr = [...valuesChildren]
    newChildrensArr[index] = emptyChild

    const newForms = {
      ...site.forms,
      filingStatus: {
        ...site.forms.filingStatus,
        completed: true,
        values: {
          ...site.forms.filingStatus.values,
        }
      },
      qualifyingChildren: {
        ...site.forms.qualifyingChildren,
        completed: isCompleted,
        accordionOpenArr: newAccordionOpenArr,
        values: {
          ...site.forms.qualifyingChildren.values,
          children: newChildrensArr,
        },
      }
    }

    siteDispatch({
      type: 'UPDATE_FORMS',
      payload: newForms,
    })

  }

  function removeChild(valuesChildren, child, values, index, remove, push) {
    remove(index)
    push(emptyChild)

    const newAccordionOpenArr = [...accordionOpenArr]
    if (newAccordionOpenArr[1] === true) {
      newAccordionOpenArr.splice(index, 1)
      newAccordionOpenArr.push(false)
    }

    const newChildrensArr = [...valuesChildren]
    newChildrensArr.splice(index, 1)
    newChildrensArr.push(emptyChild)

    const newForms = {
      ...site.forms,
      filingStatus: {
        ...site.forms.filingStatus,
        completed: true,
        values: {
          ...site.forms.filingStatus.values,
        }
      },
      qualifyingChildren: {
        ...site.forms.qualifyingChildren,
        completed: isCompleted,
        accordionOpenArr: newAccordionOpenArr,
        values: {
          ...site.forms.qualifyingChildren.values,
          children: newChildrensArr,
        },
      }
    }

    siteDispatch({
      type: 'UPDATE_FORMS',
      payload: newForms,
    })
  }

  const onSubmit = () => {
    router.push(routes(langCode, 'eitc').results, undefined, { shallow: true })
  }

  // Max amount of children reached and is non qualifying
  const enableMaxChildrenModal = (e, values, index) => {
    if (getNumOfQC() >= 3 && !isQualifyingDependent(values, index)) {
      setDisableRadio(true)
      e.disabled = true;
      e.currentTarget.blur();
      setShowMaxChildrenModal(true);
    }
  }

  function clickedOntrigger() {
    const wrapper = document.getElementById('wrapper')
    const radio = document.getElementById("radio")
    const accordionIcons = document.querySelectorAll("[id$=trigger]")

    for (let i = 0; i < accordionIcons.length; i++) {
      accordionIcons[i].addEventListener('click', (event) => {
        if (removeChildSuccessful) {
          setRemoveChildSuccessful(false)
        }
      })
    }

    if (radio) {
      radio.addEventListener('click', (event) => {
        if (removeChildSuccessful) {
          setRemoveChildSuccessful(false)
        }
      })
    }

    if (wrapper) {
      wrapper.addEventListener('click', (event) => {
        const isButton = event.target.nodeName === 'BUTTON'
        const isSVG = event.target.nodeName === "svg"
        const isPATH = event.target.nodeName === "PATH"

        if (isButton || isSVG || isPATH) {
          if (removeChildSuccessful) {
            setRemoveChildSuccessful(false)
          }
        }
      })

    }
  }

  useEffect(() => {
    if (removeChildSuccessful) {
      clickedOntrigger()
    }
  }, [removeChildSuccessful])

  useEffect(() => {
    animateScroll.scrollToTop({ duration: 0 })

    langCode === 'en'
      ? gaPageView('/app/eitc/qualifying-children/', 'EITC - Qualifying Children | Internal Revenue Service')
      : gaPageView(`/app/eitc/qualifying-children/${langCode}/`, 'EITC - Qualifying Children | Internal Revenue Service')

    if (numOfDependents === '0') {
      const newResults = {
        ...site.forms,
        qualifyingChildren: {
          ...site.forms.qualifyingChildren,
          completed: true,
        }
      }

      siteDispatch({
        type: 'UPDATE_FORMS',
        payload: newResults,
      })
    }
  }, [])

  return (
    <div className={clsx('block fade-in')}>
      <Heading
        level="2"
        className="text-2xl font-bold fade-in"
        data-testid="qualifyingChildrenTitle"
      >
        {lang('children.label.children')}
      </Heading>

      {showRemoveChildModal && <Modal title='' close={removeChildModalClose} children={removeChildModalContainer()} />}
      {showMaxChildrenModal && <Modal title='' close={maxChildrenModalClose} children={showMaxChildrenModalContainer()} />}

      {!prevPagesCompleted() && (
        <Alert
          id="qualifyingChildrenSkipAheadWarning"
          title={lang('global.heading.attention')}
          type="warning"
          gaLabel="Qualifying Children Skip Ahead Warning"
        >
          <p>{lang('children.p.previous')}</p>
        </Alert>
      )}

      {prevPagesCompleted() && numOfDependents === '0' && (
        <>
          <HtmlBuilder elements={AlertsHtml.PrevPagesHTML(lang, routes(langCode, 'eitc').filingStatus)} />

          <NavButtons
            nextOnclick={() => router.push(routes(langCode, 'eitc').results, undefined, { shallow: true })}
            backOnclick={() => router.push(routes(langCode, 'eitc').agi, undefined, { shallow: true })}
            backText={lang('global.button.back')}
            nextText={lang('global.button.next')}
          />
        </>
      )}

      {prevPagesCompleted() && parseInt(numOfDependents) > 0 && (
        <>
          <HtmlBuilder elements={AlertsHtml.IntroHTML(site, lang, langCode, numOfDependents, routes(langCode, 'eitc').filingStatus)} />
          {removeChildSuccessful &&
            <Alert
              dataTestId="childSuccessfullyRemoved"
              className={""}
              id="childSuccessfullyRemoved"
              title={lang('qualifyingChildren.h.childSuccessfullyRemoved')}
              type="success"
              gaLabel="Child Qualifies Info Alert"
            >
              <p className="fade-in">
                {lang("qualifyingChildren.p.childSuccessfullyRemoved")}
              </p>
            </Alert>}
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema(lang, site, site.forms.qualifyingChildren.values, year, showYoungerQuestion, showUs50PercentQuestion, filingStatus, spouseAge, age, deceasedSpouseAge, showAccordion, qualifyUntilSSN, ignoreValidation)}
            onSubmit={() => onSubmit()}
            validateOnBlur={false}
          >
            {({ values, errors, touched, isSubmitting, validateForm, setFieldValue, setTouched }) => (
              <>
                <Form className="w-full" noValidate>
                  <AutoSubmit
                    isCompleted={isCompleted}
                    isQualifyingDependent={isQualifyingDependent}
                    setQualifyingChildren={setQualifyingChildren}
                  />

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
                        gaLabel="Qualifying Children Errors Alert"
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

                  <FieldArray
                    name="children"
                  >
                    {
                      (fieldArrayProps) => {
                        const { remove, push } = fieldArrayProps
                        return (
                          <Accordion level="2" multiItem>
                            {values.children.filter((item, i) => (showAccordion(i, values)))
                              .map((child, index) => (
                                <AccordionItem isOpen={accordionOpenArr[index]} key={index} id={`child${index + 1}`}>
                                  <AccordionItemTrigger
                                    accordionOpenArr={accordionOpenArr}
                                    setAccordionOpenArr={setAccordionOpenArr}
                                    title={getAccordionTitle(child, values, index)}
                                    subtitle={Object.keys(disqualifiers(values, index, site, showYoungerQuestion, filingStatus, spouseAge, deceasedSpouseAge, qualifyUntilSSN)).length > 0 && lang('qualifyingChildren.p.doesNotQualify')}
                                    site={site}
                                    siteDispatch={siteDispatch}
                                    lang={lang}
                                    buttonAriaLabel={`Child ${index + 1} Accordion`}
                                    className='break-all'
                                  >
                                    {showRemoveChildButton(values, index) && (
                                      <button
                                        type="button"
                                        aria-label={`Remove Child ${index + 1}`}
                                        className="whitespace-nowrap ml-auto text-base text-blue-500 underline"
                                        onClick={() => {
                                          setRemoveChildParams({ child, values, index, remove, push })
                                          setRemoveChildParamChildren(values.children)
                                          setShowRemoveChildModal(true)
                                        }}
                                      >
                                        {lang('qualifyingChildren.button.removeChild')}
                                      </button>
                                    )}
                                    {inProgress(child, values, index) && (
                                      <>
                                        {showIncompleteChildModal && <Modal title='' close={incompleteChildModalClose} children={incompleteChildModalContainer(setTouched, setFieldValue, values.children, index)} />}
                                        <button
                                          type="button"
                                          aria-label={`Cancel Child ${index + 1}`}
                                          className="ml-auto text-base text-blue-500 underline"
                                          onClick={() => {
                                            cancelChild(setTouched, setFieldValue, values.children, index)
                                          }}
                                        >
                                          {lang('global.btn.cancel')}
                                        </button>
                                      </>
                                    )}
                                  </AccordionItemTrigger>
                                  <AccordionItemBody>
                                    <Touched
                                      form={childFormElements(values, site, lang, index, showYoungerQuestion, spouseAge, age, deceasedSpouseAge, qualifyUntilSSN)}
                                      showUs50PercentQuestion={showUs50PercentQuestion}
                                    />
                                    <div id="radio">
                                      <FormBuilder
                                        onFocus={e => enableMaxChildrenModal(e, values, index)}
                                        disabled={disableRadio}
                                        options={childFormElements(values, site, lang, index, showYoungerQuestion, spouseAge, age, deceasedSpouseAge, qualifyUntilSSN)}
                                      />
                                    </div>

                                    {/* <Alert
                                      dataTestId="childDisqualifiedAlert"
                                      className={clsx('lg:w-10/12',
                                        Object.keys(disqualifiers(values, index, site, showYoungerQuestion, filingStatus, spouseAge, deceasedSpouseAge, qualifyUntilSSN)).length !== 0
                                          ? '' : 'hidden')}
                                      id="childDisqualifiedAlert"
                                      title={lang('global.heading.attention')}
                                      gaLabel="Child Disqualified Warning Alert"
                                    >
                                      <p className="font-bold fade-in" data-testid="childQualifiesParagraph">
                                        <HtmlBuilder elements={
                                        [
                                          {
                                            type: 'Paragraph',
                                            text: 'child.p.notQualifies',
                                            replacements: [
                                              {
                                                type: 'link',
                                                key: ':irsPub596',
                                                href: langCode === 'en' ? 'https://www.irs.gov/forms-pubs/about-publication-596':`https://www.irs.gov/${langCode}/forms-pubs/about-publication-596`,
                                                external: true,
                                                text: 'filingStatus.a.numOfDependentsTT1'
                                              }
                                            ]
                                          },
                                         ]
                                        }
                                      />
                                      </p>
                                    </Alert> */}
                                    
                                    <Alert
                                      dataTestId="childDisqualifiedAlert"
                                      className={clsx('lg:w-10/12',
                                        Object.keys(disqualifiers(values, index, site, showYoungerQuestion, filingStatus, spouseAge, deceasedSpouseAge, qualifyUntilSSN)).length !== 0
                                          ? '' : 'hidden')}
                                      id="childDisqualifiedAlert"
                                      title={lang('global.heading.attention')}
                                      gaLabel="Child Disqualified Warning Alert"
                                    >
                                      <p className="font-bold fade-in" data-testid="childQualifiesParagraph">
                                        <HtmlBuilder elements={
                                        [
                                          {
                                            type: 'Paragraph',
                                            text: 'child.p.notQualifies',
                                            replacements: [
                                              {
                                                type: 'link',
                                                key: ':irsPub596',
                                                href: langCode === 'en' ? 'https://www.irs.gov/forms-pubs/about-publication-596':`https://www.irs.gov/${langCode}/forms-pubs/about-publication-596`,
                                                external: true,
                                                text: 'filingStatus.a.numOfDependentsTT1'
                                              }
                                            ]
                                          },
                                         ]
                                        }
                                      />
                                      </p>
                                    </Alert>

                                    {noValidSSNCondition(values, index) && (
                                      <Alert
                                        dataTestId="qcValidSSNInfo"
                                        id="qcValidSSNInfo"
                                        title={lang('global.heading.pleaseNote')}
                                        type="info"
                                        gaLabel="Qualifying Children Valid SSN Info Alert"
                                      >
                                        <HtmlBuilder
                                          elements={
                                            [
                                              {
                                                'key': 'qcValidSSNInfoP1',
                                                'type': 'Paragraph',
                                                'className': 'my-3',
                                                'text': 'qualifyingChildren.p.qcValidSSNInfo',
                                                dataTestID: 'qcValidSSNInfoP1',
                                              },
                                            ]
                                          }
                                        />
                                      </Alert>
                                    )}
                                    {noValidSSNCondition(values, index) && noOtherValidChild(values, index) && (
                                        <Alert
                                          id="SSNRequirementWarning"
                                          title={lang('global.heading.eitcNoQualify')}
                                          type="warning"
                                          gaLabel="Children SSN Requirement Warning"
                                        >
                                          <HtmlBuilder elements={AlertsHtml.NoQCDisqualifiermHTML(year, filingStatus, langCode)} />
                                        </Alert>
                                    )}
                                    <Alert
                                      dataTestId="childQualifiesAlert"
                                      className={clsx('lg:w-10/12', isQualifyingDependent(values, index) ? '' : 'hidden')}
                                      id="childQualifiesAlert"
                                      title={lang('global.heading.childQualifiesAlert')}
                                      type="success"
                                      gaLabel="Child Qualifies Info Alert"
                                    >
                                      <p className="fade-in" data-testid="childQualifiesParagraph">
                                        {lang('child.p.qualifies')}
                                      </p>
                                    </Alert>
                                  </AccordionItemBody>
                                </AccordionItem>
                              ))
                            }
                          </Accordion>
                        )
                      }
                    }
                  </FieldArray>

                  <RadioGroup
                    label={fsCalc(fsValues) === 'married'
                      ? lang('filingStatus.legend.us50PercentMarried', { ':year': year })
                      : lang('children.label.us50Percent', { ':year': year })}
                    name="us50Percent"
                    id="us50Percent"
                    required
                    show={showUs50PercentQuestion(values)}
                    className="mt-6"
                    dataTestId="us50Percent"
                    helpTip={{
                      page: 'qualifyingChildren',
                      expanded: site.forms.qualifyingChildren.helpTips.us50Percent.open,
                      ariaLabel: lang('children.button.us50PercentAriaLabel'),
                      elements: () => ToolTips.us50PercentToolTip(year),
                    }}
                    options={[
                      {
                        id: 'us50Percent-yes',
                        value: 'yes',
                        label: lang('global.label.yes'),
                      },
                      {
                        id: 'us50Percent-no',
                        value: 'no',
                        label: lang('global.label.no'),
                      },
                    ]}
                  />

                  {getNumOfQC() > 0 && getNumOfQC() < 3 && (
                    <div className="mt-5">
                      <HtmlBuilder
                        elements={AlertsHtml.ShowNoQcCreditHtml(lang, langCode, routes(langCode, 'eitc').filingStatus, qualifyingChildren)}
                      />
                    </div>
                  )}

                  {getNumOfQC() >= 3 && (
                    <div className="mt-5">
                      <HtmlBuilder
                        elements={AlertsHtml.ShowChildrenLimitHtml(lang, langCode, qualifyingChildren)}
                      />
                    </div>
                  )}

                  {showUs50PercentQuestion(values) && values.us50Percent === 'yes' && (
                    <div className="mt-5">
                      <HtmlBuilder
                        elements={AlertsHtml.NoQcButCreditMessageHtml(lang, routes(langCode, 'eitc').filingStatus, year)}
                      />
                    </div>
                  )}

                  {showUs50PercentQuestion(values) && values.us50Percent === 'no' && (
                    <Alert
                      id="us50PctWarning"
                      title={lang('global.heading.eitcNoQualify')}
                      type="warning"
                      gaLabel="Children US 50% Warning"
                    >
                      <p>
                        {lang('children.p.showNotLiveInUS50Message')}
                      </p>
                    </Alert>
                  )}

                  {(allHaveDQs(values)
                    && credit(year, 0, filingStatus, total, agi) > 0
                    && !meetAgeRequirementNoQC()) && (
                      <Alert
                        id="ageRequirementWarning"
                        title={lang('global.heading.eitcNoQualify')}
                        type="warning"
                        gaLabel="Children Age Requirement Warning"
                      >
                        <HtmlBuilder elements={AlertsHtml.NoQCDisqualifiermHTML(year, filingStatus, langCode)} />
                      </Alert>
                    )}

                  {(calcAgiForEitc(site.forms.agi.values).agi >= maxLimit(values)
                    || credit(year, remainingQC(values), filingStatus, total, agi) === 0) && (
                      <Alert
                        id="agiOverLimitWarning"
                        title={lang('global.heading.eitcNoQualify')}
                        type="warning"
                        gaLabel="Children AGI Over Limit Warning"
                      >
                        <p>
                          {lang('children.p.showNoCreditMessage')}
                        </p>
                      </Alert>
                    )}

                  <NavButtons
                    nextOnclick={() => handleErrorCheck(validateForm, values, showAccordion)}
                    backOnclick={() => router.push(routes(langCode, 'eitc').agi, undefined, { shallow: true })}
                    backText={lang('global.button.back')}
                    nextText={lang('global.button.next')}
                    backDisable={isSubmitting}
                    nextDisable={isSubmitting
                      || (showUs50PercentQuestion(values) && values.us50Percent === 'no')
                      || ((allHaveDQs(values)
                        && credit(year, 0, filingStatus, total, agi) > 0
                        && !meetAgeRequirementNoQC()))
                      || (calcAgiForEitc(site.forms.agi.values).agi >= maxLimit(values))
                      || (getNumOfQC() === 0)}
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

export default QualifyingChildren
