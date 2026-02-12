const resetForms = (site, siteDispatch) => {
  const generalInfoHelpTips = { ...site.forms.generalInfo.helpTips }
  const filingStatusHelpTips = { ...site.forms.filingStatus.helpTips }
  const agiHelpTips = { ...site.forms.agi.helpTips }
  const qualifyingChildrenHelpTips = { ...site.forms.qualifyingChildren.helpTips }

  Object.keys(generalInfoHelpTips).forEach((field) => {
    if (field !== 'year') {
      generalInfoHelpTips[field].open = false
    }
  })

  Object.keys(filingStatusHelpTips).forEach((field) => {
    filingStatusHelpTips[field].open = false
  })

  Object.keys(agiHelpTips).forEach((field) => {
    agiHelpTips[field].open = false
  })

  Object.keys(qualifyingChildrenHelpTips).forEach((field) => {
    qualifyingChildrenHelpTips[field].open = false
  })

  const newForms = {
    ...site.forms,
    generalInfo: {
      ...site.forms.generalInfo,
      completed: false,
      values: {
        ...site.forms.generalInfo.values,
        citizen: '',
        validSSN: '',
        foreignIncome: '',
        claimedAsDependent: '',
        age: '',
        qualifiedHomelessYouth: '',
        student: '',
      },
    },
    filingStatus: {
      ...site.forms.filingStatus,
      completed: false,
      values: {
        fsKnown: '',
        filingStatus: '',
        isMarriedHoH: '',
        maritalStatus: '',
        fileJointReturn: '',
        liveWithSpouse: '',
        houseUpkeep1: '',
        spousesPassing: '',
        intendJointReturnDeceased: '',
        entitledJointReturnDeceased: '',
        houseUpkeep2: '',
        claimDependent1: '',
        claimDependent2: '',
        houseUpkeep3: '',
        deceasedSpouseValidSSN: '',
        spouseValidSSN: '',
        wasSpouseAliveEndOfYear: '',
        spouseAge: '',
        spouseQualifiedHomelessYouth: '',
        spouseStudent: '',
        deceasedSpouseAge: '',
        deceasedSpouseQualifiedHomelessYouth: '',
        deceasedSpouseStudent: '',
        liveApartFromSpouse: '',
        mfsLegalDoc: '',
        numOfDependents: '',
        us50Percent: ''
      },
    },
    agi: {
      ...site.forms.agi,
      completed: false,
      values: {
        earnedIncome: {
          wagesFederalWithheld: {
            category: 'earned',
            checked: false,
            info: [
              {
                amount: ''
              }
            ]
          },
          wagesFederalWithheldNested: {
            taxDeferredRetirement: {
              category: 'deductions',
              checked: false,
              info: [
                {
                  amount: ''
                }
              ]
            },
            cafeteria: {
              category: 'deductions',
              checked: false,
              info: [
                {
                  amount: ''
                }
              ]
            },
            healthInsurance: {
              category: 'deductions',
              checked: false,
              info: [
                {
                  amount: ''
                }
              ]
            }
          },
          federalIncomeNotWithheld: {
            category: 'earned',
            checked: false,
            info: [
              {
                amount: ''
              }
            ]
          },
          federalIncomeNotWithheldNested: {
            selfEmploymentPaidFINW: {
              category: 'deductions',
              checked: false,
              info: [
                {
                  amount: ''
                }
              ]
            },
            sepSimpleFINW: {
              category: 'adjustments',
              checked: false,
              info: [
                {
                  amount: ''
                }
              ]
            },
            selfEmploymentInsuranceFINW: {
              category: 'adjustments',
              checked: false,
              info: [
                {
                  amount: ''
                }
              ]
            },
            selfEmploymentExpensesFINW: {
              category: 'deductions',
              checked: false,
              info: [
                {
                  amount: ''
                }
              ]
            }
          },
          selfEmploymentGross: {
            category: 'earned',
            checked: false,
            info: [
              {
                amount: ''
              }
            ]
          },
          selfEmploymentGrossNested: {
            selfEmploymentPaidSEG: {
              category: 'deductions',
              checked: false,
              info: [
                {
                  amount: ''
                }
              ]
            },
            sepSimpleSEG: {
              category: 'adjustments',
              checked: false,
              info: [
                {
                  amount: ''
                }
              ]
            },
            selfEmploymentInsuranceSEG: {
              category: 'adjustments',
              checked: false,
              info: [
                {
                  amount: ''
                }
              ]
            },
            selfEmploymentExpensesSEG: {
              category: 'deductions',
              checked: false,
              info: [
                {
                  amount: ''
                }
              ]
            }
          },
          disabilityRetirement: {
            category: 'earned',
            checked: false,
            info: [
              {
                amount: ''
              }
            ]
          },
          foreignEarnedIncome: {
            category: 'earned',
            checked: false,
            info: [
              {
                amount: ''
              }
            ]
          },
          prisonIncome: {
            category: 'unearned',
            checked: false,
            info: [
              {
                amount: ''
              }
            ]
          }
        },
        noIncome: [],
        unearnedIncome: {
          pension: {
            category: 'unearned',
            checked: false,
            info: [
              {
                amount: ''
              }
            ]
          },
          unemploymentInsurance: {
            category: 'unearned',
            checked: false,
            info: [
              {
                amount: ''
              }
            ]
          },
          socialSecurityRailroad: {
            category: 'unearned',
            checked: false,
            info: [
              {
                amount: ''
              }
            ]
          },
          scholarship: {
            category: 'unearned',
            checked: false,
            info: [
              {
                amount: ''
              }
            ]
          },
          investments: {
            category: 'unearned',
            checked: false,
            info: [
              {
                amount: ''
              }
            ]
          },
          unearnedOther: {
            category: 'unearned',
            checked: false,
            info: [
              {
                amount: ''
              }
            ]
          }
        },
        noUnEarnedIncome: [],
        adjustments: {
          studentLoan: {
            category: 'adjustments',
            checked: false,
            info: [
              {
                amount: ''
              }
            ]
          },
          educator: {
            category: 'adjustments',
            checked: false,
            info: [
              {
                amount: ''
              }
            ]
          },
          ira: {
            category: 'adjustments',
            checked: false,
            info: [
              {
                amount: ''
              }
            ]
          },
          hsa: {
            category: 'adjustments',
            checked: false,
            info: [
              {
                amount: ''
              }
            ]
          },
          moving: {
            category: 'adjustments',
            checked: false,
            info: [
              {
                amount: ''
              }
            ]
          },
          alimony: {
            category: 'adjustments',
            checked: false,
            info: [
              {
                amount: ''
              }
            ]
          },
          earlyWithdrawalPenalty: {
            category: 'adjustments',
            checked: false,
            info: [
              {
                amount: ''
              }
            ]
          },
          business: {
            category: 'adjustments',
            checked: false,
            info: [
              {
                amount: ''
              }
            ]
          },
          otherAdjustments: {
            category: 'adjustments',
            checked: false,
            info: [
              {
                amount: ''
              }
            ]
          }
        },
        noAdjustments: []
      },
    },
    qualifyingChildren: {
      ...site.forms.qualifyingChildren,
      completed: false,
      accordionOpenArr: [
        false
      ],
      values: {
        numOfDependents: '',
        us50Percent: '',
        children: [
          {
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
            younger: ''
          }
        ]
      },
    },
    results: {
      ...site.forms.results,
      completed: false,
    }
  }

  siteDispatch({
    type: 'UPDATE_FORMS',
    payload: newForms,
  })
}

export default resetForms
