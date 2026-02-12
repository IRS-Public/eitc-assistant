import { useContext } from 'react'
import * as ToolTips from '../Structure/ToolTipsHtml'
import * as scenarios from './helpers/fsScenarios'
import fsCalc from './helpers/fsCalc'
import params from '../../../calculations/eitc/EITCParams.json'
import SiteContext from '../../../context/Site/SiteContext'
import HeaderContext from '../../../context/Header/HeaderContext'

export const test = 'test'
// FORM ELEMENTS
export const filingStatusFormElements = (values, site, siteDispatch, lang, updateNum, isCompleted, errors) => {
  const { langCode } = useContext(SiteContext)
  const { year } = site.forms.generalInfo.values
  const childIncomeThreshold = year ? params[year].childIncomeThreshold : ''

  return ([
    {
      inputType: 'radio',
      label: lang('filingStatus.legend.fsKnown', { ':year': year }),
      name: 'fsKnown',
      id: 'fsKnown',
      required: true,
      className: 'mt-6',
      dataTestId: 'fsKnown',
      options: [
        {
          id: 'fsKnown-yes',
          value: 'yes',
          label: lang('global.label.yes'),
        },
        {
          id: 'fsKnown-no',
          value: 'no',
          label: lang('global.label.no'),
        },
      ]
    },
    {
      inputType: 'radio',
      label: lang('filingStatus.legend.filingStatus', { ':year': year }),
      name: 'filingStatus',
      id: 'filingStatus',
      required: true,
      show: scenarios.showFilingStatus(values),
      className: 'mt-6',
      dataTestId: 'filingStatus',
      helpTip: {
        page: 'filingStatus',
        expanded: site.forms.filingStatus.helpTips.filingStatus.open,
        ariaLabel: 'Filing Status - Help Tip',
        elements: () => ToolTips.filingStatusToolTip(year),
      },
      options: [
        {
          id: 'filingStatus-single',
          value: 'single',
          label: lang('filingStatus.legend.filingStatus1'),
        },
        {
          id: 'filingStatus-hoh',
          value: 'head-of-household',
          label: lang('filingStatus.legend.filingStatus2'),
        },
        {
          id: 'filingStatus-qw',
          value: 'widow',
          label: lang('filingStatus.legend.filingStatus6'),
        },
        {
          id: 'filingStatus-mfj',
          value: 'married',
          label: lang('filingStatus.legend.filingStatus4'),
        },
        {
          id: 'filingStatus-mfs',
          value: 'married-separate',
          label: lang('filingStatus.legend.filingStatus5'),
        },
      ]
    },
    {
      inputType: 'htmlBuilder',
      elements: [
        {
          key: 'fsToolHeading',
          type: 'Heading',
          level: '3',
          className: `font-bold text-xl mt-6 ${values.fsKnown === 'no' ? 'inline-block' : 'hidden'}
        }`,
          text: lang('filingStatus.h3.fsToolHeading'),
          dataTestID: 'filingStatusToolTitle'
        },
      ]
    },
    {
      inputType: 'radio',
      label: lang('filingStatus.legend.maritalStatus', { ':year': year }),
      name: 'maritalStatus',
      id: 'maritalStatus',
      required: true,
      show: scenarios.showMaritalStatus(values),
      className: 'mt-6',
      dataTestId: 'maritalStatus',
      helpTip: {
        page: 'filingStatus',
        expanded: site.forms.filingStatus.helpTips.maritalStatus.open,
        ariaLabel: 'Marital Status - Help Tip',
        elements: () => ToolTips.maritalStatusToolTip(),
      },
      options: [
        {
          id: 'maritalStatus-married',
          value: 'married',
          label: lang('filingStatus.legend.maritalStatus1'),
        },
        {
          id: 'maritalStatus-divorced',
          value: 'divorced',
          label: lang('filingStatus.legend.maritalStatus2'),
        },
        {
          id: 'maritalStatus-widow',
          value: 'widow',
          label: lang('filingStatus.legend.maritalStatus5'),
        },
        {
          id: 'maritalStatus-neverMarried',
          value: 'neverMarried',
          label: lang('filingStatus.legend.maritalStatus4'),
        },
      ]
    },
    {
      inputType: 'radio',
      label: lang('filingStatus.legend.fileJointReturn'),
      name: 'fileJointReturn',
      id: 'fileJointReturn',
      required: true,
      show: scenarios.showFileJointReturn(values),
      className: 'mt-6',
      dataTestId: 'fileJointReturn',
      helpTip: {
        page: 'filingStatus',
        expanded: site.forms.filingStatus.helpTips.fileJointReturn.open,
        ariaLabel: 'File Joint Return - Help Tip',
        elements: () => ToolTips.fileJointReturnToolTip(),
      },
      options: [
        {
          id: 'fileJointReturn-yes',
          value: 'yes',
          label: lang('global.label.yes'),
        },
        {
          id: 'fileJointReturn-no',
          value: 'no',
          label: lang('global.label.no'),
        },
      ]
    },
    {
      inputType: 'radio',
      label: lang('filingStatus.legend.spousesPassing'),
      name: 'spousesPassing',
      id: 'spousesPassing',
      required: true,
      show: scenarios.showSpousesPassing(values),
      className: 'mt-6',
      dataTestId: 'spousesPassing',
      options: [
        {
          id: 'spousesPassing-lastYear',
          value: 'lastYear',
          label: lang('filingStatus.legend.spousesPassing1', { ':year': year }),
        },
        {
          id: 'spousesPassing-last2Years',
          value: 'last2Years',
          label: lang('filingStatus.legend.spousesPassing2', { ':year1': year - 2, ':year2': year - 1 }),
        },
        {
          id: 'spousesPassing-3YearsPlus',
          value: '3YearsPlus',
          label: lang('filingStatus.legend.spousesPassing3', { ':year': year - 2 }),
        },
      ]
    },
    {
      inputType: 'radio',
      label: lang('filingStatus.legend.intendJointReturnDeceased', { ':year': year }),
      name: 'intendJointReturnDeceased',
      id: 'intendJointReturnDeceased',
      required: true,
      show: scenarios.showIntendJointReturnDeceased(values),
      className: 'mt-6',
      dataTestId: 'intendJointReturnDeceased',
      helpTip: {
        page: 'filingStatus',
        expanded: site.forms.filingStatus.helpTips.intendJointReturnDeceased.open,
        ariaLabel: 'Intend Joint Return - Help Tip',
        elements: () => ToolTips.intendJointReturnDeceasedToolTip(year),
      },
      options: [
        {
          id: 'intendJointReturnDeceased-yes',
          value: 'yes',
          label: lang('global.label.yes'),
        },
        {
          id: 'intendJointReturnDeceased-no',
          value: 'no',
          label: lang('global.label.no'),
        },
      ]
    },
    {
      inputType: 'radio',
      label: lang('filingStatus.legend.liveWithSpouse', { ':year': year }),
      name: 'liveWithSpouse',
      id: 'liveWithSpouse',
      required: true,
      show: scenarios.showLiveWithSpouse(values),
      className: 'mt-6',
      dataTestId: 'liveWithSpouse',
      helpTip: {
        page: 'filingStatus',
        expanded: site.forms.filingStatus.helpTips.liveWithSpouse.open,
        ariaLabel: 'Live with spouse - Help Tip',
        elements: () => ToolTips.liveWithSpouseToolTip(),
      },
      options: [
        {
          id: 'liveWithSpouse-yes',
          value: 'yes',
          label: lang('global.label.yes'),
        },
        {
          id: 'liveWithSpouse-no',
          value: 'no',
          label: lang('global.label.no'),
        },
      ]
    },
    {
      inputType: 'radio',
      label: lang('filingStatus.legend.houseUpkeep1', { ':year1': year, ':year2': year }),
      name: 'houseUpkeep1',
      id: 'houseUpkeep1',
      required: true,
      show: scenarios.showHouseUpkeep1(values),
      className: 'mt-6',
      dataTestId: 'houseUpkeep1',
      helpTip: {
        page: 'filingStatus',
        expanded: site.forms.filingStatus.helpTips.houseUpkeep1.open,
        ariaLabel: 'House Upkeep - Help Tip',
        elements: () => ToolTips.houseUpkeepToolTip(),
      },
      options: [
        {
          id: 'houseUpkeep1-yes',
          value: 'yes',
          label: lang('global.label.yes'),
        },
        {
          id: 'houseUpkeep1-no',
          value: 'no',
          label: lang('global.label.no'),
        },
      ]
    },
    {
      inputType: 'radio',
      label: lang('filingStatus.legend.entitledJointReturnDeceased'),
      name: 'entitledJointReturnDeceased',
      id: 'entitledJointReturnDeceased',
      required: true,
      show: scenarios.showEntitledJointReturnDeceased(values),
      className: 'mt-6',
      dataTestId: 'entitledJointReturnDeceased',
      options: [
        {
          id: 'entitledJointReturnDeceased-yes',
          value: 'yes',
          label: lang('global.label.yes'),
        },
        {
          id: 'entitledJointReturnDeceased-no',
          value: 'no',
          label: lang('global.label.no'),
        },
      ]
    },
    {
      inputType: 'radio',
      label: lang('filingStatus.legend.houseUpkeep2', { ':year1': year, ':year2': year }),
      name: 'houseUpkeep2',
      id: 'houseUpkeep2',
      required: true,
      show: scenarios.showHouseUpkeep2(values),
      className: 'mt-6',
      dataTestId: 'houseUpkeep2',
      helpTip: {
        page: 'filingStatus',
        expanded: site.forms.filingStatus.helpTips.houseUpkeep2.open,
        ariaLabel: 'House Upkeep - Help Tip',
        elements: () => ToolTips.houseUpkeepToolTip(),
      },
      options: [
        {
          id: 'houseUpkeep2-yes',
          value: 'yes',
          label: lang('global.label.yes'),
        },
        {
          id: 'houseUpkeep2-no',
          value: 'no',
          label: lang('global.label.no'),
        },
      ]
    },
    {
      inputType: 'radio',
      label: lang('filingStatus.legend.claimDependent1', { ':year': year }),
      name: 'claimDependent1',
      id: 'claimDependent1',
      required: true,
      show: scenarios.showClaimDependent1(values),
      className: 'mt-6',
      dataTestId: 'claimDependent1',
      helpTip: {
        page: 'filingStatus',
        expanded: site.forms.filingStatus.helpTips.claimDependent1.open,
        ariaLabel: 'Claim Dependent - Help Tip',
        elements: () => ToolTips.claimDependent1ToolTip(),
      },
      options: [
        {
          id: 'claimDependent1-yes',
          value: 'yes',
          label: lang('global.label.yes'),
        },
        {
          id: 'claimDependent1-no',
          value: 'no',
          label: lang('global.label.no'),
        },
      ]
    },
    {
      inputType: 'radio',
      label: lang('filingStatus.legend.claimDependent2', { ':year': year }),
      labelHTMLElements: [
        {
          key: 'test',
          type: 'List',
          className: 'ml-6 list list-disc',
          dataTestID: 'test',
          list: [
            lang('filingStatus.legend.claimDependent2Li1', { ':limit': childIncomeThreshold, ':year': year }),
            lang('filingStatus.legend.claimDependent2Li2'),
            lang('filingStatus.legend.claimDependent2Li3')
          ]
        }
      ],
      name: 'claimDependent2',
      id: 'claimDependent2',
      required: true,
      show: scenarios.showClaimDependent2(values),
      className: 'mt-6',
      dataTestId: 'claimDependent2',
      helpTip: {
        page: 'filingStatus',
        expanded: site.forms.filingStatus.helpTips.claimDependent2.open,
        ariaLabel: 'Claim Dependent - Help Tip',
        elements: () => ToolTips.claimDependent2ToolTip(),
      },
      options: [
        {
          id: 'claimDependent2-yes',
          value: 'yes',
          label: lang('global.label.yes'),
        },
        {
          id: 'claimDependent2-no',
          value: 'no',
          label: lang('global.label.no'),
        },
      ]
    },
    {
      inputType: 'radio',
      label: lang('filingStatus.legend.houseUpkeep3'),
      name: 'houseUpkeep3',
      id: 'houseUpkeep3',
      required: true,
      show: scenarios.showHouseUpkeep3(values),
      className: 'mt-6',
      dataTestId: 'houseUpkeep3',
      helpTip: {
        page: 'filingStatus',
        expanded: site.forms.filingStatus.helpTips.houseUpkeep3.open,
        ariaLabel: 'Claim Dependent - Help Tip',
        elements: () => ToolTips.houseUpkeepToolTip(),
      },
      options: [
        {
          id: 'houseUpkeep3-dependent',
          value: 'dependent',
          label: lang('filingStatus.label.houseUpkeep3Dependent'),
        },
        {
          id: 'houseUpkeep3-spousesChild',
          value: 'spousesChild',
          label: lang('filingStatus.label.houseUpkeep3SpousesChild'),
        },
        {
          id: 'houseUpkeep3-parent',
          value: 'parent',
          label: lang('filingStatus.label.houseUpkeep3Parent'),
        },
        {
          id: 'houseUpkeep3-none',
          value: 'none',
          label: lang('filingStatus.label.houseUpkeep3None'),
        },
      ]
    },
    {
      inputType: 'htmlBuilder',
      elements: [
        {
          key: 'fsToolResultTitle',
          type: 'Heading',
          level: '3',
          className: `font-bold text-xl mt-6 ${fsCalc(values) !== '' && values.fsKnown === 'no' ? 'inline-block' : 'hidden'}`,
          text: lang('filingStatus.h3.fsToolResultTitle'),
          dataTestID: 'fsToolResultTitle',
          replacements: [
            {
              type: 'bold',
              key: ':fsCalc',
              text: `global.label.${fsCalc(values)}`
            }
          ]
        },
      ]
    },
    {
      inputType: 'radio',
      label: lang('filingStatus.legend.deceasedSpouseValidSSN'),
      name: 'deceasedSpouseValidSSN',
      id: 'deceasedSpouseValidSSN',
      required: true,
      show: scenarios.showDeceasedSpouseValidSSN(values),
      className: 'mt-6',
      dataTestId: 'deceasedSpouseValidSSN',
      helpTip: {
        page: 'filingStatus',
        expanded: site.forms.filingStatus.helpTips.deceasedSpouseValidSSN.open,
        ariaLabel: 'Valid SSN - Help Tip',
        elements: () => ToolTips.spouseValidSSNToolTip(year),
      },
      options: [
        {
          id: 'deceasedSpouseValidSSN-yes',
          value: 'yes',
          label: lang('global.label.yes'),
        },
        {
          id: 'deceasedSpouseValidSSN-no',
          value: 'no',
          label: lang('global.label.no'),
        },
      ]
    },
    {
      inputType: 'radio',
      label: lang('filingStatus.legend.spouseValidSSN', { ':year': year }),
      name: 'spouseValidSSN',
      id: 'spouseValidSSN',
      required: true,
      show: scenarios.showSpouseValidSSN(values),
      className: 'mt-6',
      dataTestId: 'spouseValidSSN',
      helpTip: {
        page: 'filingStatus',
        expanded: site.forms.filingStatus.helpTips.spouseValidSSN.open,
        ariaLabel: 'Claim Dependent - Help Tip',
        elements: () => ToolTips.spouseValidSSNToolTip(year),
      },
      options: [
        {
          id: 'spouseValidSSN-yes',
          value: 'yes',
          label: lang('global.label.yes'),
        },
        {
          id: 'spouseValidSSN-no',
          value: 'no',
          label: lang('global.label.no'),
        },
      ]
    },
    {
      inputType: 'radio',
      label: lang('filingStatus.legend.wasSpouseAliveEndOfYear', { ':year': year }),
      name: 'wasSpouseAliveEndOfYear',
      id: 'wasSpouseAliveEndOfYear',
      required: true,
      show: scenarios.showWasSpouseAliveEndOfYear(values, site),
      className: 'mt-6',
      dataTestId: 'wasSpouseAliveEndOfYear',
      options: [
        {
          id: 'wasSpouseAliveEndOfYear-yes',
          value: 'yes',
          label: lang('global.label.yes'),
        },
        {
          id: 'wasSpouseAliveEndOfYear-no',
          value: 'no',
          label: lang('global.label.no'),
        },
      ]
    },
    {
      inputType: 'radio',
      label: lang('filingStatus.legend.spouseAge', { ':year': year }),
      name: 'spouseAge',
      id: 'spouseAge',
      required: true,
      show: scenarios.showSpouseAge(values, site),
      className: 'mt-6',
      dataTestId: 'spouseAge',
      options: [
        {
          id: 'spouseAge-under24',
          value: 'spouseAge-under24',
          label: lang('filingStatus.label.spouseAge1'),
        },
        {
          id: 'spouseAge-25-64',
          value: 'spouseAge-25-64',
          label: lang('filingStatus.label.spouseAge2'),
        },
        {
          id: 'spouseAge-over65',
          value: 'spouseAge-over65',
          label: lang('filingStatus.label.spouseAge3'),
        },
      ]
    },
    {
      inputType: 'radio',
      label: lang('filingStatus.legend.deceasedSpouseAge'),
      name: 'deceasedSpouseAge',
      id: 'deceasedSpouseAge',
      required: true,
      show: scenarios.showDeceasedSpouseAge(values, site),
      className: 'mt-6',
      dataTestId: 'deceasedSpouseAge',
      options: [
        {
          id: 'deceasedSpouseAge-under24',
          value: 'deceasedSpouseAge-under24',
          label: lang('filingStatus.label.deceasedSpouseAge1'),
        },
        {
          id: 'deceasedSpouseAge-25-64',
          value: 'deceasedSpouseAge-25-64',
          label: lang('filingStatus.label.deceasedSpouseAge2'),
        },
        {
          id: 'deceasedSpouseAge-over65',
          value: 'deceasedSpouseAge-over65',
          label: lang('filingStatus.label.deceasedSpouseAge3'),
        },
      ]
    },
    {
      inputType: 'radio',
      label: lang('filingStatus.legend.claimChildren'),
      name: 'numOfDependents',
      id: 'numOfDependents',
      required: true,
      show: scenarios.showNumOfDependents(values, site),
      className: 'mt-6',
      dataTestId: 'numOfDependents',
      helpTip: {
        page: 'filingStatus',
        expanded: site.forms.filingStatus.helpTips.numOfDependents.open,
        ariaLabel: 'Claim Children - Help Tip',
        elements: () => ToolTips.numOfDependentsToolTip(langCode, year),
      },
      onChange: (e) => {
        setTimeout(() => {
          updateNum(site, siteDispatch, e.target.value, values, isCompleted, errors)
        }, 300)
      },
      options: [
        {
          id: 'numOfDependents-10',
          value: '10',
          label: lang('global.label.yes'),
        },
        {
          id: 'numOfDependents-0',
          value: '0',
          label: lang('global.label.no'),
        },
      ]
    },
    {
      inputType: 'radio',
      label: lang(fsCalc(values) === 'married'
        ? 'filingStatus.legend.us50PercentMarried'
        : 'filingStatus.legend.us50Percent', { ':year': year }),
      name: 'us50Percent',
      id: 'us50Percent',
      required: true,
      show: scenarios.showUs50Percent(values, fsCalc(values), site),
      className: 'mt-6',
      dataTestId: 'us50Percent',
      helpTip: {
        page: 'filingStatus',
        expanded: site.forms.filingStatus.helpTips.us50Percent.open,
        ariaLabel: 'Claim Dependent - Help Tip',
        elements: () => ToolTips.us50PercentToolTip(year),
      },
      options: [
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
      ]
    },
  ])
}

