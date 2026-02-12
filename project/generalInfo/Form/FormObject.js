import * as ToolTips from '../Structure/ToolTipsHtml'

// SCENARIOS
export const showCitizen = (values) => values.year !== ''
export const showValidSSN = (values) => showCitizen(values) && values.citizen === 'yes'
export const showForeignIncome = (values) => (showValidSSN(values) && values.validSSN === 'yes')
export const showClaimedAsDependent = (values) => (showForeignIncome(values) && values.foreignIncome === 'no')
export const showAge = (values) => (showClaimedAsDependent(values) && values.claimedAsDependent === 'no')
export const showQualifiedHomelessYouth = (values) => (showAge(values) && (values.age === '18' || values.age === '19-23'))
export const showStudent = (values) => (showQualifiedHomelessYouth(values)
  && values.qualifiedHomelessYouth === 'no'
  && values.age === '19-23')

// FORM ELEMENTS
export const generalInfoFormElements = (values, site, lang) => ([
  {
    inputType: 'radio',
    label: lang('generalInfo.legend.citizen', { ':year': values.year }),
    name: 'citizen',
    id: 'citizen',
    required: true,
    show: showCitizen(values),
    className: 'mt-6',
    dataTestId: 'citizen',
    helpTip: {
      page: 'generalInfo',
      expanded: site.forms.generalInfo.helpTips.citizen.open,
      ariaLabel: 'Citizen - Help Tip',
      elements: () => ToolTips.citizenToolTip(),
    },
    options: [
      {
        id: 'citizen-yes',
        value: 'yes',
        label: lang('global.label.yes'),
      },
      {
        id: 'citizen-no',
        value: 'no',
        label: lang('global.label.no'),
      },
    ]
  },
  {
    inputType: 'radio',
    label: lang('generalInfo.legend.validSSN', { ':year': values.year }),
    name: 'validSSN',
    id: 'validSSN',
    required: true,
    show: showValidSSN(values),
    className: 'mt-6',
    dataTestId: 'validSSN',
    helpTip: {
      page: 'generalInfo',
      expanded: site.forms.generalInfo.helpTips.validSSN.open,
      ariaLabel: 'Valid SSN - Help Tip',
      elements: () => ToolTips.validSSNToolTip(values.year),
    },
    options: [
      {
        id: 'validSSN-yes',
        value: 'yes',
        label: lang('global.label.yes'),
      },
      {
        id: 'validSSN-no',
        value: 'no',
        label: lang('global.label.no'),
      },
    ]
  },
  {
    inputType: 'radio',
    label: lang('generalInfo.legend.foreignIncome'),
    name: 'foreignIncome',
    id: 'foreignIncome',
    required: true,
    show: showForeignIncome(values),
    className: 'mt-6',
    dataTestId: 'foreignIncome',
    helpTip: {
      page: 'generalInfo',
      expanded: site.forms.generalInfo.helpTips.foreignIncome.open,
      ariaLabel: 'Foreign Income - Help Tip',
      elements: () => ToolTips.foreignIncomeToolTip(),
    },
    options: [
      {
        id: 'foreignIncome-yes',
        value: 'yes',
        label: lang('global.label.yes'),
      },
      {
        id: 'foreignIncome-no',
        value: 'no',
        label: lang('global.label.no'),
      },
    ]
  },
  {
    inputType: 'radio',
    label: lang('generalInfo.legend.claimedAsDependent'),
    name: 'claimedAsDependent',
    id: 'claimedAsDependent',
    required: true,
    show: showClaimedAsDependent(values),
    className: 'mt-6',
    dataTestId: 'claimedAsDependent',
    helpTip: {
      page: 'generalInfo',
      expanded: site.forms.generalInfo.helpTips.claimedAsDependent.open,
      ariaLabel: 'Claimed as dependent - Help Tip',
      elements: () => ToolTips.claimedAsDependentToolTip(),
    },
    options: [
      {
        id: 'claimedAsDependent-yes',
        value: 'yes',
        label: lang('global.label.yes'),
      },
      {
        id: 'claimedAsDependent-no',
        value: 'no',
        label: lang('global.label.no'),
      },
    ]
  },
  {
    inputType: 'radio',
    label: lang('generalInfo.legend.age', { ':year': values.year }),
    name: 'age',
    id: 'age',
    required: true,
    show: showAge(values),
    className: 'mt-6',
    dataTestId: `age-${values.year}`,
    options: [
      {
        id: 'age-under24',
        value: 'under24',
        label: lang('generalInfo.label.age1'),
      },
      {
        id: 'age-25-64',
        value: 'age-25-64',
        label: lang('generalInfo.label.age2'),
      },
      {
        id: 'age-over65',
        value: 'over65',
        label: lang('generalInfo.label.age3'),
      },
    ]
  },
])

