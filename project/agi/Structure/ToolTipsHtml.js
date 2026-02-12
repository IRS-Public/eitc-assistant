import params from '../../../calculations/eitc/EITCParams.json'

export const wagesFederalWithheldToolTip = (year) => {
  let elements = []
  if( params[year]?.useARPA && year == "2022"){
  elements = [
    {
      key: 'tt-1-1',
      type: 'Heading',
      level: '2',
      className: 'text-xl mb-2 font-bold',
      text: 'agi.h2.wagesFederalWithheldTT1',
      dataTestID: 'wagesToolTipHeader1'
    },
    {
      key: 'tt-1-2',
      type: 'Paragraph',
      className: 'my-3',
      text: 'agi.p.wagesFederalWithheldTT1',
      replacements: [
        {
          type: 'bold',
          key: ':box1',
          text: 'global.span.box1'
        }
      ],
      dataTestID: 'wagesToolTipParagraph1',
    },
    {
      key: 'tt-1-2-2',
      type: 'Paragraph',
      className: 'my-3',
      text: 'agi.p.wagesFederalWithheldTT2-2',
      replacements: [
        {
          type: 'bold',
          key: ':box1',
          text: 'global.span.box1'
        }
      ],
      dataTestID: 'wagesToolTipParagraph2',
    },
    {
      key: 'tt-1-3',
      type: 'Paragraph',
      className: 'my-3',
      text: 'agi.p.wagesFederalWithheldTT2',
      replacements: [
        {
          type: 'bold',
          key: ':dontInclude',
          text: 'global.span.dontInclude'
        }
      ],
      dataTestID: 'wagesToolTipParagraph3',
    },
    {
      key: 'tt-1-4',
      type: 'Heading',
      level: '2',
      className: 'text-xl mb-2 font-bold',
      text: 'agi.h2.wagesFederalWithheldTT2',
      dataTestID: 'wagesToolTipHeader2',
    },
    {
      key: 'tt-1-5',
      type: 'Paragraph',
      className: 'my-3',
      text: 'agi.p.wagesFederalWithheldTT3',
      replacements: [
        {
          type: 'bold',
          key: ':box12',
          text: 'global.span.box12'
        },
        {
          type: 'bold',
          key: ':codeQ',
          text: 'global.span.codeQ'
        }
      ],
      dataTestID: 'wagesToolTipParagraph4',
    },
    {
      key: 'tt-1-6',
      type: 'Paragraph',
      className: 'my-3',
      text: 'agi.p.wagesFederalWithheldTT4',
      dataTestID: 'wagesToolTipParagraph5',
      replacements: [
        {
          type: 'link',
          key: ':irsPub596',
          href: 'https://www.irs.gov/publications/p596#en_US_2019_publink1000297672',
          text: 'agi.a.wagesFederalWithheldTT4',
          external: true,
          dataTestID: 'wagesToolTipLink1',
        }
      ]
    },
    {
      key: 'tt-1-7',
      type: 'Heading',
      level: '2',
      className: 'text-xl mb-2 font-bold',
      text: 'agi.h2.wagesFederalWithheldTT3',
      dataTestID: 'wagesToolTipHeader3',
    },
    {
      key: 'tt-1-8',
      type: 'Paragraph',
      className: 'my-3',
      text: 'agi.p.wagesFederalWithheldTT5',
      dataTestID: 'wagesToolTipParagraph6',
    },
    {
      key: 'tt-1-7',
      type: 'Heading',
      level: '2',
      className: 'text-xl mb-2 font-bold',
      text: 'agi.h2.wagesFederalWithheldTT4',
      dataTestID: 'wagesToolTipHeader3',
    },
    {
      key: 'tt-1-8',
      type: 'Paragraph',
      className: 'my-3',
      text: 'agi.p.wagesFederalWithheldTT6',
      dataTestID: 'wagesToolTipParagraph6',
    }
  ]
}
 else {
  elements = [
    {
      key: 'tt-1-1',
      type: 'Heading',
      level: '2',
      className: 'text-xl mb-2 font-bold',
      text: 'agi.h2.wagesFederalWithheldTT1',
      dataTestID: 'wagesToolTipHeader1'
    },
    {
      key: 'tt-1-2',
      type: 'Paragraph',
      className: 'my-3',
      text: 'agi.p.wagesFederalWithheldTT1',
      replacements: [
        {
          type: 'bold',
          key: ':box1',
          text: 'global.span.box1'
        }
      ],
      dataTestID: 'wagesToolTipParagraph1',
    },
    {
      key: 'tt-1-2-2',
      type: 'Paragraph',
      className: 'my-3',
      text: 'agi.p.wagesFederalWithheldTT2-2',
      replacements: [
        {
          type: 'bold',
          key: ':box1',
          text: 'global.span.box1'
        }
      ],
      dataTestID: 'wagesToolTipParagraph2',
    },
    {
      key: 'tt-1-3',
      type: 'Paragraph',
      className: 'my-3',
      text: 'agi.p.wagesFederalWithheldTT2',
      replacements: [
        {
          type: 'bold',
          key: ':dontInclude',
          text: 'global.span.dontInclude'
        }
      ],
      dataTestID: 'wagesToolTipParagraph3',
    },
    {
      key: 'tt-1-4',
      type: 'Heading',
      level: '2',
      className: 'text-xl mb-2 font-bold',
      text: 'agi.h2.wagesFederalWithheldTT2',
      dataTestID: 'wagesToolTipHeader2',
    },
    {
      key: 'tt-1-5',
      type: 'Paragraph',
      className: 'my-3',
      text: 'agi.p.wagesFederalWithheldTT3',
      replacements: [
        {
          type: 'bold',
          key: ':box12',
          text: 'global.span.box12'
        },
        {
          type: 'bold',
          key: ':codeQ',
          text: 'global.span.codeQ'
        }
      ],
      dataTestID: 'wagesToolTipParagraph4',
    },
    {
      key: 'tt-1-6',
      type: 'Paragraph',
      className: 'my-3',
      text: 'agi.p.wagesFederalWithheldTT4',
      dataTestID: 'wagesToolTipParagraph5',
      replacements: [
        {
          type: 'link',
          key: ':irsPub596',
          href: 'https://www.irs.gov/publications/p596#en_US_2019_publink1000297672',
          text: 'agi.a.wagesFederalWithheldTT4',
          external: true,
          dataTestID: 'wagesToolTipLink1',
        }
      ]
    },
    {
      key: 'tt-1-7',
      type: 'Heading',
      level: '2',
      className: 'text-xl mb-2 font-bold',
      text: 'agi.h2.wagesFederalWithheldTT3',
      dataTestID: 'wagesToolTipHeader3',
    },
    {
      key: 'tt-1-8',
      type: 'Paragraph',
      className: 'my-3',
      text: 'agi.p.wagesFederalWithheldTT5',
      dataTestID: 'wagesToolTipParagraph6',
    }
  ]
}
return elements
}

