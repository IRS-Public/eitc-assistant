import params from '../../../calculations/eitc/EITCParams.json'

export const filingStatusToolTip = (year) => {
  let elements = []

 if (year == "2021") {
 elements = [
    {
      key: 'tt-1-1',
      type: 'Heading',
      level: '2',
      className: 'text-xl mb-2 font-bold',
      text: 'filingStatus.h2.filingStatusTT1',
      dataTestID: 'filingStatusHelpTipHeading1'
    },
    {
      key: 'tt-1-2',
      type: 'Paragraph',
      className: 'my-3',
      text: 'filingStatus.p.filingStatusTT1',
      dataTestID: 'filingStatusHelpTipParagraph1'
    },
    {
      key: 'tt-1-3',
      type: 'Paragraph',
      className: 'my-3',
      text: 'filingStatus.p.filingStatusTT2',
      dataTestID: 'filingStatusHelpTipParagraph2',
      replacements: [
        {
          type: 'link',
          key: ':irsPub501',
          href: 'https://www.irs.gov/forms-pubs/about-publication-501',
          text: 'filingStatus.a.filingStatusTT1',
          external: true,
          dataTestID: 'filingStatusHelpTipLink1'
        }
      ]
    },
    {
      key: 'tt-1-4',
      type: 'Heading',
      level: '2',
      className: 'text-xl mb-2 font-bold',
      text: 'filingStatus.h2.filingStatusTT3',
      dataTestID: 'filingStatusHelpTipHeading2'
    },
    {
      key: 'tt-1-5',
      type: 'Paragraph',
      className: 'my-3',
      text: 'filingStatus.p.filingStatusTT5',
      dataTestID: 'filingStatusHelpTipParagraph3'
    },
    {
      key: 'tt-1-6',
      type: 'List',
      className: 'my-3 ml-10 list list-disc',
      dataTestID: 'filingStatusHelpTipList',
      list: [
        'filingStatus.li.filingStatusTT1',
        'filingStatus.li.filingStatusTT6',
        'filingStatus.li.filingStatusTT3',
        'filingStatus.li.filingStatusTT4',
        'filingStatus.li.filingStatusTT7'
      ],
      replacements: [
        [],
        [
          {
            type: 'simpleText',
            key: ':year1',
            text: year - 2,
          },
          {
            type: 'simpleText',
            key: ':year2',
            text: year - 1,
          },
          {
            type: 'simpleText',
            key: ':year3',
            text: year,
          }
        ],
        [],
        [],
        [
          {
            type: 'bold',
            key: ':note',
            text: 'global.span.note',
          },
        ]
      ]
    },
    {
      key: 'tt-1-7',
      type: 'Paragraph',
      className: 'my-3',
      text: 'filingStatus.p.filingStatusTT2',
      dataTestID: 'filingStatusHelpTipParagraph4',
      replacements: [
        {
          type: 'link',
          key: ':irsPub501',
          href: 'https://www.irs.gov/forms-pubs/about-publication-501',
          text: 'filingStatus.a.filingStatusTT1',
          external: true,
          dataTestID: 'filingStatusHelpTipLink2'
        }
      ]
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
      text: 'filingStatus.h2.filingStatusTT1',
      dataTestID: 'filingStatusHelpTipHeading1'
    },
    {
      key: 'tt-1-2',
      type: 'List',
      className: 'my-3 ml-10 list list-disc',
      dataTestID: 'filingStatusHelpTipList',
      list: [
        'filingStatus.li.filingStatusTT1',
        'filingStatus.li.filingStatusTT2',
      ],
    },
    {
      key: 'tt-1-3',
      type: 'Paragraph',
      className: 'my-3',
      text: 'filingStatus.p.filingStatusTT2',
      dataTestID: 'filingStatusHelpTipParagraph2',
      replacements: [
        {
          type: 'link',
          key: ':irsPub501',
          href: 'https://www.irs.gov/forms-pubs/about-publication-501',
          text: 'filingStatus.a.filingStatusTT1',
          external: true,
          dataTestID: 'filingStatusHelpTipLink1'
        }
      ]
    },
    {
      key: 'tt-1-4',
      type: 'Heading',
      level: '2',
      className: 'text-xl mb-2 font-bold',
      text: 'filingStatus.h2.filingStatusTT2',
      dataTestID: 'filingStatusHelpTipHeading2'
    },
    {
      key: 'tt-1-5',
      type: 'Paragraph',
      className: 'my-3',
      text: year == "2023" ?  '': 'filingStatus.p.filingStatusTT4',
      dataTestID: 'filingStatusHelpTipParagraph3'
    },
    {
      key: 'tt-1-6',
      type: 'Paragraph',
      className: 'my-3',
      text: 'filingStatus.p.filingStatusTT3',
      dataTestID: 'filingStatusHelpTipParagraph3'
    },
    {
      key: 'tt-1-7',
      type: 'List',
      className: 'my-3 ml-10 list list-disc',
      dataTestID: 'filingStatusHelpTipList',
      list: [
        'filingStatus.li.filingStatusTT3',
        'filingStatus.li.filingStatusTT4',
        'filingStatus.li.filingStatusTT5',
        'filingStatus.li.filingStatusTT6',
        'filingStatus.li.filingStatusTT7'
      ],
      replacements: [
        [],
        [
          {
            type: 'simpleText',
            key: ':year1',
            text: year,
          },
          {
            type: 'simpleText',
            key: ':year2',
            text: year,
          }
        ],
        [],
        [],
        [
          {
            type: 'bold',
            key: ':note',
            text: 'global.span.note',
          },
        ]
      ]
    },
    {
      key: 'tt-1-8',
      type: 'Paragraph',
      className: 'my-3',
      text: 'filingStatus.p.filingStatusTT2',
      dataTestID: 'filingStatusHelpTipParagraph4',
      replacements: [
        {
          type: 'link',
          key: ':irsPub501',
          href: 'https://www.irs.gov/forms-pubs/about-publication-501',
          text: 'filingStatus.a.filingStatusTT1',
          external: true,
          dataTestID: 'filingStatusHelpTipLink2'
        }
      ]
    }
  ]
}
return elements  
}



