import fsCalc from '../../filingStatus/Form/helpers/fsCalc'
import * as ToolTips from '../Structure/ToolTipsHtml'
import params from '../../../calculations/eitc/EITCParams.json'
import { showSpouseAge, showDeceasedSpouseAge } from '../../filingStatus/Form/helpers/fsScenarios'

// SCENARIOS
export const showClaimOther = (values, index) => values?.children[index]?.live51Pct === 'yes'

export const showClaimOtherConfirm = (values, index) => showClaimOther(values, index) && values.children[index].claimOther === 'yes'

export const showFileJoint = (values, index) => (values.children[index].live51Pct === 'yes'
  && (values.children[index].claimOther === 'no'
    || (values.children[index].claimOther === 'yes'
      && values.children[index].claimOtherConfirm === 'yes')))

export const showFileJointConfirm = (values, index) => (values.children[index].live51Pct === 'yes'
  && (values.children[index].claimOther === 'no'
    || (values.children[index].claimOther === 'yes' && values.children[index].claimOtherConfirm === 'yes')))
  && (values.children[index].fileJoint === 'yes')

export const showPermanentlyDisabled = (values, index) => (values.children[index].live51Pct === 'yes'
  && (values.children[index].claimOther === 'no'
    || (values.children[index].claimOther === 'yes' && values.children[index].claimOtherConfirm === 'yes')))
  && (values.children[index].fileJoint === 'no'
    || (values.children[index].fileJoint === 'yes' && values.children[index].fileJointConfirm === 'yes'))

export const showRelationship = (values, index) => (values.children[index].live51Pct === 'yes'
  && (values.children[index].claimOther === 'no'
    || (values.children[index].claimOther === 'yes' && values.children[index].claimOtherConfirm === 'yes')))
  && (values.children[index].fileJoint === 'no'
    || (values.children[index].fileJoint === 'yes' && values.children[index].fileJointConfirm === 'yes'))
  && (values.children[index].permanentlyDisabled === 'yes' || values.children[index].permanentlyDisabled === 'no')

export const showAge = (values, index) => (values.children[index].live51Pct === 'yes'
  && (values.children[index].claimOther === 'no'
    || (values.children[index].claimOther === 'yes' && values.children[index].claimOtherConfirm === 'yes')))
  && (values.children[index].fileJoint === 'no'
    || (values.children[index].fileJoint === 'yes' && values.children[index].fileJointConfirm === 'yes'))
  && (values.children[index].permanentlyDisabled === 'no')
  && (values.children[index].relationship === 'qualifyingRelationship1'
    || values.children[index].relationship === 'qualifyingRelationship2'
    || values.children[index].relationship === 'qualifyingRelationship3')

export const showStudent = (site, values, index, year, showYoungerQuestion, filingStatus, age, spouseAge, deceasedSpouseAge) => {
  let shouldShow = false

  if (showAge(values, index) && values.children[index].age === 'age-19-23') {
    
    if (params[year].useARPA && year =="2021") {
      if (filingStatus === 'married') {
        if ((showYoungerQuestion(values, index) && values.children[index].younger === 'yes')
          || (age === '24over'
            || ((showSpouseAge(site.forms.filingStatus.values, site) && spouseAge === '24over')
              || (showDeceasedSpouseAge(site.forms.filingStatus.values, site) && deceasedSpouseAge === '24over')))) {
          shouldShow = true
        }
      } else {
        if ((showYoungerQuestion(values, index) && values.children[index].younger === 'yes')
          || age === '24over') {
          shouldShow = true
        }
      }
    }

    if (params[year].useARPA && year !="2021") {
      if (filingStatus === 'married') {
        if ((showYoungerQuestion(values, index) && values.children[index].younger === 'yes')
          || (age === 'age-25-64'
            || ((showSpouseAge(site.forms.filingStatus.values, site) && spouseAge === 'age-25-64')
              || (showDeceasedSpouseAge(site.forms.filingStatus.values, site) && deceasedSpouseAge === 'age-25-64')))) {
          shouldShow = true
        }
      } else {
        if ((showYoungerQuestion(values, index) && values.children[index].younger === 'yes')
          || age === 'age-25-64') {
          shouldShow = true
        }
      }
    } else if (!params[year].useARPA) {
      if (showYoungerQuestion(values, index) && values.children[index].younger === 'yes') {
        shouldShow = true
      }

      if (filingStatus === 'married'
        && ((age === 'age-25-64' || age === 'over65')
          || ((showSpouseAge(site.forms.filingStatus.values, site) && (spouseAge === 'spouseAge-25-64' || spouseAge === 'spouseAge-over65'))
            || (showDeceasedSpouseAge(site.forms.filingStatus.values, site)
              && (deceasedSpouseAge === 'deceasedSpouseAge-25-64' || deceasedSpouseAge === 'deceasedSpouseAge-over65'))))) {
        shouldShow = true
      } else if (age === 'age-25-64' || age === 'over65') {
        shouldShow = true
      }
    }
  }

  return shouldShow
}