export const generalInfoARPAFormElements = (values, site, lang) => ([
  {
    inputType: 'radio',
    label: lang('generalInfo.legend.citizen', { ':year': values.year }),
    name: 'citizen',
    id: 'citizen',
    required: true,
    show: showCitizen(values),
    className: 'mt-6',
    dataTestId: 'citizen',
    helpTip: {
      page: 'generalInfo',
      expanded: site.forms.generalInfo.helpTips.citizen.open,
      ariaLabel: 'Citizen - Help Tip',
      elements: () => ToolTips.citizenToolTip(),
    },
    options: [
      {
        id: 'citizen-yes',
        value: 'yes',
        label: lang('global.label.yes'),
      },
      {
        id: 'citizen-no',
        value: 'no',
        label: lang('global.label.no'),
      },
    ]
  },
  {
    inputType: 'radio',
    label: lang('generalInfo.legend.validSSN', { ':year': values.year }),
    name: 'validSSN',
    id: 'validSSN',
    required: true,
    show: showValidSSN(values),
    className: 'mt-6',
    dataTestId: 'validSSN',
    helpTip: {
      page: 'generalInfo',
      expanded: site.forms.generalInfo.helpTips.validSSN.open,
      ariaLabel: 'Valid SSN - Help Tip',
      elements: () => ToolTips.validSSNToolTip(values.year),
    },
    options: [
      {
        id: 'validSSN-yes',
        value: 'yes',
        label: lang('global.label.yes'),
      },
      {
        id: 'validSSN-no',
        value: 'no',
        label: lang('global.label.no'),
      },
    ]
  },
  {
    inputType: 'radio',
    label: lang('generalInfo.legend.foreignIncome'),
    name: 'foreignIncome',
    id: 'foreignIncome',
    required: true,
    show: showForeignIncome(values),
    className: 'mt-6',
    dataTestId: 'foreignIncome',
    helpTip: {
      page: 'generalInfo',
      expanded: site.forms.generalInfo.helpTips.foreignIncome.open,
      ariaLabel: 'Foreign Income - Help Tip',
      elements: () => ToolTips.foreignIncomeToolTip(),
    },
    options: [
      {
        id: 'foreignIncome-yes',
        value: 'yes',
        label: lang('global.label.yes'),
      },
      {
        id: 'foreignIncome-no',
        value: 'no',
        label: lang('global.label.no'),
      },
    ]
  },
  {
    inputType: 'radio',
    label: lang('generalInfo.legend.claimedAsDependent'),
    name: 'claimedAsDependent',
    id: 'claimedAsDependent',
    required: true,
    show: showClaimedAsDependent(values),
    className: 'mt-6',
    dataTestId: 'claimedAsDependent',
    helpTip: {
      page: 'generalInfo',
      expanded: site.forms.generalInfo.helpTips.claimedAsDependent.open,
      ariaLabel: 'Claimed as dependent - Help Tip',
      elements: () => ToolTips.claimedAsDependentToolTip(),
    },
    options: [
      {
        id: 'claimedAsDependent-yes',
        value: 'yes',
        label: lang('global.label.yes'),
      },
      {
        id: 'claimedAsDependent-no',
        value: 'no',
        label: lang('global.label.no'),
      },
    ]
  },
  {
    inputType: 'radio',
    label: lang('generalInfo.legend.age', { ':year': values.year }),
    name: 'age',
    id: 'age',
    required: true,
    show: showAge(values),
    className: 'mt-6',
    dataTestId: `age-${values.year}`,
    options: [
       {
        id: 'age-under24',
        value: 'under24',
        label: lang('generalInfo.label.age1'),
      },
      {
        id: 'age-25-64',
        value: 'age-25-64',
        label: lang('generalInfo.label.age2'),
      },
      {
        id: 'age-over65',
        value: 'over65',
        label: lang('generalInfo.label.age3'),
      }, 
    ]
  },
])