export const taxDeferredRetirementToolTip = () => (
  [
    {
      key: 'tt-2-1',
      type: 'Heading',
      level: '2',
      className: 'text-xl mb-2 font-bold',
      text: 'agi.h2.taxDeferredRetirementTT',
      dataTestID: 'retirementToolTipHeader1'
    },
    {
      key: 'tt-2-2',
      type: 'Paragraph',
      className: 'my-3',
      text: 'agi.p.taxDeferredRetirementTT1',
      dataTestID: 'retirementToolTipParagraph1'
    },
    {
      key: 'tt-2-3',
      type: 'List',
      className: 'my-3 ml-10 list list-disc',
      dataTestID: 'retirementToolTipList',
      list: [
        'agi.li.taxDeferredRetirementTT1',
        'agi.li.taxDeferredRetirementTT2',
        'agi.li.taxDeferredRetirementTT3',
        'agi.li.taxDeferredRetirementTT4',
        'agi.li.taxDeferredRetirementTT5',
        'agi.li.taxDeferredRetirementTT6',
        'agi.li.taxDeferredRetirementTT7'
      ]
    },
  ]
)

export const cafeteriaToolTip = () => (
  [
    {
      key: 'tt-3-1',
      type: 'Heading',
      level: '2',
      className: 'text-xl mb-2 font-bold',
      text: 'agi.h2.cafeteriaTT',
      dataTestID: 'cafeteriaToolTipHeader1'
    },
    {
      key: 'tt-3-2',
      type: 'Paragraph',
      className: 'my-3',
      text: 'agi.p.cafeteriaTT1',
      dataTestID: 'cafeteriaToolTipParagraph1'
    },
    {
      key: 'tt-3-3',
      type: 'Paragraph',
      className: 'my-3',
      text: 'agi.p.cafeteriaTT2',
      dataTestID: 'cafeteriaToolTipParagraph2'
    },
    {
      key: 'tt-3-4',
      type: 'List',
      className: 'my-3 ml-10 list list-disc',
      dataTestID: 'cafeteriaToolTipList',
      list: [
        'agi.li.cafeteriaTT1',
        'agi.li.cafeteriaTT2',
        'agi.li.cafeteriaTT3',
        'agi.li.cafeteriaTT4',
        'agi.li.cafeteriaTT5',
        'agi.li.cafeteriaTT6',
        'agi.li.cafeteriaTT7',
        'agi.li.cafeteriaTT8',
        'agi.li.cafeteriaTT9',
        'agi.li.cafeteriaTT10'
      ]
    }
  ]
)

export const healthInsuranceToolTip = () => (
  [
    {
      key: 'tt-4-1',
      type: 'Heading',
      level: '2',
      className: 'text-xl mb-2 font-bold',
      text: 'agi.h2.healthInsuranceTT',
      dataTestID: 'healthInsuranceToolTipHeader1'
    },
    {
      key: 'tt-4-2',
      type: 'Paragraph',
      className: 'my-3',
      text: 'agi.p.healthInsuranceTT',
      dataTestID: 'healthInsuranceToolTipParagraph1'
    }
  ]
)

export const federalIncomeNotWithheldToolTip = (langCode) => (
  [
    {
      key: 'tt-5-1',
      type: 'Heading',
      level: '2',
      className: 'text-xl mb-2 font-bold',
      text: 'agi.h2.federalIncomeNotWithheldTT',
      dataTestID: 'FINWToolTipHeader1'
    },
    {
      key: 'tt-5-2',
      type: 'Paragraph',
      className: 'my-3',
      text: 'agi.p.federalIncomeNotWithheldTT1',
      dataTestID: 'FINWToolTipParagraph1'
    },
    {
      key: 'tt-5-3',
      type: 'Paragraph',
      className: 'my-3',
      text: 'agi.p.federalIncomeNotWithheldTT2',
      dataTestID: 'FINWToolTipParagraph2'
    },
    {
      key: 'tt-5-4',
      type: 'Paragraph',
      className: 'my-3',
      text: 'agi.p.federalIncomeNotWithheldTT3',
      dataTestID: 'FINWToolTipParagraph2'
    },
    {
      key: 'tt-5-5',
      type: 'List',
      className: 'my-3 ml-10 list list-disc',
      dataTestID: 'FINWToolTipList',
      list: [
        'agi.li.federalIncomeNotWithheldTT1',
        'agi.li.federalIncomeNotWithheldTT2',
        'agi.li.federalIncomeNotWithheldTT3',
        'agi.li.federalIncomeNotWithheldTT4'
      ]
    },
    {
      key: 'tt-5-6',
      type: 'Paragraph',
      className: 'my-3',
      text: 'agi.p.federalIncomeNotWithheldTT4',
      dataTestID: 'FINWToolTipParagraph2'
    },
    {
      key: 'tt-5-7',
      type: 'Paragraph',
      className: 'my-3',
      text: 'agi.p.federalIncomeNotWithheldTT5',
      dataTestID: 'FINWToolTipParagraph3',
      replacements: [
        {
          type: 'link',
          key: ':manageTaxesForYourGigWork',
          href: langCode === 'en' ? 'https://www.irs.gov/businesses/small-businesses-self-employed/manage-taxes-for-your-gig-work' : `https://www.irs.gov/${langCode}/businesses/small-businesses-self-employed/manage-taxes-for-your-gig-work`,
          text: 'agi.a.federalIncomeNotWithheldTT',
          external: true,
          dataTestID: 'FINWToolTipLink1'
        }
      ]
    }
  ]
)

export const selfEmploymentPaidFINWToolTip = (year) => (
  [
    {
      key: 'tt-6-1',
      type: 'Paragraph',
      className: 'my-3',
      text: 'agi.p.selfEmploymentPaidFINWTT',
      dataTestID: 'selfEmploymentPaidFINWHelpTipParagraph1',
      replacements: [
        {
          type: 'simpleText',
          key: ':year',
          text: year,
        }
      ]
    }
  ]
)

export const sepSimpleFINWToolTip = () => (
  [
    {
      key: 'tt-7-1',
      type: 'Heading',
      level: '2',
      className: 'text-xl mb-2 font-bold',
      text: 'agi.h2.sepSimpleFINWTT',
      dataTestID: 'sepSimpleFINWToolTipHeader1'
    },
    {
      key: 'tt-7-2',
      type: 'Paragraph',
      className: 'my-3',
      text: 'agi.p.sepSimpleFINWTT1',
      dataTestID: 'sepSimpleFINWToolTipParagraph1'
    },
    {
      key: 'tt-7-3',
      type: 'List',
      className: 'my-3 ml-10 list list-disc',
      dataTestID: 'sepSimpleFINWToolTipList',
      list: [
        'agi.li.sepSimpleFINWTT1',
        'agi.li.sepSimpleFINWTT2'
      ]
    },
    {
      key: 'tt-7-4',
      type: 'Paragraph',
      className: 'my-3',
      text: 'agi.p.sepSimpleFINWTT2',
      dataTestID: 'sepSimpleFINWToolTipParagraph2',
      replacements: [
        {
          type: 'link',
          key: ':selfEmployedIndividuals',
          href: 'https://www.irs.gov/retirement-plans/self-employed-individuals-calculating-your-own-retirement-plan-contribution-and-deduction',
          text: 'agi.a.sepSimpleFINWTT',
          external: true,
          dataTestID: 'sepSimpleFINWToolTipLink1'
        }
      ]
    }
  ]
)