export const maritalStatusToolTip = () => (
  [
    {
      key: 'tt-2-1',
      type: 'Heading',
      level: '2',
      className: 'text-xl mb-2 font-bold',
      text: 'filingStatus.h2.maritalStatusTT1',
      dataTestID: 'maritalStatusHelpTipHeading1',
    },
    {
      key: 'tt-2-2',
      type: 'Paragraph',
      className: 'my-3',
      text: 'filingStatus.p.maritalStatusTT1',
      dataTestID: 'maritalStatusHelpTipParagraph1',
    },
    {
      key: 'tt-2-3',
      type: 'Heading',
      level: '2',
      className: 'text-xl mb-2 font-bold',
      text: 'filingStatus.h2.maritalStatusTT2',
      dataTestID: 'maritalStatusHelpTipHeading2',
    },
    {
      key: 'tt-2-4',
      type: 'Paragraph',
      className: 'my-3',
      text: 'filingStatus.p.maritalStatusTT2',
      dataTestID: 'maritalStatusHelpTipParagraph2',
    }
  ]
)

export const fileJointReturnToolTip = () => (
  [
    {
      key: 'tt-3-1',
      type: 'Heading',
      level: '2',
      className: 'text-xl mb-2 font-bold',
      text: 'filingStatus.h2.fileJointTT',
      dataTestID: 'jointReturnHelpTipHeading1'
    },
    {
      key: 'tt-3-2',
      type: 'Paragraph',
      className: 'my-3',
      text: 'filingStatus.p.fileJointTT',
      dataTestID: 'jointReturnHelpTipParagraph1',
      replacements: [
        {
          type: 'bold',
          key: ':mfj',
          text: 'filingStatus.legend.maritalStatus1'
        },
      ]
    }
  ]
)

export const intendJointReturnDeceasedToolTip = (year) => (
  [
    {
      key: 'tt-4-1',
      type: 'Heading',
      level: '2',
      className: 'text-xl mb-2 font-bold',
      text: 'filingStatus.h2.intendJointReturnDeceasedTT',
      dataTestID: 'jointReturnDeceasedHelpTipHeading1',
    },
    {
      key: 'tt-4-2',
      type: 'Paragraph',
      className: 'my-3',
      text: 'filingStatus.p.intendJointReturnDeceasedTT',
      dataTestID: 'jointReturnDeceasedHelpTipParagraph1',
      replacements: [
        {
          type: 'bold',
          key: ':mfj',
          text: 'filingStatus.legend.filingStatus4'
        },
        {
          type: 'simpleText',
          key: ':year',
          text: year
        }
      ]
    }
  ]
)

