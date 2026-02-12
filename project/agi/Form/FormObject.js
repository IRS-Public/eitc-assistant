import { useContext } from 'react'
import * as ToolTips from '../Structure/ToolTipsHtml'
import fsCalc from '../../filingStatus/Form/helpers/fsCalc'
import { investmentIncomeOver } from '../Structure/AlertsHtml'
import disqualifiers from '../Validation/disqualifiers'
import SiteContext from '../../../context/Site/SiteContext'
import HeaderContext from '../../../context/Header/HeaderContext'


// FORM ELEMENTS
export const earnedIncomeFormElements = (values, site, lang, setFieldValue) => {
  const { langCode } = useContext(SiteContext)
  const { year } = site.forms.generalInfo.values

  return ([
    {
      inputType: 'conditionalCheckbox',
      label: lang('agi.heading.earnedIncome', { ':year': year }),
      name: 'earnedIncome',
      placeholder: lang('global.placeholder.amount'),
      className: 'inline-block',
      required: true,
      boldLabel: true,
      pushObject: {
        amount: ''
      },
      options: [
        {
          checkedValue: values.earnedIncome.wagesFederalWithheld.checked,
          fieldArray: values.earnedIncome.wagesFederalWithheld.info,
          name: 'earnedIncome.wagesFederalWithheld.checked',
          label: lang('agi.label.wagesFederalWithheld'),
          dataTestID: 'wagesFederalWithheld',
          groupName: 'wagesFederalWithheld',
          showFields: values.earnedIncome.wagesFederalWithheld.checked,
          disabled: values.noIncome.includes('noIncome'),
          helpTip: {
            page: 'agi',
            expanded: site.forms.agi.helpTips['earnedIncome.wagesFederalWithheld.checked'].open,
            ariaLabel: 'Federal Wages Withheld - Help Tip',
            elements: () => ToolTips.wagesFederalWithheldToolTip(year),
            dataTestID: 'wagesFederalWithheld'
          },
          handleChange: () => {
            if (values.earnedIncome.wagesFederalWithheld.checked) {
              setFieldValue('earnedIncome.wagesFederalWithheld.info', [{ amount: '' }])
            }
          },
          formElements: (fieldArrIndex, remove) => (
            [
              {
                inputType: 'currencyField',
                name: `earnedIncome.wagesFederalWithheld.info[${fieldArrIndex}].amount`,
                placeholder: lang('global.placeholder.currency'),
                className: 'mt-2',
                ariaLabel: `Enter amount for Federal Wages Withheld ${fieldArrIndex + 1}`,
                dataTestId: `wagesFederalWithheld${fieldArrIndex}`,
                removeBtnObj: {
                  dataTestID: `deleteButton${fieldArrIndex}`,
                  ariaLabel: `Remove Federal Wages Withheld: ${fieldArrIndex + 1}`,
                  fieldArrIndex,
                  remove,
                }
              },
            ]
          ),
        },
        {
          checkedValue: values.earnedIncome.federalIncomeNotWithheld.checked,
          fieldArray: values.earnedIncome.federalIncomeNotWithheld.info,
          name: 'earnedIncome.federalIncomeNotWithheld.checked',
          label: lang('agi.label.federalIncomeNotWithheld'),
          ariaLabel: lang('agi.label.federalIncomeNotWithheld', { ':bold': lang('agi.label.federalIncomeNotWithheldNot') }),
          dataTestID: 'federalIncomeNotWithheld',
          groupName: 'federalIncomeNotWithheld',
          showFields: values.earnedIncome.federalIncomeNotWithheld.checked,
          disabled: values.noIncome.includes('noIncome'),
          callout: {
            title: lang('agi.subheading.boldInstructions')
          },
          helpTip: {
            page: 'agi',
            expanded: site.forms.agi.helpTips['earnedIncome.federalIncomeNotWithheld.checked'].open,
            ariaLabel: 'Federal Income Not Withheld - Help Tip',
            elements: () => ToolTips.federalIncomeNotWithheldToolTip(langCode),
            dataTestID: 'federalIncomeNotWithheld'
          },
          replacements: [
            {
              type: 'bold',
              key: ':bold',
              text: 'agi.label.federalIncomeNotWithheldNot',
            }
          ],
          handleChange: () => {
            if (values.earnedIncome.federalIncomeNotWithheld.checked) {
              setFieldValue('earnedIncome.federalIncomeNotWithheld.info', [{ amount: '' }])

              // setFieldValue('earnedIncome.federalIncomeNotWithheldNested.selfEmploymentPaidFINW.checked', false)
              // setFieldValue('earnedIncome.federalIncomeNotWithheldNested.selfEmploymentPaidFINW.info', [{ amount: '' }])

              setFieldValue('earnedIncome.federalIncomeNotWithheldNested.sepSimpleFINW.checked', false)
              setFieldValue('earnedIncome.federalIncomeNotWithheldNested.sepSimpleFINW.info', [{ amount: '' }])

              setFieldValue('earnedIncome.federalIncomeNotWithheldNested.selfEmploymentInsuranceFINW.checked', false)
              setFieldValue('earnedIncome.federalIncomeNotWithheldNested.selfEmploymentInsuranceFINW.info', [{ amount: '' }])

              setFieldValue('earnedIncome.federalIncomeNotWithheldNested.selfEmploymentExpensesFINW.checked', false)
              setFieldValue('earnedIncome.federalIncomeNotWithheldNested.selfEmploymentExpensesFINW.info', [{ amount: '' }])
            }
          },
          formElements: (fieldArrIndex, remove) => (
            [
              {
                inputType: 'currencyField',
                name: `earnedIncome.federalIncomeNotWithheld.info[${fieldArrIndex}].amount`,
                placeholder: lang('global.placeholder.currency'),
                className: 'mt-2',
                ariaLabel: `Enter amount for Federal Income Not Withheld ${fieldArrIndex + 1}`,
                dataTestId: `federalIncomeNotWithheld${fieldArrIndex}`,
                removeBtnObj: {
                  dataTestID: `deleteButton${fieldArrIndex}`,
                  ariaLabel: `Remove Federal Income Not Withheld: ${fieldArrIndex + 1}`,
                  fieldArrIndex,
                  remove,
                }
              },
            ]
          ),
          formElementsBelowAdd: () => (
            [
              {
                inputType: 'conditionalCheckbox',
                label: lang('agi.p.federalIncomeNotWithheldSubheading'),
                name: 'earnedIncome.federalIncomeNotWithheldNested',
                placeholder: lang('global.placeholder.amount'),
                className: 'inline-block',
                boldLabel: true,
                pushObject: {
                  amount: ''
                },
                options: [
                  // {
                  //   checkedValue: values.earnedIncome.federalIncomeNotWithheldNested.selfEmploymentPaidFINW.checked,
                  //   fieldArray: values.earnedIncome.federalIncomeNotWithheldNested.selfEmploymentPaidFINW.info,
                  //   name: 'earnedIncome.federalIncomeNotWithheldNested.selfEmploymentPaidFINW.checked',
                  //   label: lang('agi.label.selfEmploymentPaidFINW'),
                  //   dataTestID: 'selfEmploymentPaidFINW',
                  //   groupName: 'selfEmploymentPaidFINW',
                  //   showFields: values.earnedIncome.federalIncomeNotWithheldNested.selfEmploymentPaidFINW.checked,
                  //   helpTip: {
                  //     page: 'agi',
                  //     expanded: site.forms.agi.helpTips['earnedIncome.federalIncomeNotWithheldNested.selfEmploymentPaidFINW.checked'].open,
                  //     ariaLabel: 'Self-employment taxes - Help Tip',
                  //     elements: () => ToolTips.selfEmploymentPaidFINWToolTip(year),
                  //     dataTestID: 'selfEmploymentPaidFINW'
                  //   },
                  //   handleChange: () => {
                  //     if (values.earnedIncome.federalIncomeNotWithheldNested.selfEmploymentPaidFINW.checked) {
                  //       setFieldValue('earnedIncome.federalIncomeNotWithheldNested.selfEmploymentPaidFINW.info', [{ amount: '' }])
                  //     }
                  //   },
                  //   formElements: (fieldArrIndex, remove) => (
                  //     [
                  //       {
                  //         inputType: 'currencyField',
                  //         name: `earnedIncome.federalIncomeNotWithheldNested.selfEmploymentPaidFINW.info[${fieldArrIndex}].amount`,
                  //         placeholder: lang('global.placeholder.currency'),
                  //         className: 'mt-2',
                  //         ariaLabel: `Enter amount for Self-employment taxes ${fieldArrIndex + 1}`,
                  //         dataTestId: `selfEmploymentPaidFINW${fieldArrIndex}`,
                  //         removeBtnObj: {
                  //           dataTestID: `deleteButton${fieldArrIndex}`,
                  //           ariaLabel: `Remove Self-employment taxes: ${fieldArrIndex + 1}`,
                  //           fieldArrIndex,
                  //           remove,
                  //         }
                  //       },
                  //     ]
                  //   )
                  // },
                  {
                    checkedValue: values.earnedIncome.federalIncomeNotWithheldNested.sepSimpleFINW.checked,
                    fieldArray: values.earnedIncome.federalIncomeNotWithheldNested.sepSimpleFINW.info,
                    name: 'earnedIncome.federalIncomeNotWithheldNested.sepSimpleFINW.checked',
                    label: lang('agi.label.sepSimpleFINW'),
                    dataTestID: 'sepSimpleFINW',
                    groupName: 'sepSimpleFINW',
                    showFields: values.earnedIncome.federalIncomeNotWithheldNested.sepSimpleFINW.checked,
                    helpTip: {
                      page: 'agi',
                      expanded: site.forms.agi.helpTips['earnedIncome.federalIncomeNotWithheldNested.sepSimpleFINW.checked'].open,
                      ariaLabel: 'SEP Simple - Help Tip',
                      elements: () => ToolTips.sepSimpleFINWToolTip(),
                      dataTestID: 'sepSimpleFINW'
                    },
                    handleChange: () => {
                      if (values.earnedIncome.federalIncomeNotWithheldNested.sepSimpleFINW.checked) {
                        setFieldValue('earnedIncome.federalIncomeNotWithheldNested.sepSimpleFINW.info', [{ amount: '' }])
                      }
                    },
                    formElements: (fieldArrIndex, remove) => (
                      [
                        {
                          inputType: 'currencyField',
                          name: `earnedIncome.federalIncomeNotWithheldNested.sepSimpleFINW.info[${fieldArrIndex}].amount`,
                          placeholder: lang('global.placeholder.currency'),
                          className: 'mt-2',
                          ariaLabel: `Enter amount for SEP Simple ${fieldArrIndex + 1}`,
                          dataTestId: `sepSimpleFINW${fieldArrIndex}`,
                          removeBtnObj: {
                            dataTestID: `deleteButton${fieldArrIndex}`,
                            ariaLabel: `Remove SEP Simple: ${fieldArrIndex + 1}`,
                            fieldArrIndex,
                            remove,
                          }
                        },
                      ]
                    )
                  },
                  {
                    checkedValue: values.earnedIncome.federalIncomeNotWithheldNested.selfEmploymentInsuranceFINW.checked,
                    fieldArray: values.earnedIncome.federalIncomeNotWithheldNested.selfEmploymentInsuranceFINW.info,
                    name: 'earnedIncome.federalIncomeNotWithheldNested.selfEmploymentInsuranceFINW.checked',
                    label: lang('agi.label.selfEmploymentInsuranceFINW'),
                    dataTestID: 'selfEmploymentInsuranceFINW',
                    groupName: 'selfEmploymentInsuranceFINW',
                    showFields: values.earnedIncome.federalIncomeNotWithheldNested.selfEmploymentInsuranceFINW.checked,
                    helpTip: {
                      page: 'agi',
                      expanded: site.forms.agi.helpTips['earnedIncome.federalIncomeNotWithheldNested.selfEmploymentInsuranceFINW.checked'].open,
                      ariaLabel: 'Self-employed health insurance - Help Tip',
                      elements: () => ToolTips.selfEmploymentInsuranceFINWToolTip(),
                      dataTestID: 'selfEmploymentInsuranceFINW'
                    },
                    handleChange: () => {
                      if (values.earnedIncome.federalIncomeNotWithheldNested.selfEmploymentInsuranceFINW.checked) {
                        setFieldValue('earnedIncome.federalIncomeNotWithheldNested.selfEmploymentInsuranceFINW.info', [{ amount: '' }])
                      }
                    },
                    formElements: (fieldArrIndex, remove) => (
                      [
                        {
                          inputType: 'currencyField',
                          name: `earnedIncome.federalIncomeNotWithheldNested.selfEmploymentInsuranceFINW.info[${fieldArrIndex}].amount`,
                          placeholder: lang('global.placeholder.currency'),
                          className: 'mt-2',
                          ariaLabel: `Enter amount for Self-employed health insurance ${fieldArrIndex + 1}`,
                          dataTestId: `selfEmploymentInsuranceFINW${fieldArrIndex}`,
                          removeBtnObj: {
                            dataTestID: `deleteButton${fieldArrIndex}`,
                            ariaLabel: `Remove Self-employed health insurance: ${fieldArrIndex + 1}`,
                            fieldArrIndex,
                            remove,
                          }
                        },
                      ]
                    )
                  },
                  {
                    checkedValue: values.earnedIncome.federalIncomeNotWithheldNested.selfEmploymentExpensesFINW.checked,
                    fieldArray: values.earnedIncome.federalIncomeNotWithheldNested.selfEmploymentExpensesFINW.info,
                    name: 'earnedIncome.federalIncomeNotWithheldNested.selfEmploymentExpensesFINW.checked',
                    label: lang('agi.label.selfEmploymentExpensesFINW'),
                    dataTestID: 'selfEmploymentExpensesFINW',
                    groupName: 'selfEmploymentExpensesFINW',
                    showFields: values.earnedIncome.federalIncomeNotWithheldNested.selfEmploymentExpensesFINW.checked,
                    helpTip: {
                      page: 'agi',
                      expanded: site.forms.agi.helpTips['earnedIncome.federalIncomeNotWithheldNested.selfEmploymentExpensesFINW.checked'].open,
                      ariaLabel: 'Self-employment expenses - Help Tip',
                      elements: () => ToolTips.selfEmploymentExpensesFINWToolTip(),
                      dataTestID: 'selfEmploymentExpensesFINW'
                    },
                    handleChange: () => {
                      if (values.earnedIncome.federalIncomeNotWithheldNested.selfEmploymentExpensesFINW.checked) {
                        setFieldValue('earnedIncome.federalIncomeNotWithheldNested.selfEmploymentExpensesFINW.info', [{ amount: '' }])
                      }
                    },
                    formElements: (fieldArrIndex, remove) => (
                      [
                        {
                          inputType: 'currencyField',
                          name: `earnedIncome.federalIncomeNotWithheldNested.selfEmploymentExpensesFINW.info[${fieldArrIndex}].amount`,
                          placeholder: lang('global.placeholder.currency'),
                          className: 'mt-2',
                          ariaLabel: `Enter amount for Self-employment expenses ${fieldArrIndex + 1}`,
                          dataTestId: `selfEmploymentExpensesFINW${fieldArrIndex}`,
                          removeBtnObj: {
                            dataTestID: `deleteButton${fieldArrIndex}`,
                            ariaLabel: `Remove Self-employment expenses: ${fieldArrIndex + 1}`,
                            fieldArrIndex,
                            remove,
                          }
                        },
                      ]
                    )
                  },
                ]
              },
            ]
          )
        },
        {
          checkedValue: values.earnedIncome.selfEmploymentGross.checked,
          fieldArray: values.earnedIncome.selfEmploymentGross.info,
          name: 'earnedIncome.selfEmploymentGross.checked',
          label: lang('agi.label.selfEmploymentGross'),
          dataTestID: 'selfEmploymentGross',
          groupName: 'selfEmploymentGross',
          showFields: values.earnedIncome.selfEmploymentGross.checked,
          disabled: values.noIncome.includes('noIncome'),
          callout: {
            title: lang('agi.subheading.boldInstructions')
          },
          helpTip: {
            page: 'agi',
            expanded: site.forms.agi.helpTips['earnedIncome.selfEmploymentGross.checked'].open,
            ariaLabel: 'Self-employment gross income - Help Tip',
            elements: () => ToolTips.selfEmploymentGrossToolTip(),
            dataTestID: 'selfEmploymentGross'
          },
          replacements: [
            {
              type: 'bold',
              key: ':bold',
              text: 'agi.label.selfEmploymentGrossNot',
            }
          ],
          handleChange: () => {
            if (values.earnedIncome.selfEmploymentGross.checked) {
              setFieldValue('earnedIncome.selfEmploymentGross.info', [{ amount: '' }])

              // setFieldValue('earnedIncome.selfEmploymentGrossNested.selfEmploymentPaidSEG.checked', false)
              // setFieldValue('earnedIncome.selfEmploymentGrossNested.selfEmploymentPaidSEG.info', [{ amount: '' }])

              setFieldValue('earnedIncome.selfEmploymentGrossNested.sepSimpleSEG.checked', false)
              setFieldValue('earnedIncome.selfEmploymentGrossNested.sepSimpleSEG.info', [{ amount: '' }])

              setFieldValue('earnedIncome.selfEmploymentGrossNested.selfEmploymentInsuranceSEG.checked', false)
              setFieldValue('earnedIncome.selfEmploymentGrossNested.selfEmploymentInsuranceSEG.info', [{ amount: '' }])

              setFieldValue('earnedIncome.selfEmploymentGrossNested.selfEmploymentExpensesSEG.checked', false)
              setFieldValue('earnedIncome.selfEmploymentGrossNested.selfEmploymentExpensesSEG.info', [{ amount: '' }])
            }
          },
          formElements: (fieldArrIndex, remove) => (
            [
              {
                inputType: 'currencyField',
                name: `earnedIncome.selfEmploymentGross.info[${fieldArrIndex}].amount`,
                placeholder: lang('global.placeholder.currency'),
                className: 'mt-2',
                ariaLabel: `Enter amount for Self-employment gross income ${fieldArrIndex + 1}`,
                dataTestId: `selfEmploymentGross${fieldArrIndex}`,
                removeBtnObj: {
                  dataTestID: `deleteButton${fieldArrIndex}`,
                  ariaLabel: `Remove Self-employment gross income: ${fieldArrIndex + 1}`,
                  fieldArrIndex,
                  remove,
                }
              },
            ]
          ),
          formElementsBelowAdd: () => (
            [
              {
                inputType: 'conditionalCheckbox',
                label: lang('agi.p.selfEmploymentGrossIncomeSubheading'),
                name: 'earnedIncome.selfEmploymentGrossNested',
                placeholder: lang('global.placeholder.amount'),
                className: 'inline-block',
                boldLabel: true,
                pushObject: {
                  amount: ''
                },
                options: [
                  // {
                  //   checkedValue: values.earnedIncome.selfEmploymentGrossNested.selfEmploymentPaidSEG.checked,
                  //   fieldArray: values.earnedIncome.selfEmploymentGrossNested.selfEmploymentPaidSEG.info,
                  //   name: 'earnedIncome.selfEmploymentGrossNested.selfEmploymentPaidSEG.checked',
                  //   label: lang('agi.label.selfEmploymentPaidSEG'),
                  //   dataTestID: 'selfEmploymentPaidSEG',
                  //   groupName: 'selfEmploymentPaidSEG',
                  //   showFields: values.earnedIncome.selfEmploymentGrossNested.selfEmploymentPaidSEG.checked,
                  //   helpTip: {
                  //     page: 'agi',
                  //     expanded: site.forms.agi.helpTips['earnedIncome.selfEmploymentGrossNested.selfEmploymentPaidSEG.checked'].open,
                  //     ariaLabel: 'Self-employment taxes paid - Help Tip',
                  //     elements: () => ToolTips.selfEmploymentPaidSEGToolTip(year),
                  //     dataTestID: 'selfEmploymentPaidSEG'
                  //   },
                  //   handleChange: () => {
                  //     if (values.earnedIncome.selfEmploymentGrossNested.selfEmploymentPaidSEG.checked) {
                  //       setFieldValue('earnedIncome.selfEmploymentGrossNested.selfEmploymentPaidSEG.info', [{ amount: '' }])
                  //     }
                  //   },
                  //   formElements: (fieldArrIndex, remove) => (
                  //     [
                  //       {
                  //         inputType: 'currencyField',
                  //         name: `earnedIncome.selfEmploymentGrossNested.selfEmploymentPaidSEG.info[${fieldArrIndex}].amount`,
                  //         placeholder: lang('global.placeholder.currency'),
                  //         className: 'mt-2',
                  //         ariaLabel: `Enter amount for Self-employment taxes paid ${fieldArrIndex + 1}`,
                  //         dataTestId: `selfEmploymentPaidSEG${fieldArrIndex}`,
                  //         removeBtnObj: {
                  //           dataTestID: `deleteButton${fieldArrIndex}`,
                  //           ariaLabel: `Remove Self-employment taxes paid: ${fieldArrIndex + 1}`,
                  //           fieldArrIndex,
                  //           remove,
                  //         }
                  //       },
                  //     ]
                  //   )
                  // },
                  {
                    checkedValue: values.earnedIncome.selfEmploymentGrossNested.sepSimpleSEG.checked,
                    fieldArray: values.earnedIncome.selfEmploymentGrossNested.sepSimpleSEG.info,
                    name: 'earnedIncome.selfEmploymentGrossNested.sepSimpleSEG.checked',
                    label: lang('agi.label.sepSimpleSEG'),
                    dataTestID: 'sepSimpleSEG',
                    groupName: 'sepSimpleSEG',
                    showFields: values.earnedIncome.selfEmploymentGrossNested.sepSimpleSEG.checked,
                    helpTip: {
                      page: 'agi',
                      expanded: site.forms.agi.helpTips['earnedIncome.selfEmploymentGrossNested.sepSimpleSEG.checked'].open,
                      ariaLabel: 'SEP Simple - Help Tip',
                      elements: () => ToolTips.sepSimpleSEGToolTip(),
                      dataTestID: 'sepSimpleSEG'
                    },
                    handleChange: () => {
                      if (values.earnedIncome.selfEmploymentGrossNested.sepSimpleSEG.checked) {
                        setFieldValue('earnedIncome.selfEmploymentGrossNested.sepSimpleSEG.info', [{ amount: '' }])
                      }
                    },
                    formElements: (fieldArrIndex, remove) => (
                      [
                        {
                          inputType: 'currencyField',
                          name: `earnedIncome.selfEmploymentGrossNested.sepSimpleSEG.info[${fieldArrIndex}].amount`,
                          placeholder: lang('global.placeholder.currency'),
                          className: 'mt-2',
                          ariaLabel: `Enter amount for SEP Simple ${fieldArrIndex + 1}`,
                          dataTestId: `sepSimpleSEG${fieldArrIndex}`,
                          removeBtnObj: {
                            dataTestID: `deleteButton${fieldArrIndex}`,
                            ariaLabel: `Remove SEP Simple: ${fieldArrIndex + 1}`,
                            fieldArrIndex,
                            remove,
                          }
                        },
                      ]
                    )
                  },
                  {
                    checkedValue: values.earnedIncome.selfEmploymentGrossNested.selfEmploymentInsuranceSEG.checked,
                    fieldArray: values.earnedIncome.selfEmploymentGrossNested.selfEmploymentInsuranceSEG.info,
                    name: 'earnedIncome.selfEmploymentGrossNested.selfEmploymentInsuranceSEG.checked',
                    label: lang('agi.label.selfEmploymentInsuranceSEG'),
                    dataTestID: 'selfEmploymentInsuranceSEG',
                    groupName: 'selfEmploymentInsuranceSEG',
                    showFields: values.earnedIncome.selfEmploymentGrossNested.selfEmploymentInsuranceSEG.checked,
                    helpTip: {
                      page: 'agi',
                      expanded: site.forms.agi.helpTips['earnedIncome.selfEmploymentGrossNested.selfEmploymentInsuranceSEG.checked'].open,
                      ariaLabel: 'Self-employed health insurance - Help Tip',
                      elements: () => ToolTips.selfEmploymentInsuranceSEGToolTip(),
                      dataTestID: 'selfEmploymentInsuranceSEG'
                    },
                    handleChange: () => {
                      if (values.earnedIncome.selfEmploymentGrossNested.selfEmploymentInsuranceSEG.checked) {
                        setFieldValue('earnedIncome.selfEmploymentGrossNested.selfEmploymentInsuranceSEG.info', [{ amount: '' }])
                      }
                    },
                    formElements: (fieldArrIndex, remove) => (
                      [
                        {
                          inputType: 'currencyField',
                          name: `earnedIncome.selfEmploymentGrossNested.selfEmploymentInsuranceSEG.info[${fieldArrIndex}].amount`,
                          placeholder: lang('global.placeholder.currency'),
                          className: 'mt-2',
                          ariaLabel: `Enter amount for Self-employed health insurance ${fieldArrIndex + 1}`,
                          dataTestId: `selfEmploymentInsuranceSEG${fieldArrIndex}`,
                          removeBtnObj: {
                            dataTestID: `deleteButton${fieldArrIndex}`,
                            ariaLabel: `Remove Self-employed health insurance: ${fieldArrIndex + 1}`,
                            fieldArrIndex,
                            remove,
                          }
                        },
                      ]
                    )
                  },
                  {
                    checkedValue: values.earnedIncome.selfEmploymentGrossNested.selfEmploymentExpensesSEG.checked,
                    fieldArray: values.earnedIncome.selfEmploymentGrossNested.selfEmploymentExpensesSEG.info,
                    name: 'earnedIncome.selfEmploymentGrossNested.selfEmploymentExpensesSEG.checked',
                    label: lang('agi.label.selfEmploymentExpensesSEG'),
                    dataTestID: 'selfEmploymentExpensesSEG',
                    groupName: 'selfEmploymentExpensesSEG',
                    showFields: values.earnedIncome.selfEmploymentGrossNested.selfEmploymentExpensesSEG.checked,
                    helpTip: {
                      page: 'agi',
                      expanded: site.forms.agi.helpTips['earnedIncome.selfEmploymentGrossNested.selfEmploymentExpensesSEG.checked'].open,
                      ariaLabel: 'Self-employment expenses - Help Tip',
                      elements: () => ToolTips.selfEmploymentExpensesSEGToolTip(),
                      dataTestID: 'selfEmploymentExpensesSEG'
                    },
                    handleChange: () => {
                      if (values.earnedIncome.selfEmploymentGrossNested.selfEmploymentExpensesSEG.checked) {
                        setFieldValue('earnedIncome.selfEmploymentGrossNested.selfEmploymentExpensesSEG.info', [{ amount: '' }])
                      }
                    },
                    formElements: (fieldArrIndex, remove) => (
                      [
                        {
                          inputType: 'currencyField',
                          name: `earnedIncome.selfEmploymentGrossNested.selfEmploymentExpensesSEG.info[${fieldArrIndex}].amount`,
                          placeholder: lang('global.placeholder.currency'),
                          className: 'mt-2',
                          ariaLabel: `Enter amount for Self-employment expenses ${fieldArrIndex + 1}`,
                          dataTestId: `selfEmploymentExpensesSEG${fieldArrIndex}`,
                          removeBtnObj: {
                            dataTestID: `deleteButton${fieldArrIndex}`,
                            ariaLabel: `Remove Self-employment expenses: ${fieldArrIndex + 1}`,
                            fieldArrIndex,
                            remove,
                          }
                        },
                      ]
                    )
                  },
                ]
              },
            ]
          )
        },
        {
          checkedValue: values.earnedIncome.disabilityRetirement.checked,
          fieldArray: values.earnedIncome.disabilityRetirement.info,
          name: 'earnedIncome.disabilityRetirement.checked',
          label: lang('agi.label.disabilityRetirement'),
          dataTestID: 'disabilityRetirement',
          groupName: 'disabilityRetirement',
          showFields: values.earnedIncome.disabilityRetirement.checked,
          disabled: values.noIncome.includes('noIncome'),
          helpTip: {
            page: 'agi',
            expanded: site.forms.agi.helpTips['earnedIncome.disabilityRetirement.checked'].open,
            ariaLabel: 'Disability retirement benefits - Help Tip',
            elements: () => ToolTips.disabilityRetirementToolTip(),
            dataTestID: 'disabilityRetirement'
          },
          handleChange: () => {
            if (values.earnedIncome.disabilityRetirement.checked) {
              setFieldValue('earnedIncome.disabilityRetirement.info', [{ amount: '' }])
            }
          },
          formElements: (fieldArrIndex, remove) => (
            [
              {
                inputType: 'currencyField',
                name: `earnedIncome.disabilityRetirement.info[${fieldArrIndex}].amount`,
                placeholder: lang('global.placeholder.currency'),
                className: 'mt-2',
                ariaLabel: `Enter amount for Disability retirement benefits ${fieldArrIndex + 1}`,
                dataTestId: `disabilityRetirement${fieldArrIndex}`,
                removeBtnObj: {
                  dataTestID: `deleteButton${fieldArrIndex}`,
                  ariaLabel: `Remove Disability retirement benefits: ${fieldArrIndex + 1}`,
                  fieldArrIndex,
                  remove,
                }
              },
            ]
          ),
        },
        {
          checkedValue: values.earnedIncome.foreignEarnedIncome.checked,
          fieldArray: values.earnedIncome.foreignEarnedIncome.info,
          name: 'earnedIncome.foreignEarnedIncome.checked',
          label: lang('agi.label.foreignEarnedIncome'),
          dataTestID: 'foreignEarnedIncome',
          groupName: 'foreignEarnedIncome',
          showFields: values.earnedIncome.foreignEarnedIncome.checked,
          disabled: values.noIncome.includes('noIncome'),
          helpTip: {
            page: 'agi',
            expanded: site.forms.agi.helpTips['earnedIncome.foreignEarnedIncome.checked'].open,
            ariaLabel: 'Foreign earned income - Help Tip',
            elements: () => ToolTips.foreignEarnedIncomeToolTip(),
            dataTestID: 'foreignEarnedIncome'
          },
          handleChange: () => {
            if (values.earnedIncome.foreignEarnedIncome.checked) {
              setFieldValue('earnedIncome.foreignEarnedIncome.info', [{ amount: '' }])
            }
          },
          formElements: (fieldArrIndex, remove) => (
            [
              {
                inputType: 'currencyField',
                name: `earnedIncome.foreignEarnedIncome.info[${fieldArrIndex}].amount`,
                placeholder: lang('global.placeholder.currency'),
                className: 'mt-2',
                ariaLabel: `Enter amount for Foreign earned income ${fieldArrIndex + 1}`,
                dataTestId: `foreignEarnedIncome${fieldArrIndex}`,
                removeBtnObj: {
                  dataTestID: `deleteButton${fieldArrIndex}`,
                  ariaLabel: `Remove Foreign earned income: ${fieldArrIndex + 1}`,
                  fieldArrIndex,
                  remove,
                }
              },
            ]
          ),
        },
        {
          checkedValue: values.earnedIncome.prisonIncome.checked,
          fieldArray: values.earnedIncome.prisonIncome.info,
          name: 'earnedIncome.prisonIncome.checked',
          label: lang('agi.label.prisonIncome'),
          dataTestID: 'prisonIncome',
          groupName: 'prisonIncome',
          showFields: values.earnedIncome.prisonIncome.checked,
          disabled: values.noIncome.includes('noIncome'),
          callout: {
            title: lang('agi.h2.prisonCallout')
          },
          helpTip: {
            page: 'agi',
            expanded: site.forms.agi.helpTips['earnedIncome.prisonIncome.checked'].open,
            ariaLabel: 'Pay received while an inmate - Help Tip',
            elements: () => ToolTips.prisonIncomeToolTip(),
            dataTestID: 'prisonIncome'
          },
          handleChange: () => {
            if (values.earnedIncome.prisonIncome.checked) {
              setFieldValue('earnedIncome.prisonIncome.info', [{ amount: '' }])
            }
          },
          formElements: (fieldArrIndex, remove) => (
            [
              {
                inputType: 'currencyField',
                name: `earnedIncome.prisonIncome.info[${fieldArrIndex}].amount`,
                placeholder: lang('global.placeholder.currency'),
                className: 'mt-2',
                ariaLabel: `Enter amount for Pay received while an inmate ${fieldArrIndex + 1}`,
                dataTestId: `prisonIncome${fieldArrIndex}`,
                removeBtnObj: {
                  dataTestID: `deleteButton${fieldArrIndex}`,
                  ariaLabel: `Remove Pay received while an inmate: ${fieldArrIndex + 1}`,
                  fieldArrIndex,
                  remove,
                }
              },
            ]
          ),
        },
      ]
    },
    {
      inputType: 'checkbox',
      name: 'noIncome',
      dataTestId: 'noIncome',
      className: 'mt-3',
      options: [
        {
          id: 'noIncome',
          value: 'noIncome',
          label: lang('global.label.noneAbove'),
          checkedValue: values.noIncome.includes('noIncome'),
          dataTestId: 'noIncome',
          className: 'mt-0',
          disabled: values.earnedIncome.wagesFederalWithheld.checked
            || values.earnedIncome.federalIncomeNotWithheld.checked
            || values.earnedIncome.selfEmploymentGross.checked
            || values.earnedIncome.disabilityRetirement.checked
            || values.earnedIncome.foreignEarnedIncome.checked
            || values.earnedIncome.prisonIncome.checked,
        },
      ]
    },
  ])
}