export const selfEmploymentInsuranceFINWToolTip = () => (
  [
    {
      key: 'tt-8-1',
      type: 'Heading',
      level: '2',
      className: 'text-xl mb-2 font-bold',
      text: 'agi.h2.selfEmploymentInsuranceFINWTT',
      dataTestID: 'selfEmploymentInsuranceFINWToolTipHeader1'
    },
    {
      key: 'tt-8-2',
      type: 'Paragraph',
      className: 'my-3',
      text: 'agi.p.selfEmploymentInsuranceFINWTT1',
      dataTestID: 'selfEmploymentInsuranceFINWToolTipParagraph1'
    },
    {
      key: 'tt-8-3',
      type: 'Paragraph',
      className: 'my-3',
      text: 'agi.p.selfEmploymentInsuranceFINWTT2',
      dataTestID: 'selfEmploymentInsuranceFINWToolTipParagraph2',
      replacements: [
        {
          type: 'link',
          key: ':irsPub535',
          href: 'https://www.irs.gov/publications/p535 ',
          text: 'agi.a.selfEmploymentInsuranceFINWTT',
          external: true,
          dataTestID: 'selfEmploymentInsuranceFINWToolTipLink1'
        }
      ]
    }
  ]
)

export const selfEmploymentExpensesFINWToolTip = () => (
  [
    {
      'key': 'tt-9-1',
      'type': 'Heading',
      'level': '2',
      'className': 'text-xl mb-2 font-bold',
      'text': 'agi.h2.selfEmploymentExpensesFINWTT',
      'dataTestID': 'selfEmploymentExpensesFINWToolTipHeader1'
    },
    {
      'key': 'tt-9-2',
      'type': 'Paragraph',
      'className': 'my-3',
      'text': 'agi.p.selfEmploymentExpensesFINWTT',
      'dataTestID': 'selfEmploymentExpensesFINWToolTipParagraph1'
    },
  ]
)

export const selfEmploymentGrossToolTip = () => (
  [
    {
      key: 'tt-9-1',
      type: 'Heading',
      level: '2',
      className: 'text-xl mb-2 font-bold break-words',
      text: 'agi.h2.selfEmploymentGrossTT',
      dataTestID: 'selfEmploymentGrossToolTipHeader1',
    },
    {
      key: 'tt-9-2',
      type: 'Paragraph',
      className: 'my-3 font-bold',
      text: 'agi.p.selfEmploymentGrossTT1',
      dataTestID: 'selfEmploymentGrossToolTipParagraph1',
    },
    {
      key: 'tt-9-3',
      type: 'Paragraph',
      text: 'agi.li.selfEmploymentGrossTT1',
      dataTestID: 'selfEmploymentGrossToolTipParagraph1',
    },
    {
      key: 'tt-9-4',
      type: 'Paragraph',
      text: 'agi.li.selfEmploymentGrossTT2',
      dataTestID: 'selfEmploymentGrossToolTipParagraph1',
    },
    {
      key: 'tt-9-5',
      type: 'Paragraph',
      text: 'agi.li.selfEmploymentGrossTT3',
      dataTestID: 'selfEmploymentGrossToolTipParagraph1',
    },
    {
      key: 'tt-9-6',
      type: 'Paragraph',
      text: 'agi.li.selfEmploymentGrossTT4',
      dataTestID: 'selfEmploymentGrossToolTipParagraph1',
    },
    {
      key: 'tt-9-7',
      type: 'Paragraph',
      text: 'agi.li.selfEmploymentGrossTT5',
      dataTestID: 'selfEmploymentGrossToolTipParagraph1',
    },

    // {
    //   key: 'tt-9-3',
    //   type: 'List',
    //   className: 'my-3 ml-10 list list-disc',
    //   dataTestID: 'selfEmploymentGrossToolTipList',
    //   list: [
    //     'agi.li.selfEmploymentGrossTT1',
    //     'agi.li.selfEmploymentGrossTT2',
    //     'agi.li.selfEmploymentGrossTT3',
    //     'agi.li.selfEmploymentGrossTT4',
    //     'agi.li.selfEmploymentGrossTT5'
    //   ]
    // },
    {
      key: 'tt-9-8',
      type: 'Paragraph',
      text: 'agi.p.selfEmploymentGrossTT2',
      dataTestID: 'selfEmploymentGrossToolTipParagraph2',
      replacements: [
        {
          type: 'bold',
          key: ':all',
          text: 'global.span.all'
        }
      ]
    },
    {
      key: 'tt-9-9',
      type: 'Paragraph',
      className: 'my-3',
      text: 'agi.p.selfEmploymentGrossTT3',
      dataTestID: 'selfEmploymentGrossToolTipParagraph3',
      replacements: [
        {
          type: 'link',
          key: ':formsForTheSelfEmployed',
          href: 'https://www.irs.gov/businesses/small-businesses-self-employed/publications-and-forms-for-the-self-employed',
          text: 'agi.a.selfEmploymentGrossTT',
          external: true,
          dataTestID: 'selfEmploymentGrossToolTipLink1'
        }
      ]
    }
  ]
)

export const selfEmploymentPaidSEGToolTip = (year) => (
  [
    {
      key: 'tt-10-1',
      type: 'Paragraph',
      className: 'my-3',
      text: 'agi.p.selfEmploymentPaidSEGTT',
      dataTestID: 'selfEmploymentPaidSEGToolTipParagraph1',
      replacements: [
        {
          type: 'simpleText',
          key: ':year',
          text: year,
        }
      ]
    }
  ]
)

export const sepSimpleSEGToolTip = () => (
  [
    {
      key: 'tt-11-1',
      type: 'Heading',
      level: '2',
      className: 'text-xl mb-2 font-bold',
      text: 'agi.h2.sepSimpleSEGTT',
      dataTestID: 'sepSimpleSEGToolTipHeader1'
    },
    {
      key: 'tt-11-2',
      type: 'Paragraph',
      className: 'my-3',
      text: 'agi.p.sepSimpleSEGTT1',
      dataTestID: 'sepSimpleSEGToolTipParagraph1'
    },
    {
      key: 'tt-11-3',
      type: 'List',
      className: 'my-3 ml-10 list list-disc',
      dataTestID: 'sepSimpleSEGToolTipList',
      list: [
        'agi.li.sepSimpleSEGTT1',
        'agi.li.sepSimpleSEGTT2'
      ]
    },
    {
      key: 'tt-11-4',
      type: 'Paragraph',
      className: 'my-3',
      text: 'agi.p.sepSimpleSEGTT2',
      dataTestID: 'sepSimpleSEGToolTipParagraph2',
      replacements: [
        {
          type: 'link',
          key: ':selfEmployedIndividuals',
          href: 'https://www.irs.gov/retirement-plans/self-employed-individuals-calculating-your-own-retirement-plan-contribution-and-deduction',
          text: 'agi.a.sepSimpleSEGTT',
          external: true,
          dataTestID: 'sepSimpleSEGToolTipLink1'
        }
      ]
    }
  ]
)