export const liveWithSpouseToolTip = () => (
  [
    {
      key: 'tt-5-1',
      type: 'Heading',
      level: '2',
      className: 'text-xl mb-2 font-bold',
      text: 'filingStatus.h2.liveWithSpouseTT',
      dataTestID: 'liveWithSpouseHelpTipHeading1'
    },
    {
      key: 'tt-5-2',
      type: 'Paragraph',
      className: 'my-3',
      text: 'filingStatus.p.liveWithSpouseTT1',
      dataTestID: 'liveWithSpouseHelpTipParagraph1'
    },
    {
      key: 'tt-5-3',
      type: 'List',
      className: 'my-3 ml-10 list list-disc',
      dataTestID: 'liveWithSpouseHelpTipList',
      list: [
        'filingStatus.li.liveWithSpouseTT1',
        'filingStatus.li.liveWithSpouseTT2',
        'filingStatus.li.liveWithSpouseTT3',
        'filingStatus.li.liveWithSpouseTT4',
        'filingStatus.li.liveWithSpouseTT5'
      ]
    },
    {
      key: 'tt-5-4',
      type: 'Paragraph',
      className: 'my-3',
      text: 'filingStatus.p.liveWithSpouseTT2',
      dataTestID: 'liveWithSpouseHelpTipParagraph2'
    }
  ]
)

export const houseUpkeepToolTip = () => (
  [
    {
      key: 'tt-6-1',
      type: 'Heading',
      level: '2',
      className: 'text-xl mb-2 font-bold',
      text: 'filingStatus.h2.houseUpkeepTT',
      dataTestID: 'upkeepHelpTipHeading1'
    },
    {
      key: 'tt-6-2',
      type: 'Paragraph',
      className: 'my-3',
      text: 'filingStatus.p.houseUpkeepTT1',
      dataTestID: 'upkeepHelpTipParagraph1'
    },
    {
      key: 'tt-6-3',
      type: 'Paragraph',
      className: 'my-3',
      text: 'filingStatus.p.houseUpkeepTT2',
      dataTestID: 'upkeepHelpTipParagraph2'
    },
    {
      key: 'tt-6-4',
      type: 'List',
      className: 'my-3 ml-10 list list-disc',
      dataTestID: 'upkeepHelpTipList',
      list: [
        'filingStatus.li.houseUpkeepTT1',
        'filingStatus.li.houseUpkeepTT2',
        'filingStatus.li.houseUpkeepTT3'
      ]
    },
    {
      key: 'tt-6-5',
      type: 'Paragraph',
      className: 'my-3',
      text: 'filingStatus.p.houseUpkeepTTN',
      dataTestID: 'upkeepHelpTipNoteParagraph1',
      replacements: [
        {
          type: 'bold',
          key: ':note',
          text: 'global.span.note'
        }
      ]
    },
    {
      key: 'tt-6-6',
      type: 'Paragraph',
      className: 'my-3',
      text: 'filingStatus.p.houseUpkeepTT3',
      dataTestID: 'upkeepHelpTipParagraph3',
    },
    {
      key: 'tt-6-7',
      type: 'List',
      className: 'my-3 ml-10 list list-disc',
      dataTestID: 'upkeepHelpTipList2',
      list: [
        'filingStatus.li.houseUpkeepTT5',
        'filingStatus.li.houseUpkeepTT6',
        'filingStatus.li.houseUpkeepTT7',
        'filingStatus.li.houseUpkeepTT8',
        'filingStatus.li.houseUpkeepTT10'
      ]
    },
  ]
)