export const unearnedIncomeFormElements = (values, site, lang, setFieldValue) => {
  const { langCode } = useContext(SiteContext)
  const { year } = site.forms.generalInfo.values

  return ([
    {
      inputType: 'conditionalCheckbox',
      label: lang('agi.heading.unearnedIncome', { ':year': year }),
      name: 'unearnedIncome',
      placeholder: lang('global.placeholder.amount'),
      className: 'inline-block',
      boldLabel: true,
      pushObject: {
        amount: ''
      },
      options: [
        {
          checkedValue: values.unearnedIncome.pension.checked,
          fieldArray: values.unearnedIncome.pension.info,
          name: 'unearnedIncome.pension.checked',
          label: lang('agi.label.pension'),
          dataTestID: 'pension',
          groupName: 'pension',
          showFields: values.unearnedIncome.pension.checked,
          disabled: values.noUnEarnedIncome.includes('noUnEarnedIncome'),
          helpTip: {
            page: 'agi',
            expanded: site.forms.agi.helpTips['unearnedIncome.pension.checked'].open,
            ariaLabel: 'Pension - Help Tip',
            elements: () => ToolTips.pensionToolTip(langCode),
            dataTestID: 'pension'
          },
          handleChange: () => {
            if (values.unearnedIncome.pension.checked) {
              setFieldValue('unearnedIncome.pension.info', [{ amount: '' }])
            }
          },
          formElements: (fieldArrIndex, remove) => (
            [
              {
                inputType: 'currencyField',
                name: `unearnedIncome.pension.info[${fieldArrIndex}].amount`,
                placeholder: lang('global.placeholder.currency'),
                className: 'mt-2',
                ariaLabel: `Enter amount for pension ${fieldArrIndex + 1}`,
                dataTestId: `pension${fieldArrIndex}`,
                removeBtnObj: {
                  dataTestID: `deleteButton${fieldArrIndex}`,
                  ariaLabel: `Remove pension: ${fieldArrIndex + 1}`,
                  fieldArrIndex,
                  remove,
                }
              },
            ]
          ),
        },
        {
          checkedValue: values.unearnedIncome.unemploymentInsurance.checked,
          fieldArray: values.unearnedIncome.unemploymentInsurance.info,
          name: 'unearnedIncome.unemploymentInsurance.checked',
          label: lang('agi.label.unemploymentInsurance'),
          dataTestID: 'unemploymentInsurance',
          groupName: 'unemploymentInsurance',
          showFields: values.unearnedIncome.unemploymentInsurance.checked,
          disabled: values.noUnEarnedIncome.includes('noUnEarnedIncome'),
          helpTip: {
            page: 'agi',
            expanded: site.forms.agi.helpTips['unearnedIncome.unemploymentInsurance.checked'].open,
            ariaLabel: 'Unemployment insurance - Help Tip',
            elements: () => ToolTips.unemploymentInsuranceToolTip(),
            dataTestID: 'unemploymentInsurance'
          },
          handleChange: () => {
            if (values.unearnedIncome.unemploymentInsurance.checked) {
              setFieldValue('unearnedIncome.unemploymentInsurance.info', [{ amount: '' }])
            }
          },
          formElements: (fieldArrIndex, remove) => (
            [
              {
                inputType: 'currencyField',
                name: `unearnedIncome.unemploymentInsurance.info[${fieldArrIndex}].amount`,
                placeholder: lang('global.placeholder.currency'),
                className: 'mt-2',
                ariaLabel: `Enter amount for Unemployment insurance ${fieldArrIndex + 1}`,
                dataTestId: `unemploymentInsurance${fieldArrIndex}`,
                removeBtnObj: {
                  dataTestID: `deleteButton${fieldArrIndex}`,
                  ariaLabel: `Remove Unemployment insurance: ${fieldArrIndex + 1}`,
                  fieldArrIndex,
                  remove,
                }
              },
            ]
          ),
        },
        {
          checkedValue: values.unearnedIncome.socialSecurityRailroad.checked,
          fieldArray: values.unearnedIncome.socialSecurityRailroad.info,
          name: 'unearnedIncome.socialSecurityRailroad.checked',
          label: lang('agi.label.socialSecurityRailroad'),
          dataTestID: 'socialSecurityRailroad',
          groupName: 'socialSecurityRailroad',
          showFields: values.unearnedIncome.socialSecurityRailroad.checked,
          disabled: values.noUnEarnedIncome.includes('noUnEarnedIncome'),
          helpTip: {
            page: 'agi',
            expanded: site.forms.agi.helpTips['unearnedIncome.socialSecurityRailroad.checked'].open,
            ariaLabel: 'Social Security income - Help Tip',
            elements: () => ToolTips.socialSecurityRailroadToolTip(langCode, year),
            dataTestID: 'socialSecurityRailroad'
          },
          handleChange: () => {
            if (values.unearnedIncome.socialSecurityRailroad.checked) {
              setFieldValue('unearnedIncome.socialSecurityRailroad.info', [{ amount: '' }])
            }
          },
          formElements: (fieldArrIndex, remove) => (
            [
              {
                inputType: 'currencyField',
                name: `unearnedIncome.socialSecurityRailroad.info[${fieldArrIndex}].amount`,
                placeholder: lang('global.placeholder.currency'),
                className: 'mt-2',
                ariaLabel: `Enter amount for Social Security income ${fieldArrIndex + 1}`,
                dataTestId: `socialSecurityRailroad${fieldArrIndex}`,
                removeBtnObj: {
                  dataTestID: `deleteButton${fieldArrIndex}`,
                  ariaLabel: `Remove Social Security income: ${fieldArrIndex + 1}`,
                  fieldArrIndex,
                  remove,
                }
              },
            ]
          ),
        },
        {
          checkedValue: values.unearnedIncome.scholarship.checked,
          fieldArray: values.unearnedIncome.scholarship.info,
          name: 'unearnedIncome.scholarship.checked',
          label: lang('agi.label.scholarship'),
          dataTestID: 'scholarship',
          groupName: 'scholarship',
          showFields: values.unearnedIncome.scholarship.checked,
          disabled: values.noUnEarnedIncome.includes('noUnEarnedIncome'),
          helpTip: {
            page: 'agi',
            expanded: site.forms.agi.helpTips['unearnedIncome.scholarship.checked'].open,
            ariaLabel: 'Scholarship - Help Tip',
            elements: () => ToolTips.scholarshipToolTip(langCode),
            dataTestID: 'scholarship'
          },
          handleChange: () => {
            if (values.unearnedIncome.scholarship.checked) {
              setFieldValue('unearnedIncome.scholarship.info', [{ amount: '' }])
            }
          },
          formElements: (fieldArrIndex, remove) => (
            [
              {
                inputType: 'currencyField',
                name: `unearnedIncome.scholarship.info[${fieldArrIndex}].amount`,
                placeholder: lang('global.placeholder.currency'),
                className: 'mt-2',
                ariaLabel: `Enter amount for scholarship ${fieldArrIndex + 1}`,
                dataTestId: `scholarship${fieldArrIndex}`,
                removeBtnObj: {
                  dataTestID: `deleteButton${fieldArrIndex}`,
                  ariaLabel: `Remove scholarship: ${fieldArrIndex + 1}`,
                  fieldArrIndex,
                  remove,
                }
              },
            ]
          ),
        },
        {
          checkedValue: values.unearnedIncome.investments.checked,
          fieldArray: values.unearnedIncome.investments.info,
          name: 'unearnedIncome.investments.checked',
          label: lang('agi.label.investments'),
          dataTestID: 'investments',
          groupName: 'investments',
          showFields: values.unearnedIncome.investments.checked,
          disabled: values.noUnEarnedIncome.includes('noUnEarnedIncome'),
          helpTip: {
            page: 'agi',
            expanded: site.forms.agi.helpTips['unearnedIncome.investments.checked'].open,
            ariaLabel: 'Investment income - Help Tip',
            elements: () => ToolTips.investmentsToolTip(year),
            dataTestID: 'investments'
          },
          handleChange: () => {
            if (values.unearnedIncome.investments.checked) {
              setFieldValue('unearnedIncome.investments.info', [{ amount: '' }])
            }
          },
          formElements: (fieldArrIndex, remove) => (
            [
              {
                inputType: 'currencyField',
                name: `unearnedIncome.investments.info[${fieldArrIndex}].amount`,
                placeholder: lang('global.placeholder.currency'),
                className: 'mt-2',
                ariaLabel: `Enter amount for Investment income ${fieldArrIndex + 1}`,
                dataTestId: `investments${fieldArrIndex}`,
                removeBtnObj: {
                  dataTestID: `deleteButton${fieldArrIndex}`,
                  ariaLabel: `Remove Investment income: ${fieldArrIndex + 1}`,
                  fieldArrIndex,
                  remove,
                }
              },
            ]
          ),
          formElementsBelowAdd: () => (
            [
              {
                inputType: 'alert',
                elements: () => investmentIncomeOver(year, langCode),
                title: lang('global.heading.eitcNoQualify'),
                show: disqualifiers(
                  values,
                  site.forms.filingStatus.values.numOfDependents,
                  fsCalc(site.forms.filingStatus.values),
                  year
                ).investmentIncome === true,
                dataTestId: 'investmentIncomeOver'
              },
            ]
          )
        },
        {
          checkedValue: values.unearnedIncome.unearnedOther.checked,
          fieldArray: values.unearnedIncome.unearnedOther.info,
          name: 'unearnedIncome.unearnedOther.checked',
          label: lang('agi.label.unearnedOther'),
          dataTestID: 'unearnedOther',
          groupName: 'unearnedOther',
          showFields: values.unearnedIncome.unearnedOther.checked,
          disabled: values.noUnEarnedIncome.includes('noUnEarnedIncome'),
          helpTip: {
            page: 'agi',
            expanded: site.forms.agi.helpTips['unearnedIncome.unearnedOther.checked'].open,
            ariaLabel: 'Other types of income - Help Tip',
            elements: () => ToolTips.unearnedOtherToolTip(year),
            dataTestID: 'unearnedOther'
          },
          handleChange: () => {
            if (values.unearnedIncome.unearnedOther.checked) {
              setFieldValue('unearnedIncome.unearnedOther.info', [{ amount: '' }])
            }
          },
          formElements: (fieldArrIndex, remove) => (
            [
              {
                inputType: 'currencyField',
                name: `unearnedIncome.unearnedOther.info[${fieldArrIndex}].amount`,
                placeholder: lang('global.placeholder.currency'),
                className: 'mt-2',
                ariaLabel: `Enter amount for Other types of income ${fieldArrIndex + 1}`,
                dataTestId: `unearnedOther${fieldArrIndex}`,
                removeBtnObj: {
                  dataTestID: `deleteButton${fieldArrIndex}`,
                  ariaLabel: `Remove Other types of income: ${fieldArrIndex + 1}`,
                  fieldArrIndex,
                  remove,
                }
              },
            ]
          ),
        },
      ]
    },
    {
      inputType: 'checkbox',
      name: 'noUnEarnedIncome',
      dataTestId: 'noUnEarnedIncome',
      className: 'mt-3',
      options: [
        {
          id: 'noUnEarnedIncome',
          value: 'noUnEarnedIncome',
          label: lang('global.label.noneAbove'),
          checkedValue: values.noUnEarnedIncome.includes('noUnEarnedIncome'),
          dataTestId: 'noUnEarnedIncome',
          className: 'mt-0',
          disabled: values.unearnedIncome.pension.checked
            || values.unearnedIncome.unemploymentInsurance.checked
            || values.unearnedIncome.socialSecurityRailroad.checked
            || values.unearnedIncome.scholarship.checked
            || values.unearnedIncome.investments.checked
            || values.unearnedIncome.unearnedOther.checked,
        },
      ]
    },
  ])
}