export const showValidSSN = (values, index, qualifyUntilSSN) => qualifyUntilSSN(values, index)
export const showAnotherValidChild = (values, index, qualifyUntilSSN) => qualifyUntilSSN(values, index)
    && showValidSSN(values, index, qualifyUntilSSN)

// FORM ELEMENTS
export const childFormElements = (values, site, lang, index, showYoungerQuestion, spouseAge, age, deceasedSpouseAge, qualifyUntilSSN) => {
  const { year } = site.forms.generalInfo.values
  const filingStatus = fsCalc(site.forms.filingStatus.values)
  if (year !="2021"){
  return ([
    {
      inputType: 'textField',
      label: lang('child.legend.childName'),
      name: `children.${index}.childName`,
      hintText: lang('child.legend.childNameHintText'),
      id: `children.${index}.childName`,
      show: true,
      maxlength: 400,
      className: 'mt-6 w-full md:w-96',
      dataTestId: `enterChildName${index}`,
    },
    {
      inputType: 'radio',
      label: lang('child.legend.live51Pct', { ':year': year }),
      name: `children.${index}.live51Pct`,
      id: `children.${index}.live51Pct`,
      required: true,
      className: 'mt-6',
      dataTestId: `children.${index}.live51Pct`,
      helpTip: {
        page: 'qualifyingChildren',
        expanded: site.forms.qualifyingChildren.helpTips[`children.${index}.live51Pct`].open,
        ariaLabel: lang('children.button.live51PctAriaLabel'),
        elements: () => ToolTips.live51PctToolTip(year),
      },
      options: [
        {
          id: `children.${index}.live51Pct-yes`,
          value: 'yes',
          label: lang('global.label.yes'),
        },
        {
          id: `children.${index}.live51Pct-no`,
          value: 'no',
          label: lang('global.label.no'),
        },
      ]
    },
    {
      inputType: 'radio',
      label: lang('child.legend.claimOther'),
      name: `children.${index}.claimOther`,
      id: `children.${index}.claimOther`,
      required: true,
      show: showClaimOther(values, index),
      className: 'mt-6',
      dataTestId: `children.${index}.claimOther`,
      helpTip: {
        page: 'qualifyingChildren',
        expanded: site.forms.qualifyingChildren.helpTips[`children.${index}.claimOther`].open,
        ariaLabel: lang('children.button.claimOtherAriaLabel'),
        elements: () => ToolTips.claimOtherToolTip(),
      },
      options: [
        {
          id: `children.${index}.claimOther-yes`,
          value: 'yes',
          label: lang('global.label.yes'),
        },
        {
          id: `children.${index}.claimOther-no`,
          value: 'no',
          label: lang('global.label.no'),
        },
      ]
    },
    {
      inputType: 'radio',
      label: lang('child.legend.claimOtherConfirm'),
      name: `children.${index}.claimOtherConfirm`,
      id: `children.${index}.claimOtherConfirm`,
      required: true,
      show: showClaimOtherConfirm(values, index),
      className: 'mt-6',
      dataTestId: `children.${index}.claimOtherConfirm`,
      helpTip: {
        page: 'qualifyingChildren',
        expanded: site.forms.qualifyingChildren.helpTips[`children.${index}.claimOtherConfirm`].open,
        ariaLabel: lang('children.button.claimOtherConfirmAriaLabel'),
        elements: () => ToolTips.claimOtherConfirmToolTip(),
      },
      options: [
        {
          id: `children.${index}.claimOtherConfirm-yes`,
          value: 'yes',
          label: lang('global.label.yes'),
        },
        {
          id: `children.${index}.claimOtherConfirm-no`,
          value: 'no',
          label: lang('global.label.no'),
        },
      ]
    },
    {
      inputType: 'radio',
      label: lang('child.legend.fileJoint', { ':year': year }),
      name: `children.${index}.fileJoint`,
      id: `children.${index}.fileJoint`,
      required: true,
      show: showFileJoint(values, index),
      className: 'mt-6',
      dataTestId: `children.${index}.fileJoint`,
      helpTip: {
        page: 'qualifyingChildren',
        expanded: site.forms.qualifyingChildren.helpTips[`children.${index}.fileJoint`].open,
        ariaLabel: lang('children.button.fileJointAriaLabel'),
        elements: () => ToolTips.fileJointToolTip(),
      },
      options: [
        {
          id: `children.${index}.fileJoint-yes`,
          value: 'yes',
          label: lang('global.label.yes'),
        },
        {
          id: `children.${index}.fileJoint-no`,
          value: 'no',
          label: lang('global.label.no'),
        },
      ]
    },
    {
      inputType: 'radio',
      label: lang('child.legend.fileJointConfirm', { ':year': year }),
      name: `children.${index}.fileJointConfirm`,
      id: `children.${index}.fileJointConfirm`,
      required: true,
      show: showFileJointConfirm(values, index),
      className: 'mt-6',
      dataTestId: `children.${index}.fileJointConfirm`,
      helpTip: {
        page: 'qualifyingChildren',
        expanded: site.forms.qualifyingChildren.helpTips[`children.${index}.fileJointConfirm`].open,
        ariaLabel: lang('children.button.fileJointConfirmAriaLabel'),
        elements: () => ToolTips.fileJointConfirmToolTip(),
      },
      options: [
        {
          id: `children.${index}.fileJointConfirm-yes`,
          value: 'yes',
          label: lang('child.label.fileJointConfirm3'),
        },
        {
          id: `children.${index}.fileJointConfirm-no`,
          value: 'no',
          label: lang('child.label.fileJointConfirm2'),
        },
      ]
    },
    {
      inputType: 'radio',
      label: lang('child.legend.permanentlyDisabled'),
      name: `children.${index}.permanentlyDisabled`,
      id: `children.${index}.permanentlyDisabled`,
      required: true,
      show: showPermanentlyDisabled(values, index),
      className: 'mt-6',
      dataTestId: `children.${index}.permanentlyDisabled`,
      helpTip: {
        page: 'qualifyingChildren',
        expanded: site.forms.qualifyingChildren.helpTips[`children.${index}.permanentlyDisabled`].open,
        ariaLabel: lang('children.button.permanentlyDisabledAriaLabel'),
        elements: () => ToolTips.permanentlyDisabledToolTip(),
      },
      options: [
        {
          id: `children.${index}.permanentlyDisabled-yes`,
          value: 'yes',
          label: lang('global.label.yes'),
        },
        {
          id: `children.${index}.permanentlyDisabled-no`,
          value: 'no',
          label: lang('global.label.no'),
        },
      ]
    },
    {
      inputType: 'radio',
      label: lang('child.legend.relationship'),
      name: `children.${index}.relationship`,
      id: `children.${index}.relationship`,
      required: true,
      show: showRelationship(values, index),
      className: 'mt-6',
      dataTestId: `children.${index}.relationship`,
      helpTip: {
        page: 'qualifyingChildren',
        expanded: site.forms.qualifyingChildren.helpTips[`children.${index}.relationship`].open,
        ariaLabel: lang('children.button.relationshipAriaLabel'),
        elements: () => ToolTips.relationshipToolTip(),
      },
      options: [
        {
          id: `children.${index}.relationship-qualifyingRelationship1`,
          value: 'qualifyingRelationship1',
          label: lang('children.label.relationship1'),
        },
        {
          id: `children.${index}.relationship-qualifyingRelationship2`,
          value: 'qualifyingRelationship2',
          label: lang('children.label.relationship2'),
        },
        {
          id: `children.${index}.relationship-qualifyingRelationship3`,
          value: 'qualifyingRelationship3',
          label: lang('children.label.relationship3'),
        },
        {
          id: `children.${index}.relationship-other`,
          value: 'other',
          label: lang('children.label.relationship4'),
        },
      ]
    },
    {
      inputType: 'radio',
      label: lang('child.legend.age', { ':year': year }),
      name: `children.${index}.age`,
      id: `children.${index}.age`,
      required: true,
      show: showAge(values, index),
      className: 'mt-6',
      dataTestId: `children.${index}.age`,
      options: [
        {
          id: `children.${index}.age-under18`,
          value: 'age-under18',
          label: lang('child.label.age1'),
        },
        {
          id: `children.${index}.age-19-23`,
          value: 'age-19-23',
          label: lang('child.label.age2'),
        },
        {
          id: `children.${index}.age-over24`,
          value: 'age-over24',
          label: lang('child.label.age3'),
        },
      ]
    },
    {
      inputType: 'radio',
      label: filingStatus === 'married' ? lang('child.legend.youngerSpouse') : lang('child.legend.younger'),
      name: `children.${index}.younger`,
      id: `children.${index}.younger`,
      required: true,
      show: showYoungerQuestion(values, index),
      className: 'mt-6',
      dataTestId: `children.${index}.younger`,
      helpTip: {
        page: 'qualifyingChildren',
        expanded: site.forms.qualifyingChildren.helpTips[`children.${index}.younger`].open,
        ariaLabel: lang('children.button.youngerAriaLabel'),
        elements: () => (filingStatus === 'married'
          ? ToolTips.youngerSpouseToolTip(year)
          : ToolTips.youngerToolTip(year)),
      },
      options: [
        {
          id: `children.${index}.younger-yes`,
          value: 'yes',
          label: lang('global.label.yes'),
        },
        {
          id: `children.${index}.younger-no`,
          value: 'no',
          label: lang('global.label.no'),
        },
      ]
    },
    {
      inputType: 'radio',
      label: lang('child.legend.student'),
      name: `children.${index}.student`,
      id: `children.${index}.student`,
      required: true,
      show: showStudent(site, values, index, year, showYoungerQuestion, filingStatus, age, spouseAge, deceasedSpouseAge),
      className: 'mt-6',
      dataTestId: `children.${index}.student`,
      helpTip: {
        page: 'qualifyingChildren',
        expanded: site.forms.qualifyingChildren.helpTips[`children.${index}.student`].open,
        ariaLabel: lang('children.button.studentAriaLabel'),
        elements: () => ToolTips.studentToolTip(),
      },
      options: [
        {
          id: `children.${index}.student-yes`,
          value: 'yes',
          label: lang('global.label.yes'),
        },
        {
          id: `children.${index}.student-no`,
          value: 'no',
          label: lang('global.label.no'),
        },
      ]
    },
    {
      inputType: 'radio',
      label: lang('child.legend.validSSN'),
      name: `children.${index}.validSSN`,
      id: `children.${index}.validSSN`,
      required: true,
      show: showValidSSN(values, index, qualifyUntilSSN),
      className: 'mt-6',
      dataTestId: `children.${index}.validSSN`,
      helpTip: {
        page: 'qualifyingChildren',
        expanded: site.forms.qualifyingChildren.helpTips[`children.${index}.validSSN`].open,
        ariaLabel: lang('children.button.validSSNAriaLabel'),
        elements: () => ToolTips.validSSNToolTip(),
      },
      options: [
        {
          id: `children.${index}.validSSN-yes`,
          value: 'yes',
          label: lang('global.label.yes'),
        },
        {
          id: `children.${index}.validSSN-no`,
          value: 'no',
          label: lang('global.label.no'),
        },
      ]
    },
    {
      inputType: 'radio',
      label: lang('child.legend.anotherValidChild'),
      name: `children.${index}.anotherValidChild`,
      id: `children.${index}.anotherValidChild`,
      required: true,
      show: showAnotherValidChild(values, index, qualifyUntilSSN),
      className: 'mt-6',
      dataTestId: `children.${index}.anotherValidChild`,
      options: [
        {
          id: `children.${index}.anotherValidChild-yes`,
          value: 'yes',
          label: lang('global.label.yes'),
        },
        {
          id: `children.${index}.anotherValidChild-no`,
          value: 'no',
          label: lang('global.label.no'),
        },
      ]
    },
  ])
}
else {
  return ([
    {
      inputType: 'textField',
      label: lang('child.legend.childName'),
      name: `children.${index}.childName`,
      hintText: lang('child.legend.childNameHintText'),
      id: `children.${index}.childName`,
      show: true,
      maxlength: 400,
      className: 'mt-6 w-full md:w-96',
      dataTestId: `enterChildName${index}`,
    },
    {
      inputType: 'radio',
      label: lang('child.legend.live51Pct', { ':year': year }),
      name: `children.${index}.live51Pct`,
      id: `children.${index}.live51Pct`,
      required: true,
      className: 'mt-6',
      dataTestId: `children.${index}.live51Pct`,
      helpTip: {
        page: 'qualifyingChildren',
        expanded: site.forms.qualifyingChildren.helpTips[`children.${index}.live51Pct`].open,
        ariaLabel: lang('children.button.live51PctAriaLabel'),
        elements: () => ToolTips.live51PctToolTip(year),
      },
      options: [
        {
          id: `children.${index}.live51Pct-yes`,
          value: 'yes',
          label: lang('global.label.yes'),
        },
        {
          id: `children.${index}.live51Pct-no`,
          value: 'no',
          label: lang('global.label.no'),
        },
      ]
    },
    {
      inputType: 'radio',
      label: lang('child.legend.claimOther2'),
      name: `children.${index}.claimOther`,
      id: `children.${index}.claimOther`,
      required: true,
      show: showClaimOther(values, index),
      className: 'mt-6',
      dataTestId: `children.${index}.claimOther`,
      helpTip: {
        page: 'qualifyingChildren',
        expanded: site.forms.qualifyingChildren.helpTips[`children.${index}.claimOther`].open,
        ariaLabel: lang('children.button.claimOtherAriaLabel'),
        elements: () => ToolTips.claimOtherToolTip(),
      },
      options: [
        {
          id: `children.${index}.claimOther-yes`,
          value: 'yes',
          label: lang('global.label.yes'),
        },
        {
          id: `children.${index}.claimOther-no`,
          value: 'no',
          label: lang('global.label.no'),
        },
      ]
    },
    {
      inputType: 'radio',
      label: lang('child.legend.claimOtherConfirm'),
      name: `children.${index}.claimOtherConfirm`,
      id: `children.${index}.claimOtherConfirm`,
      required: true,
      show: showClaimOtherConfirm(values, index),
      className: 'mt-6',
      dataTestId: `children.${index}.claimOtherConfirm`,
      helpTip: {
        page: 'qualifyingChildren',
        expanded: site.forms.qualifyingChildren.helpTips[`children.${index}.claimOtherConfirm`].open,
        ariaLabel: lang('children.button.claimOtherConfirmAriaLabel'),
        elements: () => ToolTips.claimOtherConfirmToolTip(),
      },
      options: [
        {
          id: `children.${index}.claimOtherConfirm-yes`,
          value: 'yes',
          label: lang('global.label.yes'),
        },
        {
          id: `children.${index}.claimOtherConfirm-no`,
          value: 'no',
          label: lang('global.label.no'),
        },
      ]
    },
    {
      inputType: 'radio',
      label: lang('child.legend.fileJoint', { ':year': year }),
      name: `children.${index}.fileJoint`,
      id: `children.${index}.fileJoint`,
      required: true,
      show: showFileJoint(values, index),
      className: 'mt-6',
      dataTestId: `children.${index}.fileJoint`,
      helpTip: {
        page: 'qualifyingChildren',
        expanded: site.forms.qualifyingChildren.helpTips[`children.${index}.fileJoint`].open,
        ariaLabel: lang('children.button.fileJointAriaLabel'),
        elements: () => ToolTips.fileJointToolTip(),
      },
      options: [
        {
          id: `children.${index}.fileJoint-yes`,
          value: 'yes',
          label: lang('global.label.yes'),
        },
        {
          id: `children.${index}.fileJoint-no`,
          value: 'no',
          label: lang('global.label.no'),
        },
      ]
    },
    {
      inputType: 'radio',
      label: lang('child.legend.fileJointConfirm', { ':year': year }),
      name: `children.${index}.fileJointConfirm`,
      id: `children.${index}.fileJointConfirm`,
      required: true,
      show: showFileJointConfirm(values, index),
      className: 'mt-6',
      dataTestId: `children.${index}.fileJointConfirm`,
      helpTip: {
        page: 'qualifyingChildren',
        expanded: site.forms.qualifyingChildren.helpTips[`children.${index}.fileJointConfirm`].open,
        ariaLabel: lang('children.button.fileJointConfirmAriaLabel'),
        elements: () => ToolTips.fileJointConfirmToolTip(),
      },
      options: [
        {
          id: `children.${index}.fileJointConfirm-yes`,
          value: 'yes',
          label: lang('child.label.fileJointConfirm1'),
        },
        {
          id: `children.${index}.fileJointConfirm-no`,
          value: 'no',
          label: lang('child.label.fileJointConfirm2'),
        },
      ]
    },
    {
      inputType: 'radio',
      label: lang('child.legend.permanentlyDisabled'),
      name: `children.${index}.permanentlyDisabled`,
      id: `children.${index}.permanentlyDisabled`,
      required: true,
      show: showPermanentlyDisabled(values, index),
      className: 'mt-6',
      dataTestId: `children.${index}.permanentlyDisabled`,
      helpTip: {
        page: 'qualifyingChildren',
        expanded: site.forms.qualifyingChildren.helpTips[`children.${index}.permanentlyDisabled`].open,
        ariaLabel: lang('children.button.permanentlyDisabledAriaLabel'),
        elements: () => ToolTips.permanentlyDisabledToolTip(),
      },
      options: [
        {
          id: `children.${index}.permanentlyDisabled-yes`,
          value: 'yes',
          label: lang('global.label.yes'),
        },
        {
          id: `children.${index}.permanentlyDisabled-no`,
          value: 'no',
          label: lang('global.label.no'),
        },
      ]
    },
    {
      inputType: 'radio',
      label: lang('child.legend.relationship'),
      name: `children.${index}.relationship`,
      id: `children.${index}.relationship`,
      required: true,
      show: showRelationship(values, index),
      className: 'mt-6',
      dataTestId: `children.${index}.relationship`,
      helpTip: {
        page: 'qualifyingChildren',
        expanded: site.forms.qualifyingChildren.helpTips[`children.${index}.relationship`].open,
        ariaLabel: lang('children.button.relationshipAriaLabel'),
        elements: () => ToolTips.relationshipToolTip(),
      },
      options: [
        {
          id: `children.${index}.relationship-qualifyingRelationship1`,
          value: 'qualifyingRelationship1',
          label: lang('children.label.relationship1'),
        },
        {
          id: `children.${index}.relationship-qualifyingRelationship2`,
          value: 'qualifyingRelationship2',
          label: lang('children.label.relationship2'),
        },
        {
          id: `children.${index}.relationship-qualifyingRelationship3`,
          value: 'qualifyingRelationship3',
          label: lang('children.label.relationship3'),
        },
        {
          id: `children.${index}.relationship-other`,
          value: 'other',
          label: lang('children.label.relationship4'),
        },
      ]
    },
    {
      inputType: 'radio',
      label: lang('child.legend.age', { ':year': year }),
      name: `children.${index}.age`,
      id: `children.${index}.age`,
      required: true,
      show: showAge(values, index),
      className: 'mt-6',
      dataTestId: `children.${index}.age`,
      options: [
        {
          id: `children.${index}.age-under18`,
          value: 'age-under18',
          label: lang('child.label.age1'),
        },
        {
          id: `children.${index}.age-19-23`,
          value: 'age-19-23',
          label: lang('child.label.age2'),
        },
        {
          id: `children.${index}.age-over24`,
          value: 'age-over24',
          label: lang('child.label.age3'),
        },
      ]
    },
    {
      inputType: 'radio',
      label: filingStatus === 'married' ? lang('child.legend.youngerSpouse') : lang('child.legend.younger'),
      name: `children.${index}.younger`,
      id: `children.${index}.younger`,
      required: true,
      show: showYoungerQuestion(values, index),
      className: 'mt-6',
      dataTestId: `children.${index}.younger`,
      helpTip: {
        page: 'qualifyingChildren',
        expanded: site.forms.qualifyingChildren.helpTips[`children.${index}.younger`].open,
        ariaLabel: lang('children.button.youngerAriaLabel'),
        elements: () => (filingStatus === 'married'
          ? ToolTips.youngerSpouseToolTip(year)
          : ToolTips.youngerToolTip(year)),
      },
      options: [
        {
          id: `children.${index}.younger-yes`,
          value: 'yes',
          label: lang('global.label.yes'),
        },
        {
          id: `children.${index}.younger-no`,
          value: 'no',
          label: lang('global.label.no'),
        },
      ]
    },
    {
      inputType: 'radio',
      label: lang('child.legend.student'),
      name: `children.${index}.student`,
      id: `children.${index}.student`,
      required: true,
      show: showStudent(site, values, index, year, showYoungerQuestion, filingStatus, age, spouseAge, deceasedSpouseAge),
      className: 'mt-6',
      dataTestId: `children.${index}.student`,
      helpTip: {
        page: 'qualifyingChildren',
        expanded: site.forms.qualifyingChildren.helpTips[`children.${index}.student`].open,
        ariaLabel: lang('children.button.studentAriaLabel'),
        elements: () => ToolTips.studentToolTip(),
      },
      options: [
        {
          id: `children.${index}.student-yes`,
          value: 'yes',
          label: lang('global.label.yes'),
        },
        {
          id: `children.${index}.student-no`,
          value: 'no',
          label: lang('global.label.no'),
        },
      ]
    },
    {
      inputType: 'radio',
      label: lang('child.legend.validSSN'),
      name: `children.${index}.validSSN`,
      id: `children.${index}.validSSN`,
      required: true,
      show: showValidSSN(values, index, qualifyUntilSSN),
      className: 'mt-6',
      dataTestId: `children.${index}.validSSN`,
      helpTip: {
        page: 'qualifyingChildren',
        expanded: site.forms.qualifyingChildren.helpTips[`children.${index}.validSSN`].open,
        ariaLabel: lang('children.button.validSSNAriaLabel'),
        elements: () => ToolTips.validSSNToolTip(),
      },
      options: [
        {
          id: `children.${index}.validSSN-yes`,
          value: 'yes',
          label: lang('global.label.yes'),
        },
        {
          id: `children.${index}.validSSN-no`,
          value: 'no',
          label: lang('global.label.no'),
        },
      ]
    },
  ])
}
}