export const filingStatusARPAFormElements = (values, site, siteDispatch, lang, updateNum, isCompleted, errors) => {
  const { langCode } = useContext(HeaderContext)
  const { year } = site.forms.generalInfo.values
  const childIncomeThreshold = year ? params[year].childIncomeThreshold : ''

  return ([
    {
      inputType: 'radio',
      label: lang('filingStatus.legend.fsKnown', { ':year': year }),
      name: 'fsKnown',
      id: 'fsKnown',
      required: true,
      className: 'mt-6',
      dataTestId: 'fsKnown',
      options: [
        {
          id: 'fsKnown-yes',
          value: 'yes',
          label: lang('global.label.yes'),
        },
        {
          id: 'fsKnown-no',
          value: 'no',
          label: lang('global.label.no'),
        },
      ]
    },
    {
      inputType: 'radio',
      label: lang('filingStatus.legend.filingStatus', { ':year': year }),
      name: 'filingStatus',
      id: 'filingStatus',
      required: true,
      show: scenarios.showFilingStatus(values),
      className: 'mt-6',
      dataTestId: 'filingStatus',
      helpTip: {
        page: 'filingStatus',
        expanded: site.forms.filingStatus.helpTips.filingStatus.open,
        ariaLabel: 'Filing Status - Help Tip',
        elements: () => ToolTips.filingStatusToolTip(year),
      },
      options: [
        {
          id: 'filingStatus-single',
          value: 'single',
          label: lang('filingStatus.legend.filingStatus1'),
        },
        {
          id: 'filingStatus-hoh',
          value: 'head-of-household',
          label: lang('filingStatus.legend.filingStatus2'),
        },
        {
          id: 'filingStatus-qw',
          value: 'widow',
          label: lang('filingStatus.legend.filingStatus3'),
        },
        {
          id: 'filingStatus-mfj',
          value: 'married',
          label: lang('filingStatus.legend.filingStatus4'),
        },
        {
          id: 'filingStatus-mfs',
          value: 'married-separate',
          label: lang('filingStatus.legend.filingStatus5'),
        },
      ]
    },
    {
      inputType: 'radio',
      label: lang('filingStatus.legend.isMarriedHoH'),
      name: 'isMarriedHoH',
      id: 'isMarriedHoH',
      required: true,
      show: scenarios.showIsMarriedHoH(values, year),
      className: 'mt-6',
      dataTestId: 'isMarriedHoH',
      options: [
        {
          id: 'isMarriedHoH-yes',
          value: 'yes',
          label: lang('global.label.yes'),
        },
        {
          id: 'isMarriedHoH-no',
          value: 'no',
          label: lang('global.label.no'),
        },
      ]
    },
    {
      inputType: 'htmlBuilder',
      elements: [
        {
          key: 'fsToolHeading',
          type: 'Heading',
          level: '3',
          className: `font-bold text-xl mt-6 ${values.fsKnown === 'no' ? 'inline-block' : 'hidden'}
        }`,
          text: lang('filingStatus.h3.fsToolHeading'),
          dataTestID: 'filingStatusToolTitle'
        },
      ]
    },
    {
      inputType: 'radio',
      label: lang('filingStatus.legend.maritalStatus', { ':year': year }),
      name: 'maritalStatus',
      id: 'maritalStatus',
      required: true,
      show: scenarios.showMaritalStatus(values),
      className: 'mt-6',
      dataTestId: 'maritalStatus',
      helpTip: {
        page: 'filingStatus',
        expanded: site.forms.filingStatus.helpTips.maritalStatus.open,
        ariaLabel: 'Marital Status - Help Tip',
        elements: () => ToolTips.maritalStatusToolTip(),
      },
      options: [
        {
          id: 'maritalStatus-married',
          value: 'married',
          label: lang('filingStatus.legend.maritalStatus1'),
        },
        {
          id: 'maritalStatus-divorced',
          value: 'divorced',
          label: lang('filingStatus.legend.maritalStatus2'),
        },
        {
          id: 'maritalStatus-widow',
          value: 'widow',
          label: lang('filingStatus.legend.maritalStatus3'),
        },
        {
          id: 'maritalStatus-neverMarried',
          value: 'neverMarried',
          label: lang('filingStatus.legend.maritalStatus4'),
        },
      ]
    },
    {
      inputType: 'radio',
      label: lang('filingStatus.legend.fileJointReturn'),
      name: 'fileJointReturn',
      id: 'fileJointReturn',
      required: true,
      show: scenarios.showFileJointReturn(values),
      className: 'mt-6',
      dataTestId: 'fileJointReturn',
      helpTip: {
        page: 'filingStatus',
        expanded: site.forms.filingStatus.helpTips.fileJointReturn.open,
        ariaLabel: 'File Joint Return - Help Tip',
        elements: () => ToolTips.fileJointReturnToolTip(),
      },
      options: [
        {
          id: 'fileJointReturn-yes',
          value: 'yes',
          label: lang('global.label.yes'),
        },
        {
          id: 'fileJointReturn-no',
          value: 'no',
          label: lang('global.label.no'),
        },
      ]
    },
    {
      inputType: 'radio',
      label: lang('filingStatus.legend.spousesPassing'),
      name: 'spousesPassing',
      id: 'spousesPassing',
      required: true,
      show: scenarios.showSpousesPassing(values),
      className: 'mt-6',
      dataTestId: 'spousesPassing',
      options: [
        {
          id: 'spousesPassing-lastYear',
          value: 'lastYear',
          label: lang('filingStatus.legend.spousesPassing1', { ':year': year }),
        },
        {
          id: 'spousesPassing-last2Years',
          value: 'last2Years',
          label: lang('filingStatus.legend.spousesPassing2', { ':year1': year - 2, ':year2': year - 1 }),
        },
        {
          id: 'spousesPassing-3YearsPlus',
          value: '3YearsPlus',
          label: lang('filingStatus.legend.spousesPassing3', { ':year': year - 2 }),
        },
      ]
    },
    {
      inputType: 'radio',
      label: lang('filingStatus.legend.intendJointReturnDeceased', { ':year': year }),
      name: 'intendJointReturnDeceased',
      id: 'intendJointReturnDeceased',
      required: true,
      show: scenarios.showIntendJointReturnDeceased(values),
      className: 'mt-6',
      dataTestId: 'intendJointReturnDeceased',
      helpTip: {
        page: 'filingStatus',
        expanded: site.forms.filingStatus.helpTips.intendJointReturnDeceased.open,
        ariaLabel: 'Intend Joint Return - Help Tip',
        elements: () => ToolTips.intendJointReturnDeceasedToolTip(year),
      },
      options: [
        {
          id: 'intendJointReturnDeceased-yes',
          value: 'yes',
          label: lang('global.label.yes'),
        },
        {
          id: 'intendJointReturnDeceased-no',
          value: 'no',
          label: lang('global.label.no'),
        },
      ]
    },
    {
      inputType: 'radio',
      label: lang('filingStatus.legend.liveApartFromSpouse', { ':year': year }),
      name: 'liveWithSpouse',
      id: 'liveWithSpouse',
      required: true,
      show: scenarios.showLiveWithSpouse(values),
      className: 'mt-6',
      dataTestId: 'liveWithSpouse',
      helpTip: {
        page: 'filingStatus',
        expanded: site.forms.filingStatus.helpTips.liveWithSpouse.open,
        ariaLabel: 'Live with spouse - Help Tip',
        elements: () => ToolTips.liveWithSpouseToolTip(),
      },
      options: [
        {
          id: 'liveWithSpouse-yes',
          value: 'yes',
          label: lang('global.label.yes'),
        },
        {
          id: 'liveWithSpouse-no',
          value: 'no',
          label: lang('global.label.no'),
        },
      ]
    },
    {
      inputType: 'radio',
      label: lang('filingStatus.legend.houseUpkeep1', { ':year1': year, ':year2': year }),
      name: 'houseUpkeep1',
      id: 'houseUpkeep1',
      required: true,
      show: scenarios.showHouseUpkeep1(values),
      className: 'mt-6',
      dataTestId: 'houseUpkeep1',
      helpTip: {
        page: 'filingStatus',
        expanded: site.forms.filingStatus.helpTips.houseUpkeep1.open,
        ariaLabel: 'House Upkeep - Help Tip',
        elements: () => ToolTips.houseUpkeepToolTip(),
      },
      options: [
        {
          id: 'houseUpkeep1-yes',
          value: 'yes',
          label: lang('global.label.yes'),
        },
        {
          id: 'houseUpkeep1-no',
          value: 'no',
          label: lang('global.label.no'),
        },
      ]
    },
    {
      inputType: 'radio',
      label: lang('filingStatus.legend.entitledJointReturnDeceased'),
      name: 'entitledJointReturnDeceased',
      id: 'entitledJointReturnDeceased',
      required: true,
      show: scenarios.showEntitledJointReturnDeceased(values),
      className: 'mt-6',
      dataTestId: 'entitledJointReturnDeceased',
      options: [
        {
          id: 'entitledJointReturnDeceased-yes',
          value: 'yes',
          label: lang('global.label.yes'),
        },
        {
          id: 'entitledJointReturnDeceased-no',
          value: 'no',
          label: lang('global.label.no'),
        },
      ]
    },
    {
      inputType: 'radio',
      label: lang('filingStatus.legend.houseUpkeep2', { ':year1': year, ':year2': year }),
      name: 'houseUpkeep2',
      id: 'houseUpkeep2',
      required: true,
      show: scenarios.showHouseUpkeep2(values),
      className: 'mt-6',
      dataTestId: 'houseUpkeep2',
      helpTip: {
        page: 'filingStatus',
        expanded: site.forms.filingStatus.helpTips.houseUpkeep2.open,
        ariaLabel: 'House Upkeep - Help Tip',
        elements: () => ToolTips.houseUpkeepToolTip(),
      },
      options: [
        {
          id: 'houseUpkeep2-yes',
          value: 'yes',
          label: lang('global.label.yes'),
        },
        {
          id: 'houseUpkeep2-no',
          value: 'no',
          label: lang('global.label.no'),
        },
      ]
    },
    {
      inputType: 'radio',
      label: lang('filingStatus.legend.claimDependent1', { ':year': year }),
      name: 'claimDependent1',
      id: 'claimDependent1',
      required: true,
      show: scenarios.showClaimDependent1(values),
      className: 'mt-6',
      dataTestId: 'claimDependent1',
      helpTip: {
        page: 'filingStatus',
        expanded: site.forms.filingStatus.helpTips.claimDependent1.open,
        ariaLabel: 'Claim Dependent - Help Tip',
        elements: () => ToolTips.claimDependent1ToolTip(),
      },
      options: [
        {
          id: 'claimDependent1-yes',
          value: 'yes',
          label: lang('global.label.yes'),
        },
        {
          id: 'claimDependent1-no',
          value: 'no',
          label: lang('global.label.no'),
        },
      ]
    },
    {
      inputType: 'radio',
      label: lang('filingStatus.legend.claimDependent2', { ':year': year }),
      labelHTMLElements: [
        {
          key: 'test',
          type: 'List',
          className: 'ml-6 list list-disc',
          dataTestID: 'test',
          list: [
            lang('filingStatus.legend.claimDependent2Li1', { ':limit': childIncomeThreshold, ':year': year }),
            lang('filingStatus.legend.claimDependent2Li2'),
            lang('filingStatus.legend.claimDependent2Li3')
          ]
        }
      ],
      name: 'claimDependent2',
      id: 'claimDependent2',
      required: true,
      show: scenarios.showClaimDependent2(values),
      className: 'mt-6',
      dataTestId: 'claimDependent2',
      helpTip: {
        page: 'filingStatus',
        expanded: site.forms.filingStatus.helpTips.claimDependent2.open,
        ariaLabel: 'Claim Dependent - Help Tip',
        elements: () => ToolTips.claimDependent2ToolTip(),
      },
      options: [
        {
          id: 'claimDependent2-yes',
          value: 'yes',
          label: lang('global.label.yes'),
        },
        {
          id: 'claimDependent2-no',
          value: 'no',
          label: lang('global.label.no'),
        },
      ]
    },
    {
      inputType: 'radio',
      label: lang('filingStatus.legend.houseUpkeep3'),
      name: 'houseUpkeep3',
      id: 'houseUpkeep3',
      required: true,
      show: scenarios.showHouseUpkeep3(values),
      className: 'mt-6',
      dataTestId: 'houseUpkeep3',
      helpTip: {
        page: 'filingStatus',
        expanded: site.forms.filingStatus.helpTips.houseUpkeep3.open,
        ariaLabel: 'Claim Dependent - Help Tip',
        elements: () => ToolTips.houseUpkeepToolTip(),
      },
      options: [
        {
          id: 'houseUpkeep3-dependent',
          value: 'dependent',
          label: lang('filingStatus.label.houseUpkeep3Dependent'),
        },
        {
          id: 'houseUpkeep3-spousesChild',
          value: 'spousesChild',
          label: lang('filingStatus.label.houseUpkeep3SpousesChild'),
        },
        {
          id: 'houseUpkeep3-parent',
          value: 'parent',
          label: lang('filingStatus.label.houseUpkeep3Parent'),
        },
        {
          id: 'houseUpkeep3-none',
          value: 'none',
          label: lang('filingStatus.label.houseUpkeep3None'),
        },
      ]
    },
    {
      inputType: 'htmlBuilder',
      elements: [
        {
          key: 'fsToolResultTitle',
          type: 'Heading',
          level: '3',
          className: `font-bold text-xl mt-6 ${fsCalc(values) !== '' && values.fsKnown === 'no' ? 'inline-block' : 'hidden'}`,
          text: lang('filingStatus.h3.fsToolResultTitle'),
          dataTestID: 'fsToolResultTitle',
          replacements: [
            {
              type: 'bold',
              key: ':fsCalc',
              text: `global.label.${fsCalc(values)}`
            }
          ]
        },
      ]
    },
    {
      inputType: 'radio',
      label: lang('filingStatus.legend.deceasedSpouseValidSSN'),
      name: 'deceasedSpouseValidSSN',
      id: 'deceasedSpouseValidSSN',
      required: true,
      show: scenarios.showDeceasedSpouseValidSSN(values),
      className: 'mt-6',
      dataTestId: 'deceasedSpouseValidSSN',
      helpTip: {
        page: 'filingStatus',
        expanded: site.forms.filingStatus.helpTips.deceasedSpouseValidSSN.open,
        ariaLabel: 'Valid SSN - Help Tip',
        elements: () => ToolTips.spouseValidSSNToolTip(year),
      },
      options: [
        {
          id: 'deceasedSpouseValidSSN-yes',
          value: 'yes',
          label: lang('global.label.yes'),
        },
        {
          id: 'deceasedSpouseValidSSN-no',
          value: 'no',
          label: lang('global.label.no'),
        },
      ]
    },
    {
      inputType: 'radio',
      label: lang('filingStatus.legend.spouseValidSSN', { ':year': year }),
      name: 'spouseValidSSN',
      id: 'spouseValidSSN',
      required: true,
      show: scenarios.showSpouseValidSSN(values),
      className: 'mt-6',
      dataTestId: 'spouseValidSSN',
      helpTip: {
        page: 'filingStatus',
        expanded: site.forms.filingStatus.helpTips.spouseValidSSN.open,
        ariaLabel: 'Claim Dependent - Help Tip',
        elements: () => ToolTips.spouseValidSSNToolTip(year),
      },
      options: [
        {
          id: 'spouseValidSSN-yes',
          value: 'yes',
          label: lang('global.label.yes'),
        },
        {
          id: 'spouseValidSSN-no',
          value: 'no',
          label: lang('global.label.no'),
        },
      ]
    },
    {
      inputType: 'radio',
      label: lang('filingStatus.legend.wasSpouseAliveEndOfYear', { ':year': year }),
      name: 'wasSpouseAliveEndOfYear',
      id: 'wasSpouseAliveEndOfYear',
      required: true,
      show: scenarios.showWasSpouseAliveEndOfYear(values, site),
      className: 'mt-6',
      dataTestId: 'wasSpouseAliveEndOfYear',
      options: [
        {
          id: 'wasSpouseAliveEndOfYear-yes',
          value: 'yes',
          label: lang('global.label.yes'),
        },
        {
          id: 'wasSpouseAliveEndOfYear-no',
          value: 'no',
          label: lang('global.label.no'),
        },
      ]
    },
    {
      inputType: 'radio',
      label: lang('filingStatus.legend.spouseAge', { ':year': year }),
      name: 'spouseAge',
      id: 'spouseAge',
      required: true,
      show: scenarios.showSpouseAge(values, site),
      className: 'mt-6',
      dataTestId: 'spouseAge',
      options: [
        {
          id: 'spouseAge-under24',
          value: 'under24',
          label: lang('generalInfo.label.age1'),
        },
        {
          id: 'spouseAge-25-64',
          value: 'age-25-64',
          label: lang('generalInfo.label.age2'),
        },
        {
          id: 'spouseAge-over65',
          value: 'over65',
          label: lang('generalInfo.label.age3'),
        },
      ]
    },
    {
      inputType: 'radio',
      label: lang('filingStatus.legend.deceasedSpouseAge'),
      name: 'deceasedSpouseAge',
      id: 'deceasedSpouseAge',
      required: true,
      show: scenarios.showDeceasedSpouseAge(values, site),
      className: 'mt-6',
      dataTestId: 'deceasedSpouseAge',
      options: [
        {
          id: 'deceasedSpouseAge-under24',
          value: 'under24',
          label: lang('generalInfo.label.age1'),
        },
        {
          id: 'deceasedSpouseAge-25-64',
          value: 'age-25-64',
          label: lang('generalInfo.label.age2'),
        },
        {
          id: 'deceasedSpouseAge-over65',
          value: 'over65',
          label: lang('generalInfo.label.age3'),
        },
      ]
    },
    {
      inputType: 'radio',
      label: lang('filingStatus.legend.liveApartFromSpouse', { ':year': year }),
      name: 'liveApartFromSpouse',
      id: 'liveApartFromSpouse',
      required: true,
      show: scenarios.showLiveApartFromSpouse(values, year),
      className: 'mt-6',
      dataTestId: 'liveApartFromSpouse',
      options: [
        {
          id: 'liveApartFromSpouse-yes',
          value: 'yes',
          label: lang('global.label.yes'),
        },
        {
          id: 'liveApartFromSpouse-no',
          value: 'no',
          label: lang('global.label.no'),
        },
      ]
    },
    {
      inputType: 'radio',
      label: lang('filingStatus.legend.principalRes', { ':year': year }),
      replacements: [
        {
          type: 'bold',
          key: ':and',
          text: 'global.bold.and'
        }
      ],
      name: 'mfsPrincipalRes',
      id: 'mfsPrincipalRes',
      required: true,
      show: scenarios.showMfsPrincipalRes(values, year),
      className: 'mt-6',
      dataTestId: 'mfsPrincipalRes',
      options: [
        {
          id: 'mfsPrincipalRes-yes',
          value: 'yes',
          label: lang('global.label.yes'),
        },
        {
          id: 'mfsPrincipalRes-no',
          value: 'no',
          label: lang('global.label.no'),
        },
      ]
    },
    {
      inputType: 'radio',
      label: lang('filingStatus.legend.mfsLegalDoc', { ':year': year }),
      replacements: [
        {
          type: 'bold',
          key: ':and',
          text: 'global.bold.and'
        }
      ],
      name: 'mfsLegalDoc',
      id: 'mfsLegalDoc',
      required: true,
      show: scenarios.showMfsLegalDoc(values, year),
      className: 'mt-6',
      dataTestId: 'mfsLegalDoc',
      options: [
        {
          id: 'mfsLegalDoc-yes',
          value: 'yes',
          label: lang('global.label.yes'),
        },
        {
          id: 'mfsLegalDoc-no',
          value: 'no',
          label: lang('global.label.no'),
        },
      ]
    },
    {
      inputType: 'radio',
      label: lang('filingStatus.legend.claimChildren'),
      name: 'numOfDependents',
      id: 'numOfDependents',
      required: true,
      show: scenarios.showNumOfDependents(values, site),
      className: 'mt-6',
      dataTestId: 'numOfDependents',
      helpTip: {
        page: 'filingStatus',
        expanded: site.forms.filingStatus.helpTips.numOfDependents.open,
        ariaLabel: 'Claim Children - Help Tip',
        elements: () => ToolTips.numOfDependentsToolTip(langCode, year),
      },
      onChange: (e) => {
        setTimeout(() => {
          updateNum(site, siteDispatch, e.target.value, values, isCompleted, errors)
        }, 300)
      },
      options: [
        {
          id: 'numOfDependents-10',
          value: '10',
          label: lang('global.label.yes'),
        },
        {
          id: 'numOfDependents-0',
          value: '0',
          label: lang('global.label.no'),
        },
      ]
    },
    {
      inputType: 'radio',
      label: lang(fsCalc(values) === 'married'
        ? 'filingStatus.legend.us50PercentMarried'
        : 'filingStatus.legend.us50Percent', { ':year': year }),
      name: 'us50Percent',
      id: 'us50Percent',
      required: true,
      show: scenarios.showUs50Percent(values, fsCalc(values), site),
      className: 'mt-6',
      dataTestId: 'us50Percent',
      helpTip: {
        page: 'filingStatus',
        expanded: site.forms.filingStatus.helpTips.us50Percent.open,
        ariaLabel: 'Claim Dependent - Help Tip',
        elements: () => ToolTips.us50PercentToolTip(year),
      },
      options: [
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
      ]
    },
  ])
}