export const selfEmploymentInsuranceSEGToolTip = () => (
  [
    {
      key: 'tt-12-1',
      type: 'Heading',
      level: '2',
      className: 'text-xl mb-2 font-bold',
      text: 'agi.h2.selfEmploymentInsuranceSEGTT',
      dataTestID: 'selfEmploymentInsuranceSEGToolTipHeader1'
    },
    {
      key: 'tt-12-2',
      type: 'Paragraph',
      className: 'my-3',
      text: 'agi.p.selfEmploymentInsuranceSEGTT1',
      dataTestID: 'selfEmploymentInsuranceSEGToolTipParagraph1'
    },
    {
      key: 'tt-12-3',
      type: 'Paragraph',
      className: 'my-3',
      text: 'agi.p.selfEmploymentInsuranceSEGTT2',
      dataTestID: 'selfEmploymentInsuranceSEGToolTipParagraph2',
      replacements: [
        {
          type: 'link',
          key: ':irsPub535',
          href: 'https://www.irs.gov/publications/p535 ',
          text: 'agi.a.selfEmploymentInsuranceSEGTT',
          external: true,
          dataTestID: 'selfEmploymentInsuranceSEGToolTipLink1'
        }
      ]
    }
  ]
)

export const selfEmploymentExpensesSEGToolTip = () => (
  [
    {
      'key': 'tt-14-1',
      'type': 'Heading',
      'level': '2',
      'className': 'text-xl mb-2 font-bold',
      'text': 'agi.h2.selfEmploymentExpensesSEGTT',
      'dataTestID': 'selfEmploymentExpensesSEGToolTipHeader1'
    },
    {
      'key': 'tt-14-2',
      'type': 'Paragraph',
      'className': 'my-3',
      'text': 'agi.p.selfEmploymentExpensesSEGTT',
      'dataTestID': 'selfEmploymentExpensesSEGToolTipParagraph1'
    },
  ]
)

export const disabilityRetirementToolTip = () => (
  [
    {
      key: 'tt-13-1',
      type: 'Heading',
      level: '2',
      className: 'text-xl font-bold',
      text: 'agi.h2.disabilityRetirementTT',
      dataTestID: 'disabilityRetirementToolTipHeader1'
    },
    {
      key: 'tt-13-2',
      type: 'Paragraph',
      className: 'mb-3',
      text: 'agi.p.disabilityRetirementTT1',
      dataTestID: 'disabilityRetirementToolTipParagraph1'
    },
    {
      key: 'tt-13-3',
      type: 'Paragraph',
      className: 'my-3',
      text: 'agi.p.disabilityRetirementTT2',
      dataTestID: 'disabilityRetirementToolTipParagraph2'
    }
  ]
)

export const foreignEarnedIncomeToolTip = () => (
  [
    {
      key: 'tt-14-1',
      type: 'Heading',
      level: '2',
      className: 'text-xl font-bold',
      text: 'agi.h2.foreignEarnedIncomeTT1',
      dataTestID: 'foreignEarnedIncomeToolTipHeader1'
    },
    {
      key: 'tt-14-2',
      type: 'Paragraph',
      className: 'mb-3',
      text: 'agi.p.foreignEarnedIncomeTT1',
      dataTestID: 'foreignEarnedIncomeToolTipParagraph1'
    },
    {
      key: 'tt-14-4',
      type: 'Heading',
      level: '2',
      className: 'text-xl font-bold',
      text: 'agi.h2.foreignEarnedIncomeTT2',
      dataTestID: 'foreignEarnedIncomeToolTipHeader2'
    },
    {
      key: 'tt-14-5',
      type: 'Paragraph',
      className: 'mb-3',
      text: 'agi.p.foreignEarnedIncomeTT2',
      dataTestID: 'foreignEarnedIncomeToolTipParagraph3'
    },
    {
      key: 'tt-14-6',
      type: 'Heading',
      level: '2',
      className: 'text-xl font-bold',
      text: 'agi.h2.foreignEarnedIncomeTT3',
      dataTestID: 'foreignEarnedIncomeToolTipHeader2'
    },
    {
      key: 'tt-14-7',
      type: 'Paragraph',
      className: 'mb-3',
      text: 'agi.p.foreignEarnedIncomeTT3',
      dataTestID: 'foreignEarnedIncomeToolTipParagraph3'
    },
    {
      key: 'tt-14-8',
      type: 'Paragraph',
      className: 'my-3',
      text: 'agi.p.foreignEarnedIncomeTT4',
      dataTestID: 'foreignEarnedIncomeToolTipParagraph2',
      replacements: [
        {
          type: 'link',
          key: ':form2555',
          href: 'https://www.irs.gov/forms-pubs/about-form-2555',
          text: 'agi.a.foreignEarnedIncomeTT',
          external: true,
          dataTestID: 'foreignEarnedIncomeToolTipLink1',
        }
      ]
    },
        {
      key: 'tt-14-9',
      type: 'Paragraph',
      className: 'my-3',
      text: 'agi.p.foreignEarnedIncomeTT5',
      dataTestID: 'foreignEarnedIncomeToolTipParagraph3'
    },
  ]
)

export const prisonIncomeToolTip = () => (
  [
    {
      key: 'tt-15-1',
      type: 'Heading',
      level: '2',
      className: 'text-xl mb-2 font-bold',
      text: 'agi.h2.prisonIncomeTT',
      dataTestID: 'prisonIncomeToolTipHeader1'
    },
    {
      key: 'tt-15-2',
      type: 'Paragraph',
      className: 'my-3',
      text: 'agi.p.prisonIncomeTT1',
      dataTestID: 'prisonIncomeToolTipParagraph1'
    },
    {
      key: 'tt-15-3',
      type: 'Paragraph',
      className: 'my-3',
      text: 'agi.p.prisonIncomeTT2',
      dataTestID: 'prisonIncomeToolTipParagraph2',
      replacements: [
        {
          type: 'link',
          key: ':irsPub596Inmate',
          href: 'https://www.irs.gov/publications/p596#en_US_2019_publink1000297688',
          text: 'agi.a.prisonIncomeTT',
          external: true,
          dataTestID: 'prisonIncomeToolTipLink1'
        }
      ]
    }
  ]
)