export const adjustmentsFormElements = (values, site, lang, setFieldValue) => {
  const { langCode } = useContext(HeaderContext)
  const { year } = site.forms.generalInfo.values

  return ([
    {
      inputType: 'conditionalCheckbox',
      label: lang('agi.heading.adjustments', { ':year': year }),
      name: 'adjustments',
      placeholder: lang('global.placeholder.amount'),
      className: 'inline-block',
      boldLabel: true,
      pushObject: {
        amount: ''
      },
      options: [
        {
          checkedValue: values.adjustments.studentLoan.checked,
          fieldArray: values.adjustments.studentLoan.info,
          name: 'adjustments.studentLoan.checked',
          label: lang('agi.label.studentLoan'),
          dataTestID: 'studentLoan',
          groupName: 'studentLoan',
          showFields: values.adjustments.studentLoan.checked,
          disabled: values.noAdjustments.includes('noAdjustments'),
          callout: {
            title: lang('agi.title.studentLoanCapMessage')
          },
          helpTip: {
            page: 'agi',
            expanded: site.forms.agi.helpTips['adjustments.studentLoan.checked'].open,
            ariaLabel: 'Student Loan Interest Deduction - Help Tip',
            elements: () => ToolTips.studentLoanToolTip(),
            dataTestID: 'studentLoan'
          },
          handleChange: () => {
            if (values.adjustments.studentLoan.checked) {
              setFieldValue('adjustments.studentLoan.info', [{ amount: '' }])
            }
          },
          formElements: (fieldArrIndex, remove) => (
            [
              {
                inputType: 'currencyField',
                name: `adjustments.studentLoan.info[${fieldArrIndex}].amount`,
                placeholder: lang('global.placeholder.currency'),
                className: 'mt-2',
                ariaLabel: `Enter amount for Student Loan Interest Deduction ${fieldArrIndex + 1}`,
                dataTestId: `studentLoan${fieldArrIndex}`,
                removeBtnObj: {
                  dataTestID: `deleteButton${fieldArrIndex}`,
                  ariaLabel: `Remove Student Loan Interest Deduction: ${fieldArrIndex + 1}`,
                  fieldArrIndex,
                  remove,
                }
              },
            ]
          ),
        },
        {
          checkedValue: values.adjustments.educator.checked,
          fieldArray: values.adjustments.educator.info,
          name: 'adjustments.educator.checked',
          label: lang('agi.label.educator'),
          dataTestID: 'educator',
          groupName: 'educator',
          showFields: values.adjustments.educator.checked,
          disabled: values.noAdjustments.includes('noAdjustments'),
          callout: {
            title: lang('agi.title.educatorExpenseCapMessage', { ':amount': fsCalc(site.forms.filingStatus.values) === 'married' ? '$500' : '$250' })
          },
          helpTip: {
            page: 'agi',
            expanded: site.forms.agi.helpTips['adjustments.educator.checked'].open,
            ariaLabel: 'Educator expenses - Help Tip',
            elements: () => ToolTips.educatorToolTip(year, langCode),
            dataTestID: 'educator'
          },
          handleChange: () => {
            if (values.adjustments.educator.checked) {
              setFieldValue('adjustments.educator.info', [{ amount: '' }])
            }
          },
          formElements: (fieldArrIndex, remove) => (
            [
              {
                inputType: 'currencyField',
                name: `adjustments.educator.info[${fieldArrIndex}].amount`,
                placeholder: lang('global.placeholder.currency'),
                className: 'mt-2',
                ariaLabel: `Enter amount for educator expenses ${fieldArrIndex + 1}`,
                dataTestId: `educator${fieldArrIndex}`,
                removeBtnObj: {
                  dataTestID: `deleteButton${fieldArrIndex}`,
                  ariaLabel: `Remove educator expenses: ${fieldArrIndex + 1}`,
                  fieldArrIndex,
                  remove,
                }
              },
            ]
          ),
        },
        {
          checkedValue: values.adjustments.ira.checked,
          fieldArray: values.adjustments.ira.info,
          name: 'adjustments.ira.checked',
          label: lang('agi.label.ira'),
          dataTestID: 'ira',
          groupName: 'ira',
          showFields: values.adjustments.ira.checked,
          disabled: values.noAdjustments.includes('noAdjustments'),
          helpTip: {
            page: 'agi',
            expanded: site.forms.agi.helpTips['adjustments.ira.checked'].open,
            ariaLabel: 'IRA contribution - Help Tip',
            elements: () => ToolTips.iraToolTip(),
            dataTestID: 'ira'
          },
          handleChange: () => {
            if (values.adjustments.ira.checked) {
              setFieldValue('adjustments.ira.info', [{ amount: '' }])
            }
          },
          formElements: (fieldArrIndex, remove) => (
            [
              {
                inputType: 'currencyField',
                name: `adjustments.ira.info[${fieldArrIndex}].amount`,
                placeholder: lang('global.placeholder.currency'),
                className: 'mt-2',
                ariaLabel: `Enter amount for IRA contribution ${fieldArrIndex + 1}`,
                dataTestId: `ira${fieldArrIndex}`,
                removeBtnObj: {
                  dataTestID: `deleteButton${fieldArrIndex}`,
                  ariaLabel: `Remove IRA contribution: ${fieldArrIndex + 1}`,
                  fieldArrIndex,
                  remove,
                }
              },
            ]
          ),
        },
        {
          checkedValue: values.adjustments.hsa.checked,
          fieldArray: values.adjustments.hsa.info,
          name: 'adjustments.hsa.checked',
          label: lang('agi.label.hsa'),
          dataTestID: 'hsa',
          groupName: 'hsa',
          showFields: values.adjustments.hsa.checked,
          disabled: values.noAdjustments.includes('noAdjustments'),
          helpTip: {
            page: 'agi',
            expanded: site.forms.agi.helpTips['adjustments.hsa.checked'].open,
            ariaLabel: 'HSA Deduction - Help Tip',
            elements: () => ToolTips.hsaToolTip(),
            dataTestID: 'hsa'
          },
          handleChange: () => {
            if (values.adjustments.hsa.checked) {
              setFieldValue('adjustments.hsa.info', [{ amount: '' }])
            }
          },
          formElements: (fieldArrIndex, remove) => (
            [
              {
                inputType: 'currencyField',
                name: `adjustments.hsa.info[${fieldArrIndex}].amount`,
                placeholder: lang('global.placeholder.currency'),
                className: 'mt-2',
                ariaLabel: `Enter amount for HSA Deduction ${fieldArrIndex + 1}`,
                dataTestId: `hsa${fieldArrIndex}`,
                removeBtnObj: {
                  dataTestID: `deleteButton${fieldArrIndex}`,
                  ariaLabel: `Remove HSA Deduction: ${fieldArrIndex + 1}`,
                  fieldArrIndex,
                  remove,
                }
              },
            ]
          ),
        },
        {
          checkedValue: values.adjustments.moving.checked,
          fieldArray: values.adjustments.moving.info,
          name: 'adjustments.moving.checked',
          label: lang('agi.label.moving'),
          dataTestID: 'moving',
          groupName: 'moving',
          showFields: values.adjustments.moving.checked,
          disabled: values.noAdjustments.includes('noAdjustments'),
          helpTip: {
            page: 'agi',
            expanded: site.forms.agi.helpTips['adjustments.moving.checked'].open,
            ariaLabel: 'Moving expenses - Help Tip',
            elements: () => ToolTips.movingToolTip(langCode),
            dataTestID: 'moving'
          },
          handleChange: () => {
            if (values.adjustments.moving.checked) {
              setFieldValue('adjustments.moving.info', [{ amount: '' }])
            }
          },
          formElements: (fieldArrIndex, remove) => (
            [
              {
                inputType: 'currencyField',
                name: `adjustments.moving.info[${fieldArrIndex}].amount`,
                placeholder: lang('global.placeholder.currency'),
                className: 'mt-2',
                ariaLabel: `Enter amount for Moving expenses ${fieldArrIndex + 1}`,
                dataTestId: `moving${fieldArrIndex}`,
                removeBtnObj: {
                  dataTestID: `deleteButton${fieldArrIndex}`,
                  ariaLabel: `Remove Moving expenses: ${fieldArrIndex + 1}`,
                  fieldArrIndex,
                  remove,
                }
              },
            ]
          ),
        },
        {
          checkedValue: values.adjustments.alimony.checked,
          fieldArray: values.adjustments.alimony.info,
          name: 'adjustments.alimony.checked',
          label: lang('agi.label.alimony'),
          dataTestID: 'alimony',
          groupName: 'alimony',
          showFields: values.adjustments.alimony.checked,
          disabled: values.noAdjustments.includes('noAdjustments'),
          helpTip: {
            page: 'agi',
            expanded: site.forms.agi.helpTips['adjustments.alimony.checked'].open,
            ariaLabel: 'Alimony paid - Help Tip',
            elements: () => ToolTips.alimonyToolTip(year, langCode),
            dataTestID: 'alimony'
          },
          handleChange: () => {
            if (values.adjustments.alimony.checked) {
              setFieldValue('adjustments.alimony.info', [{ amount: '' }])
            }
          },
          formElements: (fieldArrIndex, remove) => (
            [
              {
                inputType: 'currencyField',
                name: `adjustments.alimony.info[${fieldArrIndex}].amount`,
                placeholder: lang('global.placeholder.currency'),
                className: 'mt-2',
                ariaLabel: `Enter amount for Alimony paid ${fieldArrIndex + 1}`,
                dataTestId: `alimony${fieldArrIndex}`,
                removeBtnObj: {
                  dataTestID: `deleteButton${fieldArrIndex}`,
                  ariaLabel: `Remove Alimony paid: ${fieldArrIndex + 1}`,
                  fieldArrIndex,
                  remove,
                }
              },
            ]
          ),
        },
        {
          checkedValue: values.adjustments.earlyWithdrawalPenalty.checked,
          fieldArray: values.adjustments.earlyWithdrawalPenalty.info,
          name: 'adjustments.earlyWithdrawalPenalty.checked',
          label: lang('agi.label.earlyWithdrawalPenalty'),
          dataTestID: 'earlyWithdrawalPenalty',
          groupName: 'earlyWithdrawalPenalty',
          showFields: values.adjustments.earlyWithdrawalPenalty.checked,
          disabled: values.noAdjustments.includes('noAdjustments'),
          helpTip: {
            page: 'agi',
            expanded: site.forms.agi.helpTips['adjustments.earlyWithdrawalPenalty.checked'].open,
            ariaLabel: 'Early withdrawal of savings - Help Tip',
            elements: () => ToolTips.earlyWithdrawalPenaltyToolTip(),
            dataTestID: 'earlyWithdrawalPenalty'
          },
          handleChange: () => {
            if (values.adjustments.earlyWithdrawalPenalty.checked) {
              setFieldValue('adjustments.earlyWithdrawalPenalty.info', [{ amount: '' }])
            }
          },
          formElements: (fieldArrIndex, remove) => (
            [
              {
                inputType: 'currencyField',
                name: `adjustments.earlyWithdrawalPenalty.info[${fieldArrIndex}].amount`,
                placeholder: lang('global.placeholder.currency'),
                className: 'mt-2',
                ariaLabel: `Enter amount for early withdrawal of savings ${fieldArrIndex + 1}`,
                dataTestId: `earlyWithdrawalPenalty${fieldArrIndex}`,
                removeBtnObj: {
                  dataTestID: `deleteButton${fieldArrIndex}`,
                  ariaLabel: `Remove early withdrawal of savings: ${fieldArrIndex + 1}`,
                  fieldArrIndex,
                  remove,
                }
              },
            ]
          ),
        },
        {
          checkedValue: values.adjustments.business.checked,
          fieldArray: values.adjustments.business.info,
          name: 'adjustments.business.checked',
          label: lang('agi.label.business'),
          dataTestID: 'business',
          groupName: 'business',
          showFields: values.adjustments.business.checked,
          disabled: values.noAdjustments.includes('noAdjustments'),
          helpTip: {
            page: 'agi',
            expanded: site.forms.agi.helpTips['adjustments.business.checked'].open,
            ariaLabel: 'Business expenses - Help Tip',
            elements: () => ToolTips.businessToolTip(),
            dataTestID: 'business'
          },
          handleChange: () => {
            if (values.adjustments.business.checked) {
              setFieldValue('adjustments.business.info', [{ amount: '' }])
            }
          },
          formElements: (fieldArrIndex, remove) => (
            [
              {
                inputType: 'currencyField',
                name: `adjustments.business.info[${fieldArrIndex}].amount`,
                placeholder: lang('global.placeholder.currency'),
                className: 'mt-2',
                ariaLabel: `Enter amount for business expenses ${fieldArrIndex + 1}`,
                dataTestId: `business${fieldArrIndex}`,
                removeBtnObj: {
                  dataTestID: `deleteButton${fieldArrIndex}`,
                  ariaLabel: `Remove business expenses: ${fieldArrIndex + 1}`,
                  fieldArrIndex,
                  remove,
                }
              },
            ]
          ),
        },
        {
          checkedValue: values.adjustments.otherAdjustments.checked,
          fieldArray: values.adjustments.otherAdjustments.info,
          name: 'adjustments.otherAdjustments.checked',
          label: lang('agi.label.otherAdjustments'),
          dataTestID: 'otherAdjustments',
          groupName: 'otherAdjustments',
          showFields: values.adjustments.otherAdjustments.checked,
          disabled: values.noAdjustments.includes('noAdjustments'),
          handleChange: () => {
            if (values.adjustments.otherAdjustments.checked) {
              setFieldValue('adjustments.otherAdjustments.info', [{ amount: '' }])
            }
          },
          formElements: (fieldArrIndex, remove) => (
            [
              {
                inputType: 'currencyField',
                name: `adjustments.otherAdjustments.info[${fieldArrIndex}].amount`,
                placeholder: lang('global.placeholder.currency'),
                className: 'mt-2',
                ariaLabel: `Enter amount for Other Adjustments ${fieldArrIndex + 1}`,
                dataTestId: `otherAdjustments${fieldArrIndex}`,
                removeBtnObj: {
                  dataTestID: `deleteButton${fieldArrIndex}`,
                  ariaLabel: `Remove Other Adjustments: ${fieldArrIndex + 1}`,
                  fieldArrIndex,
                  remove,
                }
              },
            ]
          ),
        },
      ]
    },
    {
      inputType: 'checkbox',
      name: 'noAdjustments',
      dataTestId: 'noAdjustments',
      className: 'mt-3',
      options: [
        {
          id: 'noAdjustments',
          value: 'noAdjustments',
          label: lang('global.label.noneAbove'),
          checkedValue: values.noAdjustments.includes('noAdjustments'),
          dataTestId: 'noAdjustments',
          className: 'mt-0',
          disabled: values.adjustments.studentLoan.checked
            || values.adjustments.educator.checked
            || values.adjustments.ira.checked
            || values.adjustments.hsa.checked
            || values.adjustments.moving.checked
            || values.adjustments.alimony.checked
            || values.adjustments.earlyWithdrawalPenalty.checked
            || values.adjustments.business.checked
            || values.adjustments.otherAdjustments.checked,
        },
      ]
    },
  ])
}