//adding form for 2021
export const filingStatusARPAFormElements21 = (values, site, siteDispatch, lang, updateNum, isCompleted, errors) => {
  const { langCode } = useContext(HeaderContext)
  const { year } = site.forms.generalInfo.values
  const childIncomeThreshold = year ? params[year].childIncomeThreshold : ''

  return ([
    {
      inputType: 'radio',
      label: lang('filingStatus.legend.fsKnown', { ':year': year }),
      name: 'fsKnown',
      id: 'fsKnown',
      required: true,
      className: 'mt-6',
      dataTestId: 'fsKnown',
      options: [
        {
          id: 'fsKnown-yes',
          value: 'yes',
          label: lang('global.label.yes'),
        },
        {
          id: 'fsKnown-no',
          value: 'no',
          label: lang('global.label.no'),
        },
      ]
    },
    {
      inputType: 'radio',
      label: lang('filingStatus.legend.filingStatus', { ':year': year }),
      name: 'filingStatus',
      id: 'filingStatus',
      required: true,
      show: scenarios.showFilingStatus(values),
      className: 'mt-6',
      dataTestId: 'filingStatus',
      helpTip: {
        page: 'filingStatus',
        expanded: site.forms.filingStatus.helpTips.filingStatus.open,
        ariaLabel: 'Filing Status - Help Tip',
        elements: () => ToolTips.filingStatusToolTip(year),
      },
      options: [
        {
          id: 'filingStatus-single',
          value: 'single',
          label: lang('filingStatus.legend.filingStatus1'),
        },
        {
          id: 'filingStatus-hoh',
          value: 'head-of-household',
          label: lang('filingStatus.legend.filingStatus2'),
        },
        {
          id: 'filingStatus-qw',
          value: 'widow',
          label: lang('filingStatus.legend.filingStatus6'),
        },
        {
          id: 'filingStatus-mfj',
          value: 'married',
          label: lang('filingStatus.legend.filingStatus4'),
        },
        {
          id: 'filingStatus-mfs',
          value: 'married-separate',
          label: lang('filingStatus.legend.filingStatus5'),
        },
      ]
    },
    {
      inputType: 'radio',
      label: lang('filingStatus.legend.isMarriedHoH'),
      name: 'isMarriedHoH',
      id: 'isMarriedHoH',
      required: true,
      show: scenarios.showIsMarriedHoH(values, year),
      className: 'mt-6',
      dataTestId: 'isMarriedHoH',
      options: [
        {
          id: 'isMarriedHoH-yes',
          value: 'yes',
          label: lang('global.label.yes'),
        },
        {
          id: 'isMarriedHoH-no',
          value: 'no',
          label: lang('global.label.no'),
        },
      ]
    },
    {
      inputType: 'htmlBuilder',
      elements: [
        {
          key: 'fsToolHeading',
          type: 'Heading',
          level: '3',
          className: `font-bold text-xl mt-6 ${values.fsKnown === 'no' ? 'inline-block' : 'hidden'}
        }`,
          text: lang('filingStatus.h3.fsToolHeading'),
          dataTestID: 'filingStatusToolTitle'
        },
      ]
    },
    {
      inputType: 'radio',
      label: lang('filingStatus.legend.maritalStatus', { ':year': year }),
      name: 'maritalStatus',
      id: 'maritalStatus',
      required: true,
      show: scenarios.showMaritalStatus(values),
      className: 'mt-6',
      dataTestId: 'maritalStatus',
      helpTip: {
        page: 'filingStatus',
        expanded: site.forms.filingStatus.helpTips.maritalStatus.open,
        ariaLabel: 'Marital Status - Help Tip',
        elements: () => ToolTips.maritalStatusToolTip(),
      },
      options: [
        {
          id: 'maritalStatus-married',
          value: 'married',
          label: lang('filingStatus.legend.maritalStatus1'),
        },
        {
          id: 'maritalStatus-divorced',
          value: 'divorced',
          label: lang('filingStatus.legend.maritalStatus2'),
        },
        {
          id: 'maritalStatus-widow',
          value: 'widow',
          label: lang('filingStatus.legend.maritalStatus5'),
        },
        {
          id: 'maritalStatus-neverMarried',
          value: 'neverMarried',
          label: lang('filingStatus.legend.maritalStatus4'),
        },
      ]
    },
    {
      inputType: 'radio',
      label: lang('filingStatus.legend.fileJointReturn'),
      name: 'fileJointReturn',
      id: 'fileJointReturn',
      required: true,
      show: scenarios.showFileJointReturn(values),
      className: 'mt-6',
      dataTestId: 'fileJointReturn',
      helpTip: {
        page: 'filingStatus',
        expanded: site.forms.filingStatus.helpTips.fileJointReturn.open,
        ariaLabel: 'File Joint Return - Help Tip',
        elements: () => ToolTips.fileJointReturnToolTip(),
      },
      options: [
        {
          id: 'fileJointReturn-yes',
          value: 'yes',
          label: lang('global.label.yes'),
        },
        {
          id: 'fileJointReturn-no',
          value: 'no',
          label: lang('global.label.no'),
        },
      ]
    },
    {
      inputType: 'radio',
      label: lang('filingStatus.legend.spousesPassing'),
      name: 'spousesPassing',
      id: 'spousesPassing',
      required: true,
      show: scenarios.showSpousesPassing(values),
      className: 'mt-6',
      dataTestId: 'spousesPassing',
      options: [
        {
          id: 'spousesPassing-lastYear',
          value: 'lastYear',
          label: lang('filingStatus.legend.spousesPassing1', { ':year': year }),
        },
        {
          id: 'spousesPassing-last2Years',
          value: 'last2Years',
          label: lang('filingStatus.legend.spousesPassing2', { ':year1': year - 2, ':year2': year - 1 }),
        },
        {
          id: 'spousesPassing-3YearsPlus',
          value: '3YearsPlus',
          label: lang('filingStatus.legend.spousesPassing3', { ':year': year - 2 }),
        },
      ]
    },
    {
      inputType: 'radio',
      label: lang('filingStatus.legend.intendJointReturnDeceased', { ':year': year }),
      name: 'intendJointReturnDeceased',
      id: 'intendJointReturnDeceased',
      required: true,
      show: scenarios.showIntendJointReturnDeceased(values),
      className: 'mt-6',
      dataTestId: 'intendJointReturnDeceased',
      helpTip: {
        page: 'filingStatus',
        expanded: site.forms.filingStatus.helpTips.intendJointReturnDeceased.open,
        ariaLabel: 'Intend Joint Return - Help Tip',
        elements: () => ToolTips.intendJointReturnDeceasedToolTip(year),
      },
      options: [
        {
          id: 'intendJointReturnDeceased-yes',
          value: 'yes',
          label: lang('global.label.yes'),
        },
        {
          id: 'intendJointReturnDeceased-no',
          value: 'no',
          label: lang('global.label.no'),
        },
      ]
    },
    {
      inputType: 'radio',
      label: lang('filingStatus.legend.liveWithSpouse', { ':year': year }),
      name: 'liveWithSpouse',
      id: 'liveWithSpouse',
      required: true,
      show: scenarios.showLiveWithSpouse(values),
      className: 'mt-6',
      dataTestId: 'liveWithSpouse',
      helpTip: {
        page: 'filingStatus',
        expanded: site.forms.filingStatus.helpTips.liveWithSpouse.open,
        ariaLabel: 'Live with spouse - Help Tip',
        elements: () => ToolTips.liveWithSpouseToolTip(),
      },
      options: [
        {
          id: 'liveWithSpouse-yes',
          value: 'yes',
          label: lang('global.label.yes'),
        },
        {
          id: 'liveWithSpouse-no',
          value: 'no',
          label: lang('global.label.no'),
        },
      ]
    },
    {
      inputType: 'radio',
      label: lang('filingStatus.legend.houseUpkeep1', { ':year1': year, ':year2': year }),
      name: 'houseUpkeep1',
      id: 'houseUpkeep1',
      required: true,
      show: scenarios.showHouseUpkeep1(values),
      className: 'mt-6',
      dataTestId: 'houseUpkeep1',
      helpTip: {
        page: 'filingStatus',
        expanded: site.forms.filingStatus.helpTips.houseUpkeep1.open,
        ariaLabel: 'House Upkeep - Help Tip',
        elements: () => ToolTips.houseUpkeepToolTip(),
      },
      options: [
        {
          id: 'houseUpkeep1-yes',
          value: 'yes',
          label: lang('global.label.yes'),
        },
        {
          id: 'houseUpkeep1-no',
          value: 'no',
          label: lang('global.label.no'),
        },
      ]
    },
    {
      inputType: 'radio',
      label: lang('filingStatus.legend.entitledJointReturnDeceased'),
      name: 'entitledJointReturnDeceased',
      id: 'entitledJointReturnDeceased',
      required: true,
      show: scenarios.showEntitledJointReturnDeceased(values),
      className: 'mt-6',
      dataTestId: 'entitledJointReturnDeceased',
      options: [
        {
          id: 'entitledJointReturnDeceased-yes',
          value: 'yes',
          label: lang('global.label.yes'),
        },
        {
          id: 'entitledJointReturnDeceased-no',
          value: 'no',
          label: lang('global.label.no'),
        },
      ]
    },
    {
      inputType: 'radio',
      label: lang('filingStatus.legend.houseUpkeep2', { ':year1': year, ':year2': year }),
      name: 'houseUpkeep2',
      id: 'houseUpkeep2',
      required: true,
      show: scenarios.showHouseUpkeep2(values),
      className: 'mt-6',
      dataTestId: 'houseUpkeep2',
      helpTip: {
        page: 'filingStatus',
        expanded: site.forms.filingStatus.helpTips.houseUpkeep2.open,
        ariaLabel: 'House Upkeep - Help Tip',
        elements: () => ToolTips.houseUpkeepToolTip(),
      },
      options: [
        {
          id: 'houseUpkeep2-yes',
          value: 'yes',
          label: lang('global.label.yes'),
        },
        {
          id: 'houseUpkeep2-no',
          value: 'no',
          label: lang('global.label.no'),
        },
      ]
    },
    {
      inputType: 'radio',
      label: lang('filingStatus.legend.claimDependent1', { ':year': year }),
      name: 'claimDependent1',
      id: 'claimDependent1',
      required: true,
      show: scenarios.showClaimDependent1(values),
      className: 'mt-6',
      dataTestId: 'claimDependent1',
      helpTip: {
        page: 'filingStatus',
        expanded: site.forms.filingStatus.helpTips.claimDependent1.open,
        ariaLabel: 'Claim Dependent - Help Tip',
        elements: () => ToolTips.claimDependent1ToolTip(),
      },
      options: [
        {
          id: 'claimDependent1-yes',
          value: 'yes',
          label: lang('global.label.yes'),
        },
        {
          id: 'claimDependent1-no',
          value: 'no',
          label: lang('global.label.no'),
        },
      ]
    },
    {
      inputType: 'radio',
      label: lang('filingStatus.legend.claimDependent2', { ':year': year }),
      labelHTMLElements: [
        {
          key: 'test',
          type: 'List',
          className: 'ml-6 list list-disc',
          dataTestID: 'test',
          list: [
            lang('filingStatus.legend.claimDependent2Li1', { ':limit': childIncomeThreshold, ':year': year }),
            lang('filingStatus.legend.claimDependent2Li2'),
            lang('filingStatus.legend.claimDependent2Li3')
          ]
        }
      ],
      name: 'claimDependent2',
      id: 'claimDependent2',
      required: true,
      show: scenarios.showClaimDependent2(values),
      className: 'mt-6',
      dataTestId: 'claimDependent2',
      helpTip: {
        page: 'filingStatus',
        expanded: site.forms.filingStatus.helpTips.claimDependent2.open,
        ariaLabel: 'Claim Dependent - Help Tip',
        elements: () => ToolTips.claimDependent2ToolTip(),
      },
      options: [
        {
          id: 'claimDependent2-yes',
          value: 'yes',
          label: lang('global.label.yes'),
        },
        {
          id: 'claimDependent2-no',
          value: 'no',
          label: lang('global.label.no'),
        },
      ]
    },
    {
      inputType: 'radio',
      label: lang('filingStatus.legend.houseUpkeep3'),
      name: 'houseUpkeep3',
      id: 'houseUpkeep3',
      required: true,
      show: scenarios.showHouseUpkeep3(values),
      className: 'mt-6',
      dataTestId: 'houseUpkeep3',
      helpTip: {
        page: 'filingStatus',
        expanded: site.forms.filingStatus.helpTips.houseUpkeep3.open,
        ariaLabel: 'Claim Dependent - Help Tip',
        elements: () => ToolTips.houseUpkeepToolTip(),
      },
      options: [
        {
          id: 'houseUpkeep3-dependent',
          value: 'dependent',
          label: lang('filingStatus.label.houseUpkeep3Dependent'),
        },
        {
          id: 'houseUpkeep3-spousesChild',
          value: 'spousesChild',
          label: lang('filingStatus.label.houseUpkeep3SpousesChild'),
        },
        {
          id: 'houseUpkeep3-parent',
          value: 'parent',
          label: lang('filingStatus.label.houseUpkeep3Parent'),
        },
        {
          id: 'houseUpkeep3-none',
          value: 'none',
          label: lang('filingStatus.label.houseUpkeep3None'),
        },
      ]
    },
    {
      inputType: 'htmlBuilder',
      elements: [
        {
          key: 'fsToolResultTitle',
          type: 'Heading',
          level: '3',
          className: `font-bold text-xl mt-6 ${fsCalc(values) !== '' && values.fsKnown === 'no' ? 'inline-block' : 'hidden'}`,
          text: lang('filingStatus.h3.fsToolResultTitle'),
          dataTestID: 'fsToolResultTitle',
          replacements: [
            {
              type: 'bold',
              key: ':fsCalc',
              text: `global.label.${fsCalc(values)}`
            }
          ]
        },
      ]
    },
    {
      inputType: 'radio',
      label: lang('filingStatus.legend.deceasedSpouseValidSSN'),
      name: 'deceasedSpouseValidSSN',
      id: 'deceasedSpouseValidSSN',
      required: true,
      show: scenarios.showDeceasedSpouseValidSSN(values),
      className: 'mt-6',
      dataTestId: 'deceasedSpouseValidSSN',
      helpTip: {
        page: 'filingStatus',
        expanded: site.forms.filingStatus.helpTips.deceasedSpouseValidSSN.open,
        ariaLabel: 'Valid SSN - Help Tip',
        elements: () => ToolTips.spouseValidSSNToolTip(year),
      },
      options: [
        {
          id: 'deceasedSpouseValidSSN-yes',
          value: 'yes',
          label: lang('global.label.yes'),
        },
        {
          id: 'deceasedSpouseValidSSN-no',
          value: 'no',
          label: lang('global.label.no'),
        },
      ]
    },
    {
      inputType: 'radio',
      label: lang('filingStatus.legend.spouseValidSSN', { ':year': year }),
      name: 'spouseValidSSN',
      id: 'spouseValidSSN',
      required: true,
      show: scenarios.showSpouseValidSSN(values),
      className: 'mt-6',
      dataTestId: 'spouseValidSSN',
      helpTip: {
        page: 'filingStatus',
        expanded: site.forms.filingStatus.helpTips.spouseValidSSN.open,
        ariaLabel: 'Claim Dependent - Help Tip',
        elements: () => ToolTips.spouseValidSSNToolTip(year),
      },
      options: [
        {
          id: 'spouseValidSSN-yes',
          value: 'yes',
          label: lang('global.label.yes'),
        },
        {
          id: 'spouseValidSSN-no',
          value: 'no',
          label: lang('global.label.no'),
        },
      ]
    },
    {
      inputType: 'radio',
      label: lang('filingStatus.legend.wasSpouseAliveEndOfYear', { ':year': year }),
      name: 'wasSpouseAliveEndOfYear',
      id: 'wasSpouseAliveEndOfYear',
      required: true,
      show: scenarios.showWasSpouseAliveEndOfYear(values, site),
      className: 'mt-6',
      dataTestId: 'wasSpouseAliveEndOfYear',
      options: [
        {
          id: 'wasSpouseAliveEndOfYear-yes',
          value: 'yes',
          label: lang('global.label.yes'),
        },
        {
          id: 'wasSpouseAliveEndOfYear-no',
          value: 'no',
          label: lang('global.label.no'),
        },
      ]
    },
    {
      inputType: 'radio',
      label: lang('filingStatus.legend.spouseAge', { ':year': year }),
      name: 'spouseAge',
      id: 'spouseAge',
      required: true,
      show: scenarios.showSpouseAge(values, site),
      className: 'mt-6',
      dataTestId: 'spouseAge',
      options: [
        {
          id: 'spouseAge-17under',
          value: '17under',
          label: lang('global.label.17Under'),
        },
        {
          id: 'spouseAge-18',
          value: '18',
          label: lang('global.label.18'),
        },
        {
          id: 'spouseAge-19-23',
          value: '19-23',
          label: lang('global.label.19-23'),
        },
        {
          id: 'spouseAge-24over',
          value: '24over',
          label: lang('global.label.24Over'),
        },
      ]
    },
    {
      inputType: 'radio',
      label: lang('filingStatus.legend.spouseQualifiedHomelessYouth', { ':year': year }),
      name: 'spouseQualifiedHomelessYouth',
      id: 'spouseQualifiedHomelessYouth',
      required: true,
      show: scenarios.showSpouseQualifiedHomelessYouth(values, site),
      className: 'mt-6',
      helpTip: {
        page: 'filingStatus',
        expanded: site.forms.filingStatus.helpTips.spouseQualifiedHomelessYouth.open,
        ariaLabel: 'Qualified Foster Youth - Help Tip',
        elements: () => ToolTips.spouseQualifiedHomelessYouthToolTip(),
      },
      dataTestId: 'spouseQualifiedHomelessYouth',
      options: [
        {
          id: 'spouseQualifiedHomelessYouth-yes',
          value: 'yes',
          label: lang('global.label.yes'),
        },
        {
          id: 'spouseQualifiedHomelessYouth-no',
          value: 'no',
          label: lang('global.label.no'),
        },
      ]
    },
    {
      inputType: 'radio',
      label: lang('filingStatus.legend.spouseStudent', { ':year': year }),
      name: 'spouseStudent',
      id: 'spouseStudent',
      required: true,
      show: scenarios.showSpouseStudent(values, site),
      className: 'mt-6',
      helpTip: {
        page: 'filingStatus',
        expanded: site.forms.filingStatus.helpTips.spouseStudent.open,
        ariaLabel: 'Spouse Student - Help Tip',
        elements: () => ToolTips.spouseStudentToolTip(year),
      },
      dataTestId: 'spouseStudent',
      options: [
        {
          id: 'spouseStudent-yes',
          value: 'yes',
          label: lang('global.label.yes'),
        },
        {
          id: 'spouseStudent-no',
          value: 'no',
          label: lang('global.label.no'),
        },
      ]
    },
    {
      inputType: 'radio',
      label: lang('filingStatus.legend.deceasedSpouseAge'),
      name: 'deceasedSpouseAge',
      id: 'deceasedSpouseAge',
      required: true,
      show: scenarios.showDeceasedSpouseAge(values, site),
      className: 'mt-6',
      dataTestId: 'deceasedSpouseAge',
      options: [
        {
          id: 'deceasedSpouseAge-17under',
          value: '17under',
          label: lang('global.label.17Under'),
        },
        {
          id: 'deceasedSpouseAge-18',
          value: '18',
          label: lang('global.label.18'),
        },
        {
          id: 'deceasedSpouseAge-19-23',
          value: '19-23',
          label: lang('global.label.19-23'),
        },
        {
          id: 'deceasedSpouseAge-24over',
          value: '24over',
          label: lang('global.label.24Over'),
        },
      ]
    },
    {
      inputType: 'radio',
      label: lang('filingStatus.legend.deceasedSpouseQualifiedHomelessYouth', { ':year': year }),
      name: 'deceasedSpouseQualifiedHomelessYouth',
      id: 'deceasedSpouseQualifiedHomelessYouth',
      required: true,
      show: scenarios.showDeceasedSpouseQualifiedHomelessYouth(values, site),
      className: 'mt-6',
      helpTip: {
        page: 'filingStatus',
        expanded: site.forms.filingStatus.helpTips.deceasedSpouseQualifiedHomelessYouth.open,
        ariaLabel: 'Qualified Foster Youth - Help Tip',
        elements: () => ToolTips.deceasedSpouseQualifiedHomelessYouthToolTip(),
      },
      dataTestId: 'deceasedSpouseQualifiedHomelessYouth',
      options: [
        {
          id: 'deceasedSpouseQualifiedHomelessYouth-yes',
          value: 'yes',
          label: lang('global.label.yes'),
        },
        {
          id: 'deceasedSpouseQualifiedHomelessYouth-no',
          value: 'no',
          label: lang('global.label.no'),
        },
      ]
    },
    {
      inputType: 'radio',
      label: lang('filingStatus.legend.deceasedSpouseStudent', { ':year': year }),
      name: 'deceasedSpouseStudent',
      id: 'deceasedSpouseStudent',
      required: true,
      show: scenarios.showDeceasedSpouseStudent(values, site),
      className: 'mt-6',
      helpTip: {
        page: 'filingStatus',
        expanded: site.forms.filingStatus.helpTips.deceasedSpouseStudent.open,
        ariaLabel: 'Deceased Spouse Student - Help Tip',
        elements: () => ToolTips.spouseStudentToolTip(year),
      },
      dataTestId: 'deceasedSpouseStudent',
      options: [
        {
          id: 'deceasedSpouseStudent-yes',
          value: 'yes',
          label: lang('global.label.yes'),
        },
        {
          id: 'deceasedSpouseStudent-no',
          value: 'no',
          label: lang('global.label.no'),
        },
      ]
    },
    {
      inputType: 'radio',
      label: lang('filingStatus.legend.liveApartFromSpouse', { ':year': year }),
      name: 'liveApartFromSpouse',
      id: 'liveApartFromSpouse',
      required: true,
      show: scenarios.showLiveApartFromSpouse(values, year),
      className: 'mt-6',
      dataTestId: 'liveApartFromSpouse',
      helpTip: {
        page: 'filingStatus',
        expanded: site.forms.filingStatus.helpTips.liveWithSpouse.open,
        ariaLabel: 'Live with spouse - Help Tip',
        elements: () => ToolTips.liveWithSpouseToolTip(),
      },
      options: [
        {
          id: 'liveApartFromSpouse-yes',
          value: 'yes',
          label: lang('global.label.yes'),
        },
        {
          id: 'liveApartFromSpouse-no',
          value: 'no',
          label: lang('global.label.no'),
        },
      ]
    },
    {
      inputType: 'radio',
      label: lang('filingStatus.legend.mfsLegalDoc2', { ':year': year }),
      replacements: [
        {
          type: 'bold',
          key: ':and',
          text: 'global.bold.and'
        }
      ],
      name: 'mfsLegalDoc',
      id: 'mfsLegalDoc',
      required: true,
      show: scenarios.showMfsLegalDoc(values, year),
      className: 'mt-6',
      dataTestId: 'mfsLegalDoc',
      options: [
        {
          id: 'mfsLegalDoc-yes',
          value: 'yes',
          label: lang('global.label.yes'),
        },
        {
          id: 'mfsLegalDoc-no',
          value: 'no',
          label: lang('global.label.no'),
        },
      ]
    },
    {
      inputType: 'radio',
      label: lang('filingStatus.legend.claimChildren'),
      name: 'numOfDependents',
      id: 'numOfDependents',
      required: true,
      show: scenarios.showNumOfDependents(values, site),
      className: 'mt-6',
      dataTestId: 'numOfDependents',
      helpTip: {
        page: 'filingStatus',
        expanded: site.forms.filingStatus.helpTips.numOfDependents.open,
        ariaLabel: 'Claim Children - Help Tip',
        elements: () => ToolTips.numOfDependentsToolTip(langCode, year),
      },
      onChange: (e) => {
        setTimeout(() => {
          updateNum(site, siteDispatch, e.target.value, values, isCompleted, errors)
        }, 300)
      },
      options: [
        {
          id: 'numOfDependents-10',
          value: '10',
          label: lang('global.label.yes'),
        },
        {
          id: 'numOfDependents-0',
          value: '0',
          label: lang('global.label.no'),
        },
      ]
    },
    {
      inputType: 'radio',
      label: lang(fsCalc(values) === 'married'
        ? 'filingStatus.legend.us50PercentMarried'
        : 'filingStatus.legend.us50Percent', { ':year': year }),
      name: 'us50Percent',
      id: 'us50Percent',
      required: true,
      show: scenarios.showUs50Percent(values, fsCalc(values), site),
      className: 'mt-6',
      dataTestId: 'us50Percent',
      helpTip: {
        page: 'filingStatus',
        expanded: site.forms.filingStatus.helpTips.us50Percent.open,
        ariaLabel: 'Claim Dependent - Help Tip',
        elements: () => ToolTips.us50PercentToolTip(year),
      },
      options: [
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
      ]
    },
  ])
} 