export const pensionToolTip = (langCode) => (
  [
    {
      key: 'tt-16-1',
      type: 'Heading',
      level: '2',
      className: 'text-xl font-bold',
      text: 'agi.h2.pensionTT',
      dataTestID: 'pensionToolTipHeader1'
    },
    {
      key: 'tt-16-2',
      type: 'Paragraph',
      className: 'mb-3',
      text: 'agi.p.pensionTT1',
      dataTestID: 'pensionToolTipParagraph1'
    },
    {
      key: 'tt-16-3',
      type: 'Paragraph',
      className: 'my-3',
      text: 'agi.p.pensionTT2',
      dataTestID: 'pensionToolTipParagraph2'
    },
    {
      key: 'tt-16-4',
      type: 'List',
      className: 'my-3 ml-10 list list-disc',
      dataTestID: 'pensionToolTipList',
      list: [
        'agi.li.pensionTT1',
        'agi.li.pensionTT2',
        'agi.li.pensionTT3'
      ]
    },
    {
      key: 'tt-16-5',
      type: 'Paragraph',
      className: 'my-3',
      text: 'agi.p.pensionTT3',
      dataTestID: 'pensionToolTipParagraph3'
    },
    {
      key: 'tt-16-6',
      type: 'Paragraph',
      text: 'agi.li.pensionTT4',
      dataTestID: 'pensionToolTipList2',
    },
    {
      key: 'tt-16-7',
      type: 'Paragraph',
      text: 'agi.p.pensionTT4',
      dataTestID: 'pensionToolTipParagraph4'
    },
    {
      key: 'tt-16-8',
      type: 'Paragraph',
      className: 'my-3',
      text: 'agi.p.pensionTT5',
      dataTestID: 'pensionToolTipParagraph5',
      replacements: [
        {
          type: 'link',
          key: ':taxTopic410',
          href: langCode === 'en' ? 'https://www.irs.gov/taxtopics/tc410' : `https://www.irs.gov/${langCode}/taxtopics/tc410`,
          text: 'agi.a.pensionTT',
          external: true,
          dataTestID: 'pensionToolTipLink1'
        }
      ]
    }
  ]
)

export const unemploymentInsuranceToolTip = () => (
  [
    {
      key: 'tt-17-1',
      type: 'Heading',
      level: '2',
      className: 'text-xl mb-2 font-bold',
      text: 'agi.h2.unemploymentInsuranceTT',
      dataTestID: 'unemploymentInsuranceToolTipHeader1'
    },
    {
      key: 'tt-17-2',
      type: 'Paragraph',
      className: 'my-3',
      text: 'agi.p.unemploymentInsuranceTT1',
      dataTestID: 'unemploymentInsuranceToolTipParagraph1'
    },
    {
      key: 'tt-17-3',
      type: 'Paragraph',
      className: 'my-3',
      text: 'agi.p.unemploymentInsuranceTT2',
      dataTestID: 'unemploymentInsuranceToolTipParagraph2',
      replacements: [
        {
          type: 'bold',
          key: ':box1',
          text: 'global.span.box1'
        }
      ]
    }
  ]
)

export const socialSecurityRailroadToolTip = (langCode, year) => (
  [
    {
      key: 'tt-18-1',
      type: 'Heading',
      level: '2',
      className: 'text-xl mb-2 font-bold',
      text: 'agi.h2.socialSecurityRailroadTT1',
      dataTestID: 'SSToolTipHeader1'
    },
    {
      key: 'tt-18-2',
      type: 'Paragraph',
      className: 'my-3',
      text: 'agi.p.socialSecurityRailroadTT1',
      dataTestID: 'SSToolTipParagraph1',
      replacements: [
        {
          type: 'link',
          key: ':irsNotice703',
          href: year == "2023" ? 'https://www.irs.gov/forms-pubs/about-notice-703' : 'https://www.irs.gov/pub/irs-prior/n703--2021.pdf',
          text: 'agi.a.socialSecurityRailroadTT1',
          external: true,
          dataTestID: 'SSToolTipLink1',
        },
        {
          type: 'link',
          key: ':taxTopic423',
          href: langCode === 'en' ? 'https://www.irs.gov/taxtopics/tc423': `https://www.irs.gov/${langCode}/taxtopics/tc423`,
          text: 'agi.a.socialSecurityRailroadTT1',
          external: true,
          dataTestID: 'SSToolTipLink2',
        }
      ]
    },
    {
      key: 'tt-18-3',
      type: 'Paragraph',
      className: 'my-3',
      text: 'agi.p.socialSecurityRailroadTT2',
      dataTestID: 'SSToolTipParagraph2',
      replacements: [
        {
          type: 'link',
          key: ':taxTopic423',
          href: langCode === 'en' ? 'https://www.irs.gov/taxtopics/tc423': `https://www.irs.gov/${langCode}/taxtopics/tc423`,
          text: 'agi.a.socialSecurityRailroadTT2',
          external: true,
          dataTestID: 'SSToolTipLink2',
        }
      ]
    },
    {
      key: 'tt-18-4',
      type: 'Paragraph',
      className: 'my-3',
      text: 'agi.p.socialSecurityRailroadTT3',
      dataTestID: 'SSToolTipParagraph3',
      replacements: [
        {
          type: 'link',
          key: ':irsPub915',
          href: 'https://www.irs.gov/forms-pubs/about-publication-915',
          text: 'agi.a.socialSecurityRailroadTT3',
          external: true,
          dataTestID: 'SSToolTipLink3',
        }
      ]
    }
  ]
)

export const scholarshipToolTip = (langCode) => (
  [
    {
      key: 'tt-19-1',
      type: 'Heading',
      level: '2',
      className: 'text-xl mb-2 font-bold',
      text: 'agi.h2.scholarshipTT',
      dataTestID: 'scholarshipToolTipHeader1'
    },
    {
      key: 'tt-19-2',
      type: 'Paragraph',
      className: 'my-3',
      text: 'agi.p.scholarshipTT1',
      dataTestID: 'scholarshipToolTipParagraph1'
    },
    {
      key: 'tt-19-3',
      type: 'List',
      className: 'my-3 ml-10 list list-disc',
      dataTestID: 'scholarshipToolTipList',
      list: [
        'agi.li.scholarshipTT1',
        'agi.li.scholarshipTT2'
      ]
    },
    {
      key: 'tt-19-4',
      type: 'Paragraph',
      className: 'my-3',
      text: 'agi.p.scholarshipTT2',
      dataTestID: 'scholarshipToolTipParagraph2'
    },
    {
      key: 'tt-19-5',
      type: 'Paragraph',
      className: 'my-3',
      text: 'agi.p.scholarshipTT3',
      dataTestID: 'scholarshipToolTipParagraph3',
      replacements: [
        {
          type: 'link',
          key: ':taxTopic421',
          href: langCode === 'en' ? 'https://www.irs.gov/taxtopics/tc421': `https://www.irs.gov/${langCode}/taxtopics/tc421`,
          text: 'agi.a.scholarshipTT',
          external: true,
          dataTestID: 'scholarshipToolTipLink1'
        }
      ]
    }
  ]
)