export const claimDependent1ToolTip = () => (
  [
    {
      key: 'tt-7-1',
      type: 'Heading',
      className: 'text-xl mb-2 font-bold',
      level: '2',
      text: 'filingStatus.h2.claimDependentTT1',
      dataTestID: 'claimDependentHelpTipHeading1',
    },
    {
      key: 'tt-7-2',
      type: 'Paragraph',
      className: 'my-3',
      text: 'filingStatus.p.claimDependentTT1',
      dataTestID: 'claimDependentHelpTipParagraph1',
    },
    {
      key: 'tt-7-3',
      type: 'Heading',
      className: 'text-xl mb-2 font-bold',
      level: '2',
      text: 'filingStatus.h2.claimDependentTT2',
      dataTestID: 'claimDependentHelpTipHeading2',
    },
    {
      key: 'tt-7-4',
      type: 'Paragraph',
      className: 'my-3',
      text: 'filingStatus.p.claimDependentTT3',
      dataTestID: 'claimDependentHelpTipParagraph2',
      replacements: [
        {
          type: 'link',
          key: ':whoMayIClaim',
          href: 'https://www.irs.gov/help/ita/whom-may-i-claim-as-a-dependent',
          text: 'filingStatus.a.claimDependentTT',
          external: true,
          dataTestID: 'claimDependentHelpTipLink1',
        }
      ]
    },
  ]
)

export const claimDependent2ToolTip = () => (
  [
    {
      key: 'tt-8-1',
      type: 'Heading',
      className: 'text-xl mb-2 font-bold',
      level: '2',
      text: 'filingStatus.h2.claimDependentTT2',
      dataTestID: 'claimDependent2HelpTipHeading1',
    },
    {
      key: 'tt-8-2',
      type: 'Paragraph',
      className: 'my-3',
      text: 'filingStatus.p.claimDependentTT2',
      dataTestID: 'claimDependent2HelpTipParagraph1',
    },
    {
      key: 'tt-8-3',
      type: 'List',
      className: 'my-3 ml-10 list list-disc',
      dataTestID: 'claimDependent2HelpTipList',
      list: [
        'filingStatus.li.claimDependentTT1',
        'filingStatus.li.claimDependentTT2',
        'filingStatus.li.claimDependentTT3'
      ]
    },
    {
      key: 'tt-8-4',
      type: 'Paragraph',
      className: 'my-3',
      text: 'filingStatus.p.claimDependentTT3',
      dataTestID: 'claimDependent2HelpTipParagraph2',
      replacements: [
        {
          type: 'link',
          key: ':whoMayIClaim',
          href: 'https://www.irs.gov/help/ita/whom-may-i-claim-as-a-dependent',
          text: 'filingStatus.a.claimDependentTT',
          external: true,
          dataTestID: 'claimDependent2HelpTipLink1',
        }
      ]
    },
  ]
)

export const spouseValidSSNToolTip = (year) => (
  [
    {
      key: 'tt-9-1',
      type: 'Heading',
      className: 'text-xl mb-2 font-bold',
      level: '2',
      text: 'filingStatus.h2.spouseValidSSNTT',
      dataTestID: 'spouseSSNHelpTipHeading1',
    },
    {
      key: 'tt-9-2',
      type: 'Paragraph',
      className: 'my-3',
      text: 'filingStatus.p.spouseValidSSNTT1',
      dataTestID: 'spouseSSNHelpTipParagraph1',
      replacements: [
        {
          type: 'simpleText',
          key: ':year',
          text: year,
        }
      ]
    },
    // {
    //   key: 'tt-9-3',
    //   type: 'Paragraph',
    //   className: 'my-3',
    //   text: 'filingStatus.p.spouseValidSSNTT2',
    //   dataTestID: 'spouseSSNHelpTipParagraph2',
    // },
    {
      key: 'tt-9-4',
      type: 'Paragraph',
      className: 'my-3',
      text: 'filingStatus.p.spouseValidSSNTT3',
      dataTestID: 'spouseSSNHelpTipParagraph3',
    },
    {
      key: 'tt-9-5',
      type: 'Paragraph',
      className: 'my-3',
      text: 'filingStatus.p.spouseValidSSNTT4',
      dataTestID: 'spouseSSNHelpTipParagraph4',
    },
    {
      key: 'tt-9-6',
      type: 'List',
      className: 'my-3 ml-10 list list-disc',
      dataTestID: 'spouseSSNHelpTipList',
      list: [
        'filingStatus.li.spouseValidSSNTT1',
        'filingStatus.li.spouseValidSSNTT2',
        'filingStatus.li.spouseValidSSNTT3',
        'filingStatus.li.spouseValidSSNTT4'
      ]
    },
    {
      key: 'tt-9-7',
      type: 'Paragraph',
      className: 'my-3',
      text: 'filingStatus.p.spouseValidSSNTT5',
      dataTestID: 'spouseSSNHelpTipParagraph5',
      replacements: [
        {
          type: 'link',
          key: ':irsPub596',
          href: 'https://www.irs.gov/forms-pubs/about-publication-596',
          text: 'Publication 596',
          external: true,
          dataTestID: 'spouseSSNHelpTipLink1',
        },
        {
          type: 'link',
          key: ':validSSN',
          href: 'https://www.irs.gov/publications/p596#en_US_2024_publink1000297446',
          text: 'valid Social Security Number',
          external: true,
          dataTestID: 'spouseSSNHelpTipLink1',
        }
      ]
    }
  ]
)