//added new form element for year 2021
export const generalInfoARPAFormElements21 = (values, site, lang) => ([
  {
    inputType: 'radio',
    label: lang('generalInfo.legend.citizen', { ':year': values.year }),
    name: 'citizen',
    id: 'citizen',
    required: true,
    show: showCitizen(values),
    className: 'mt-6',
    dataTestId: 'citizen',
    helpTip: {
      page: 'generalInfo',
      expanded: site.forms.generalInfo.helpTips.citizen.open,
      ariaLabel: 'Citizen - Help Tip',
      elements: () => ToolTips.citizenToolTip(),
    },
    options: [
      {
        id: 'citizen-yes',
        value: 'yes',
        label: lang('global.label.yes'),
      },
      {
        id: 'citizen-no',
        value: 'no',
        label: lang('global.label.no'),
      },
    ]
  },
  {
    inputType: 'radio',
    label: lang('generalInfo.legend.validSSN', { ':year': values.year }),
    name: 'validSSN',
    id: 'validSSN',
    required: true,
    show: showValidSSN(values),
    className: 'mt-6',
    dataTestId: 'validSSN',
    helpTip: {
      page: 'generalInfo',
      expanded: site.forms.generalInfo.helpTips.validSSN.open,
      ariaLabel: 'Valid SSN - Help Tip',
      elements: () => ToolTips.validSSNToolTip(values.year),
    },
    options: [
      {
        id: 'validSSN-yes',
        value: 'yes',
        label: lang('global.label.yes'),
      },
      {
        id: 'validSSN-no',
        value: 'no',
        label: lang('global.label.no'),
      },
    ]
  },
  {
    inputType: 'radio',
    label: lang('generalInfo.legend.foreignIncome'),
    name: 'foreignIncome',
    id: 'foreignIncome',
    required: true,
    show: showForeignIncome(values),
    className: 'mt-6',
    dataTestId: 'foreignIncome',
    helpTip: {
      page: 'generalInfo',
      expanded: site.forms.generalInfo.helpTips.foreignIncome.open,
      ariaLabel: 'Foreign Income - Help Tip',
      elements: () => ToolTips.foreignIncomeToolTip(),
    },
    options: [
      {
        id: 'foreignIncome-yes',
        value: 'yes',
        label: lang('global.label.yes'),
      },
      {
        id: 'foreignIncome-no',
        value: 'no',
        label: lang('global.label.no'),
      },
    ]
  },
  {
    inputType: 'radio',
    label: lang('generalInfo.legend.claimedAsDependent'),
    name: 'claimedAsDependent',
    id: 'claimedAsDependent',
    required: true,
    show: showClaimedAsDependent(values),
    className: 'mt-6',
    dataTestId: 'claimedAsDependent',
    helpTip: {
      page: 'generalInfo',
      expanded: site.forms.generalInfo.helpTips.claimedAsDependent.open,
      ariaLabel: 'Claimed as dependent - Help Tip',
      elements: () => ToolTips.claimedAsDependentToolTip(),
    },
    options: [
      {
        id: 'claimedAsDependent-yes',
        value: 'yes',
        label: lang('global.label.yes'),
      },
      {
        id: 'claimedAsDependent-no',
        value: 'no',
        label: lang('global.label.no'),
      },
    ]
  },
  {
    inputType: 'radio',
    label: lang('generalInfo.legend.age', { ':year': values.year }),
    name: 'age',
    id: 'age',
    required: true,
    show: showAge(values),
    className: 'mt-6',
    dataTestId: `age-${values.year}`,
    options: [
     {
        id: 'age-17under',
        value: '17under',
        label: lang('global.label.17Under'),
      },
      {
        id: 'age-18',
        value: '18',
        label: lang('global.label.18'),
      },
      {
        id: 'age-19-23',
        value: '19-23',
        label: lang('global.label.19-23'),
      },
      {
       id: 'age-24over',
      value: '24over',
       label: lang('global.label.24Over'),
      },
    ]
  },
  {
    inputType: 'radio',
    label: lang('generalInfo.legend.qualifiedHomelessYouth', { ':year': values.year }),
    name: 'qualifiedHomelessYouth',
    id: 'qualifiedHomelessYouth',
    required: true,
    show: showQualifiedHomelessYouth(values),
    className: 'mt-6',
    helpTip: {
      page: 'generalInfo',
      expanded: site.forms.generalInfo.helpTips.qualifiedHomelessYouth.open,
      ariaLabel: 'Student - Help Tip',
      elements: () => ToolTips.qualifiedHomelessYouthToolTip(),
    },
    dataTestId: 'qualifiedHomelessYouth',
    options: [
      {
        id: 'qualifiedHomelessYouth-yes',
        value: 'yes',
        label: lang('global.label.yes'),
      },
      {
        id: 'qualifiedHomelessYouth-no',
        value: 'no',
        label: lang('global.label.no'),
      },
    ]
  },
  {
    inputType: 'radio',
    label: lang('generalInfo.legend.student', { ':year': values.year }),
    name: 'student',
    id: 'student',
    required: true,
    show: showStudent(values),
    className: 'mt-6',
    helpTip: {
      page: 'generalInfo',
      expanded: site.forms.generalInfo.helpTips.student.open,
      ariaLabel: 'Student - Help Tip',
      elements: () => ToolTips.studentToolTip(values.year),
    },
    dataTestId: 'student',
    options: [
      {
        id: 'student-yes',
        value: 'yes',
        label: lang('global.label.yes'),
      },
      {
        id: 'student-no',
        value: 'no',
        label: lang('global.label.no'),
      },
    ]
  },
]) 