export const investmentsToolTip = (year) => (
  [
    {
      key: 'tt-20-1',
      type: 'Heading',
      level: '2',
      className: 'text-xl font-bold',
      text: 'agi.h2.investmentsTT',
      dataTestID: 'investmentsToolTipHeader1'
    },
    {
      key: 'tt-20-2',
      type: 'Paragraph',
      text: 'agi.p.investmentsTT1',
      dataTestID: 'investmentsToolTipParagraph1'
    },
    {
      key: 'tt-20-3',
      type: 'List',
      className: 'my-3 ml-10 pl-2 list list-disc',
      dataTestID: 'investmentsToolTipList',
      list: [
        'agi.li.investmentsTT1',
        'agi.li.investmentsTT2',
        'agi.li.investmentsTT3',
        'agi.li.investmentsTT4',
        'agi.li.investmentsTT5',
      ]
    },
    {
      key: 'tt-20-4',
      type: 'Paragraph',
      className: 'my-3',
      text: 'agi.p.investmentsTT2',
      dataTestID: 'investmentsToolTipParagraph2',
      replacements: [
        {
          type: 'link',
          key: ':irsPub550',
          href: 'https://www.irs.gov/forms-pubs/about-publication-550 ',
          text: 'agi.a.investmentsTT1',
          external: true,
          dataTestID: 'investmentsToolTipLink1'
        }
      ]
    },
    {
      key: 'tt-20-5',
      type: 'Paragraph',
      className: 'my-3',
      text: 'agi.p.investmentsTT3',
      dataTestID: 'investmentsToolTipParagraph3',
      replacements: [
        {
          type: 'link',
          key: ':irsPub596',
          href: 'https://www.irs.gov/publications/p596#en_US_2019_publink1000297452',
          text: 'agi.a.investmentsTT2',
          external: true,
          dataTestID: 'investmentsToolTipLink2'
        },
        {
          type: 'simpleText',
          key: ':year',
          text: year,
        }
      ]
    },
    {
      key: 'tt-20-6',
      type: 'List',
      className: 'my-3 ml-10 pl-2 list list-disc',
      dataTestID: 'investmentsToolTipList2',
      list: [
        'agi.li.investmentsTT6',
        'agi.li.investmentsTT7',
        'agi.li.investmentsTT8',
        'agi.li.investmentsTT9',
        'agi.li.investmentsTT10'
      ]
    }
  ]
)

export const unearnedOtherToolTip = (year) => {
  
  let elements = []

  if (params[year]?.useARPA && year == "2022") {
  elements = [
  
    {
      key: 'tt-21-1',
      type: 'Heading',
      level: '2',
      className: 'text-xl mb-2 font-bold',
      text: 'agi.h2.unearnedOtherTT1',
      dataTestID: 'unearnedOtherToolTipHeader1'
    },
    {
      key: 'tt-21-2',
      type: 'Paragraph',
      className: 'my-3',
      text: 'agi.p.unearnedOtherTT1',
      dataTestID: 'unearnedOtherToolTipParagraph1'
    },
    {
      key: 'tt-21-3',
      type: 'List',
      className: 'my-3 ml-10 list list-disc',
      dataTestID: 'unearnedOtherToolTipList',
      list: [
        'agi.li.unearnedOtherTT1',
        'agi.li.unearnedOtherTT2',
        'agi.li.unearnedOtherTT3',
        'agi.li.unearnedOtherTT4',
        'agi.li.unearnedOtherTT5',
        'agi.li.unearnedOtherTT6',
        'agi.li.unearnedOtherTT7',
        'agi.li.unearnedOtherTT8',
        'agi.li.unearnedOtherTT9',
        'agi.li.unearnedOtherTT10',
        'agi.li.unearnedOtherTT11',
        'agi.li.unearnedOtherTT12'
      ],
    },
    {
      key: 'tt-21-4',
      type: 'Paragraph',
      className: 'my-3 font-bold',
      text: 'agi.h2.unearnedOtherTT2',
      dataTestID: 'unearnedOtherToolTipParagraph2'
    },
    {
      key: 'tt-21-5',
      type: 'List',
      className: 'my-3 ml-10 list list-disc',
      dataTestID: 'unearnedOtherToolTipList2',
      list: [
        'agi.li.unearnedOtherTT13',
        'agi.li.unearnedOtherTT14',
        'agi.li.unearnedOtherTT15',
        'agi.li.unearnedOtherTT16',
        'agi.li.unearnedOtherTT17',
        'agi.li.unearnedOtherTT18',
        'agi.li.unearnedOtherTT19',
        'agi.li.unearnedOtherTT20',
        'agi.li.unearnedOtherTT21',
        'agi.li.unearnedOtherTT22'
      ]
    },
    {
      key: 'tt-21-6',
      type: 'Paragraph',
      className: 'my-3',
      text: 'agi.p.unearnedOtherTT2',
      dataTestID: 'unearnedOtherToolTipParagraph3',
      replacements: [
        {
          type: 'link',
          key: ':irsPub525',
          href: 'https://www.irs.gov/forms-pubs/about-publication-525',
          text: 'agi.a.unearnedOtherTT',
          external: true,
          dataTestID: 'unearnedOtherToolTipLink1',
        }
      ]
    }
  ]
}
else {
  elements = [
    {
      key: 'tt-21-1',
      type: 'Heading',
      level: '2',
      className: 'text-xl mb-2 font-bold',
      text: 'agi.h2.unearnedOtherTT1',
      dataTestID: 'unearnedOtherToolTipHeader1'
    },
    {
      key: 'tt-21-2',
      type: 'Paragraph',
      className: 'my-3',
      text: 'agi.p.unearnedOtherTT1',
      dataTestID: 'unearnedOtherToolTipParagraph1'
    },
    {
      key: 'tt-21-3',
      type: 'List',
      className: 'my-3 ml-10 list list-disc',
      dataTestID: 'unearnedOtherToolTipList',
      list: [
        'agi.li.unearnedOtherTT1',
        'agi.li.unearnedOtherTT2',
        'agi.li.unearnedOtherTT3',
        'agi.li.unearnedOtherTT23',
        'agi.li.unearnedOtherTT5',
        'agi.li.unearnedOtherTT6',
        'agi.li.unearnedOtherTT7',
        'agi.li.unearnedOtherTT8',
        'agi.li.unearnedOtherTT9',
        'agi.li.unearnedOtherTT10',
        'agi.li.unearnedOtherTT11',
        'agi.li.unearnedOtherTT12'
      ],
    },
    {
      key: 'tt-21-4',
      type: 'Paragraph',
      className: 'my-3 font-bold',
      text: 'agi.h2.unearnedOtherTT2',
      dataTestID: 'unearnedOtherToolTipParagraph2'
    },
    {
      key: 'tt-21-5',
      type: 'List',
      className: 'my-3 ml-10 list list-disc',
      dataTestID: 'unearnedOtherToolTipList2',
      list: [
        'agi.li.unearnedOtherTT24',
        'agi.li.unearnedOtherTT14',
        'agi.li.unearnedOtherTT15',
        'agi.li.unearnedOtherTT16',
        'agi.li.unearnedOtherTT17',
        'agi.li.unearnedOtherTT18',
        'agi.li.unearnedOtherTT19',
        'agi.li.unearnedOtherTT20',
        'agi.li.unearnedOtherTT21',
        'agi.li.unearnedOtherTT22'
      ]
    },
    {
      key: 'tt-21-6',
      type: 'Paragraph',
      className: 'my-3',
      text: 'agi.p.unearnedOtherTT2',
      dataTestID: 'unearnedOtherToolTipParagraph3',
      replacements: [
        {
          type: 'link',
          key: ':irsPub525',
          href: 'https://www.irs.gov/forms-pubs/about-publication-525',
          text: 'agi.a.unearnedOtherTT',
          external: true,
          dataTestID: 'unearnedOtherToolTipLink1',
        }
      ]
    }
  ]
}
return elements
}