export const numOfDependentsToolTip = (langCode, year) => (
  [
    {
      key: 'tt-10-1',
      type: 'Heading',
      className: 'text-xl mb-2 font-bold',
      level: '2',
      text: 'filingStatus.h2.numOfDependentsTT1',
      dataTestID: 'depHelpTipHeading1',
    },
    {
      key: 'tt-10-2',
      type: 'Paragraph',
      className: 'my-3',
      text: 'filingStatus.p.numOfDependentsTT2',
      dataTestID: 'depHelpTipParagraph1',
      replacements: [
        {
          type: 'simpleText',
          key: ':year',
          text: year,
        }
      ]
    },
    {
      key: 'tt-10-3',
      type: 'Paragraph',
      className: 'my-3',
      text: 'filingStatus.p.spouseValidSSNTT2',
      dataTestID: 'depHelpTipParagraph2',
    },
    // {
    //   key: 'tt-10-4',
    //   type: 'Paragraph',
    //   className: 'my-3',
    //   text: 'qualifyingChildren.p.validSSNTT3',
    //   dataTestID: 'depHelpTipParagraph3',
    // },
    {
      key: 'tt-10-5',
      type: 'Paragraph',
      className: 'my-3',
      text: 'qualifyingChildren.p.validSSNTT4',
      dataTestID: 'depHelpTipParagraph4',
    },
    {
      key: 'tt-10-6',
      type: 'List',
      className: 'my-3 ml-10 list list-disc',
      dataTestID: 'depHelpTipList',
      list: [
        'qualifyingChildren.li.validSSNTT1',
        'qualifyingChildren.li.validSSNTT2',
        'qualifyingChildren.li.validSSNTT3',
        'qualifyingChildren.li.validSSNTT4'
      ]
    },
    {
      key: 'tt-10-7',
      type: 'Paragraph',
      className: 'my-3',
      text: 'filingStatus.p.numOfDependentsTT1',
      dataTestID: 'depHelpTipParagraph5',
    },
    {
      key: 'tt-10-8',
      type: 'List',
      className: 'my-3 ml-10 list list-disc',
      dataTestID: 'depHelpTipList2',
      list: [
        'filingStatus.li.numOfDependentsTT1',
        'filingStatus.li.numOfDependentsTT2',
        'filingStatus.li.numOfDependentsTT3',
        'filingStatus.li.numOfDependentsTT4'
      ]
    },
    {
      key: 'tt-10-9',
      type: 'Paragraph',
      className: 'my-3',
      text: 'filingStatus.p.numOfDependentsTT3',
      dataTestID: 'depHelpTipParagraph6',
      replacements: [
        {
          type: 'link',
          key: ':irsPub596',
          href: langCode === 'en' ? 'https://www.irs.gov/forms-pubs/about-publication-596' : `https://www.irs.gov/${langCode}/forms-pubs/about-publication-596`,
          text: 'filingStatus.a.numOfDependentsTT1',
          external: true,
          dataTestID: 'numOfDependents-a1',
        }
      ]
    },
  ]
)

export const us50PercentToolTip = (year) => (
  [
    {
      key: 'tt-11-1',
      type: 'Heading',
      className: 'text-xl mb-2 font-bold',
      level: '2',
      text: 'filingStatus.h2.us50PercentTT1',
      dataTestID: 'us50HelpTipHeading1'
    },
    {
      key: 'tt-11-2',
      type: 'Paragraph',
      className: 'my-3',
      text: 'filingStatus.p.us50PercentTT1',
      dataTestID: 'us50HelpTipParagraph1',
      replacements: [
        {
          type: 'simpleText',
          key: ':year',
          text: year,
        }
      ]
    },
    {
      key: 'tt-11-3',
      type: 'Heading',
      className: 'text-xl mb-2 font-bold',
      level: '2',
      text: 'filingStatus.h2.us50PercentTT2',
      dataTestID: 'us50HelpTipHeading2'
    },
    {
      key: 'tt-11-4',
      type: 'Paragraph',
      className: 'my-3',
      text: 'filingStatus.p.us50PercentTT2',
      dataTestID: 'us50HelpTipParagraph2',
      replacements: [
        {
          type: 'bold',
          key: ':yes',
          text: 'global.label.yes'
        }
      ]
    }
  ]
)