export const studentLoanToolTip = () => (
  [
    {
      key: 'tt-22-1',
      type: 'Heading',
      level: '2',
      className: 'text-xl mb-2 font-bold',
      text: 'agi.h2.studentLoanTT',
      dataTestID: 'studentLoanToolTipHeader1'
    },
    {
      key: 'tt-22-2',
      type: 'Paragraph',
      className: 'my-3',
      text: 'agi.p.studentLoanTT1',
      dataTestID: 'studentLoanToolTipParagraph1'
    },
    {
      key: 'tt-22-3',
      type: 'Paragraph',
      className: 'my-3',
      text: 'agi.p.studentLoanTT2',
      dataTestID: 'studentLoanToolTipParagraph2'
    },
    {
      key: 'tt-22-4',
      type: 'List',
      className: 'my-3 ml-10 list list-disc',
      dataTestID: 'studentLoanToolTipList',
      list: [
        'agi.li.studentLoanTT1',
        'agi.li.studentLoanTT2',
        'agi.li.studentLoanTT3'
      ]
    },
    {
      key: 'tt-22-5',
      type: 'Paragraph',
      className: 'my-3',
      text: 'agi.p.studentLoanTT3',
      dataTestID: 'studentLoanToolTipParagraph3'
    },
    {
      key: 'tt-22-6',
      type: 'Paragraph',
      className: 'my-3',
      text: 'agi.p.studentLoanTT4',
      dataTestID: 'studentLoanToolTipParagraph4',
      replacements: [
        {
          type: 'link',
          key: ':irsPub970',
          href: 'https://www.irs.gov/forms-pubs/about-publication-970',
          text: 'agi.a.studentLoanTT',
          external: true,
          dataTestID: 'studentLoanToolTipLink1'
        }
      ]
    }
  ]
)

export const educatorToolTip = (year, langCode) => (
  [
    {
      key: 'tt-23-1',
      type: 'Heading',
      level: '2',
      className: 'text-xl mb-2 font-bold',
      text: 'agi.h2.educatorTT',
      dataTestID: 'educatorToolTipHeader1'
    },
    {
      key: 'tt-23-2',
      type: 'Paragraph',
      className: 'my-3',
      text: year == "2023" ? 'agi.p.educatorTT3': 'agi.p.educatorTT1',
      dataTestID: 'educatorToolTipParagraph1'
    },
    {
      key: 'tt-23-3',
      type: 'List',
      className: 'my-3 ml-10 list list-disc',
      dataTestID: 'educatorToolTipList',
      list: [
        'agi.li.educatorTT1',
        'agi.li.educatorTT2',
        'agi.li.educatorTT3',
        'agi.li.educatorTT4',
        'agi.li.educatorTT5'
      ]
    },
    {
      key: 'tt-23-4',
      type: 'Paragraph',
      className: 'my-3',
      text: 'agi.p.educatorTT2',
      dataTestID: 'educatorToolTipParagraph2',
      replacements: [
        {
          type: 'link',
          key: ':taxTopic458',
          href: langCode === 'en' ? 'https://www.irs.gov/taxtopics/tc458': `https://www.irs.gov/${langCode}/taxtopics/tc458`,
          text: 'agi.a.educatorTT',
          external: true,
          dataTestID: 'educatorToolTipLink1'
        }
      ]
    }
  ]
)
export const iraToolTip = () => (
  [
    {
      key: 'tt-24-1',
      type: 'Heading',
      level: '2',
      className: 'text-xl mb-2 font-bold',
      text: 'agi.h2.iraTT1',
      dataTestID: 'iraToolTipHeader1'
    },
    {
      key: 'tt-24-2',
      type: 'Paragraph',
      className: 'my-3',
      text: 'agi.p.iraTT1',
      dataTestID: 'iraToolTipParagraph1'
    },
    {
      key: 'tt-24-3',
      type: 'Paragraph',
      className: 'my-3',
      text: 'agi.p.iraTT2',
      dataTestID: 'iraToolTipParagraph2',
      replacements: [
        {
          type: 'bold',
          key: ':dontIncludeAmountsAbove',
          text: 'agi.bold.iraTT2'
        }
      ]
    },
    {
      key: 'tt-24-4',
      type: 'Paragraph',
      className: 'my-3',
      text: 'agi.p.iraTT3',
      dataTestID: 'iraToolTipParagraph3',
      replacements: [
        {
          type: 'link',
          key: ':iraDeductionLimits',
          href: 'https://www.irs.gov/retirement-plans/ira-deduction-limits',
          text: 'agi.a.iraTT',
          external: true,
          dataTestID: 'iraToolTipLink1'
        }
      ]
    }
  ]
)

export const hsaToolTip = () => (
  [
    {
      key: 'tt-25-1',
      type: 'Heading',
      level: '2',
      className: 'text-xl mb-2 font-bold',
      text: 'agi.h2.hsaTT',
      dataTestID: 'hsaToolTipHeader1'
    },
    {
      key: 'tt-25-2',
      type: 'Paragraph',
      className: 'my-3',
      text: 'agi.p.hsaTT1',
      dataTestID: 'hsaToolTipParagraph1'
    },
    {
      key: 'tt-25-3',
      type: 'Paragraph',
      className: 'my-3',
      text: 'agi.p.hsaTT2',
      dataTestID: 'hsaToolTipParagraph2',
      replacements: [
        {
          type: 'link',
          key: ':irsPub969',
          href: 'https://www.irs.gov/forms-pubs/about-publication-969',
          text: 'agi.a.hsaTT',
          external: true,
          dataTestID: 'hsaToolTipLink1'
        }
      ]
    }
  ]
)

export const movingToolTip = (langCode) => (
  [
    {
      key: 'tt-26-1',
      type: 'Heading',
      level: '2',
      className: 'text-xl mb-2 font-bold',
      text: 'agi.h2.movingTT',
      dataTestID: 'movingToolTipHeader1'
    },
    {
      key: 'tt-26-2',
      type: 'Paragraph',
      className: 'my-3',
      text: 'agi.p.movingTT1',
      dataTestID: 'movingToolTipParagraph1'
    },
    {
      key: 'tt-26-3',
      type: 'List',
      className: 'my-3 ml-10 list list-disc',
      dataTestID: 'movingToolTipList',
      list: [
        'agi.li.movingTT1',
        'agi.li.movingTT2'
      ]
    },
    {
      key: 'tt-26-4',
      type: 'Paragraph',
      className: 'my-3',
      text: 'agi.p.movingTT2',
      dataTestID: 'movingToolTipParagraph2',
      replacements: [
        {
          type: 'link',
          key: ':taxTopic455',
          href: langCode === 'en' ? 'https://www.irs.gov/taxtopics/tc455': `https://www.irs.gov/${langCode}/taxtopics/tc455`,
          text: 'agi.a.movingTT',
          external: true,
          dataTestID: 'movingToolTipLink1'
        }
      ]
    }
  ]
)