export const spouseStudentToolTip = (year) => (
  [
    {
      key: 'tt-12-1',
      type: 'Heading',
      className: 'text-xl mb-2 font-bold',
      level: '2',
      text: 'filingStatus.h2.spouseStudentTT1',
      dataTestID: 'spouseStudentHelpTipHeading1'
    },
    {
      key: 'tt-12-2',
      type: 'Paragraph',
      className: 'my-3',
      text: 'filingStatus.p.spouseStudentTT1',
      dataTestID: 'spouseStudentHelpTipParagraph1',
      replacements: [
        {
          key: ':year',
          type: 'simpleText',
          text: year,
        }
      ]
    },
    {
      key: 'tt-12-3',
      type: 'Paragraph',
      className: 'my-3',
      text: 'filingStatus.p.spouseStudentTT2',
      dataTestID: 'spouseStudentHelpTipParagraph2',
      replacements: [
        {
          type: 'link',
          key: ':irsForm8863',
          href: 'https://www.irs.gov/forms-pubs/about-form-8863',
          text: 'filingStatus.a.spouseStudentTT1',
          external: true,
          dataTestID: 'spouseStudentHelpTipLink1'
        }
      ]
    },
  ]
)

export const spouseQualifiedHomelessYouthToolTip = () => (
  [
    {
      key: 'tt-13-1',
      type: 'Heading',
      className: 'text-xl mb-2 font-bold',
      level: '2',
      text: 'filingStatus.h2.spouseQualifiedHomelessYouthTT1',
      dataTestID: 'spouseQualifiedHomelessYouthHelpTipHeading1'
    },
    {
      key: 'tt-13-2',
      type: 'Paragraph',
      className: 'my-3',
      text: 'filingStatus.p.spouseQualifiedHomelessYouthTT1',
      dataTestID: 'spouseQualifiedHomelessYouthHelpTipParagraph1',
    },
    {
      key: 'tt-13-3',
      type: 'Heading',
      className: 'text-xl mb-2 font-bold',
      level: '2',
      text: 'filingStatus.h2.spouseQualifiedHomelessYouthTT2',
      dataTestID: 'spouseQualifiedHomelessYouthHelpTipHeading2'
    },
    {
      key: 'tt-13-4',
      type: 'Paragraph',
      className: 'my-3',
      text: 'filingStatus.p.spouseQualifiedHomelessYouthTT2',
      dataTestID: 'spouseQualifiedHomelessYouthHelpTipParagraph2',
    },
  ]
)

export const deceasedSpouseQualifiedHomelessYouthToolTip = () => (
  [
    {
      key: 'tt-14-1',
      type: 'Heading',
      className: 'text-xl mb-2 font-bold',
      level: '2',
      text: 'filingStatus.h2.deceasedSpouseQualifiedHomelessYouthTT1',
      dataTestID: 'deceasedSpouseQualifiedHomelessYouthHelpTipHeading1'
    },
    {
      key: 'tt-14-2',
      type: 'Paragraph',
      className: 'my-3',
      text: 'filingStatus.p.deceasedSpouseQualifiedHomelessYouthTT1',
      dataTestID: 'deceasedSpouseQualifiedHomelessYouthHelpTipParagraph1',
    },
    {
      key: 'tt-14-3',
      type: 'Heading',
      className: 'text-xl mb-2 font-bold',
      level: '2',
      text: 'filingStatus.h2.deceasedSpouseQualifiedHomelessYouthTT2',
      dataTestID: 'deceasedSpouseQualifiedHomelessYouthHelpTipHeading2'
    },
    {
      key: 'tt-14-4',
      type: 'Paragraph',
      className: 'my-3',
      text: 'filingStatus.p.deceasedSpouseQualifiedHomelessYouthTT2',
      dataTestID: 'deceasedSpouseQualifiedHomelessYouthHelpTipParagraph2',
    },
  ]
)