export const alimonyToolTip = (year, langCode) => {
  let elements = []
  if( params[year]?.useARPA && year == "2022"){
  elements = [
    {
      key: 'tt-27-1',
      type: 'Heading',
      level: '2',
      className: 'text-xl mb-2 font-bold',
      text: 'agi.h2.alimonyTT',
      dataTestID: 'alimonyToolTipHeader1'
    },
    {
      key: 'tt-27-2',
      type: 'Paragraph',
      className: 'my-3',
      text: 'agi.p.alimonyTT1',
      dataTestID: 'alimonyToolTipParagraph1',
      replacements: [
        {
          type: 'simpleText',
          key: ':year1',
          text: parseInt(year),
        },
        {
          type: 'simpleText',
          key: ':year2',
          text: year,
        },
      ]
    },
    {
      key: 'tt-27-3',
      type: 'Paragraph',
      className: 'my-3',
      text: 'agi.p.alimonyTT2',
      dataTestID: 'alimonyToolTipParagraph2',
    },
    {
      key: 'tt-27-4',
      type: 'List',
      className: 'my-3 ml-10 list list-disc',
      dataTestID: 'alimonyToolTipList',
      list: [
        'agi.li.alimonyTT1',
        'agi.li.alimonyTT2'
      ],
      replacements: [
        [],
        [
          {
            type: 'simpleText',
            key: ':year',
            text: year - 1,
          }
        ]
      ]
    },
    {
      key: 'tt-27-5',
      type: 'Paragraph',
      className: 'my-3',
      text: 'agi.p.alimonyTT3',
      dataTestID: 'alimonyToolTipParagraph3',
    },
    {
      key: 'tt-27-6',
      type: 'Paragraph',
      className: 'my-3',
      text: 'agi.p.alimonyTT4',
      dataTestID: 'alimonyToolTipParagraph4',
      replacements: [
        {
          type: 'link',
          key: ':taxTopic452',
          href: langCode === 'en' ? 'https://www.irs.gov/taxtopics/tc452' : `https://www.irs.gov/${langCode}/taxtopics/tc452`,
          text: 'agi.a.alimonyTT',
          external: true,
          dataTestID: 'alimonyToolTipLink1',
        }
      ]
    }
  ]
} else {
  elements = [
    {
      key: 'tt-27-1',
      type: 'Heading',
      level: '2',
      className: 'text-xl mb-2 font-bold',
      text: 'agi.h2.alimonyTT',
      dataTestID: 'alimonyToolTipHeader1'
    },
    {
      key: 'tt-27-2',
      type: 'Paragraph',
      className: 'my-3',
      text: 'agi.p.alimonyTT6',
      dataTestID: 'alimonyToolTipParagraph1',
      replacements: [
        {
          type: 'simpleText',
          key: ':year1',
          text: parseInt(year),
        },
        {
          type: 'simpleText',
          key: ':year2',
          text: year,
        },
      ]
    },
    {
      key: 'tt-27-3',
      type: 'Paragraph',
      className: 'my-3',
      text: 'agi.p.alimonyTT2',
      dataTestID: 'alimonyToolTipParagraph2',
    },
    {
      key: 'tt-27-4',
      type: 'Paragraph',
      className: 'my-3 font-bold',
      text: 'agi.h2.alimonyTT1',
      dataTestID: 'alimonyToolTipParagraph2',
      // replacements: [
      //   [],
      //   [
      //     {
      //       type: 'simpleText',
      //       key: ':year',
      //       text: year - 1,
      //     }
      //   ]
    },
      // replacements: [
      //   [],
      //   [
      //     {
      //       type: 'simpleText',
      //       key: ':year',
      //       text: year - 1,
      //     }
      //   ]
    {
      key: 'tt-27-5',
      type: 'Paragraph',
      className: 'mt-3',
      text: 'agi.p.alimonyTT3',
      dataTestID: 'alimonyToolTipParagraph3',
    },
    {
      key: 'tt-27-6',
      type: 'Paragraph',
      className: 'mb-3',
      text: 'agi.p.alimonyTT4',
      dataTestID: 'alimonyToolTipParagraph3',
      replacements: [
          {
            type: 'simpleText',
            key: ':year',
            text: year - 1,
          }
        ]
    },
    {
      key: 'tt-27-7',
      type: 'Paragraph',
      className: 'my-3',
      text: 'agi.p.alimonyTT5',
      dataTestID: 'alimonyToolTipParagraph4',
      replacements: [
        {
          type: 'link',
          key: ':taxTopic452',
          href: langCode === 'en' ? 'https://www.irs.gov/taxtopics/tc452' : `https://www.irs.gov/${langCode}/taxtopics/tc452`,
          text: 'agi.a.alimonyTT',
          external: true,
          dataTestID: 'alimonyToolTipLink1',
        }
      ]
    }
  ]
}
return elements
}

export const earlyWithdrawalPenaltyToolTip = () => (
  [
    {
      key: 'tt-28-1',
      type: 'Heading',
      level: '2',
      className: 'text-xl mb-2 font-bold',
      text: 'agi.h2.earlyWithdrawalPenaltyTT',
      dataTestID: 'earlyToolTipHeader1',
    },
    {
      key: 'tt-28-2',
      type: 'Paragraph',
      className: 'my-3',
      text: 'agi.p.earlyWithdrawalPenaltyTT',
      dataTestID: 'earlyToolTipParagraph1',
      replacements: [
        {
          type: 'bold',
          key: ':box2',
          text: 'global.span.box2'
        }
      ]
    }
  ]
)

export const businessToolTip = () => (
  [
    {
      key: 'tt-29-1',
      type: 'Heading',
      level: '2',
      className: 'text-xl mb-2 font-bold',
      text: 'agi.h2.businessTT',
      dataTestID: 'businessToolTipHeader1'
    },
    {
      key: 'tt-29-2',
      type: 'Paragraph',
      className: 'my-3',
      text: 'agi.p.businessTT1',
      dataTestID: 'businessToolTipParagraph1'
    },
    {
      key: 'tt-29-3',
      type: 'List',
      className: 'my-3 ml-10 list list-disc',
      dataTestID: 'businessToolTipList',
      list: [
        'agi.li.businessTT1',
        'agi.li.businessTT2',
        'agi.li.businessTT3',
        'agi.li.businessTT4'
      ]
    },
    {
      key: 'tt-29-4',
      type: 'Paragraph',
      className: 'my-3',
      text: 'agi.p.businessTT2',
      dataTestID: 'businessToolTipParagraph2'
    },
    {
      key: 'tt-29-5',
      type: 'Paragraph',
      className: 'my-3',
      text: 'agi.p.businessTT3',
      dataTestID: 'businessToolTipParagraph3'
    },
    {
      key: 'tt-29-6',
      type: 'Paragraph',
      className: 'my-3',
      text: 'agi.p.businessTT4',
      dataTestID: 'businessToolTipParagraph4',
      replacements: [
        {
          type: 'link',
          key: ':form2106',
          href: 'https://www.irs.gov/forms-pubs/about-form-2106',
          text: 'agi.a.businessTT',
          external: true,
          dataTestID: 'businessToolTipLink1'
        }
      ]
    }
  ]
)
