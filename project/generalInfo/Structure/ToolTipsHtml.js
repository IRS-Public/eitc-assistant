export const yearToolTip = () => (
  [
    {
      key: 'tt-1-1',
      type: 'Heading',
      level: '2',
      className: 'text-xl mb-2 font-bold',
      text: 'generalInfo.h2.yearTT',
      dataTestID: 'yearToolTipHeader'
    },
    {
      key: 'tt-1-2',
      type: 'Paragraph',
      className: 'my-3',
      text: 'generalInfo.p.yearTT',
      dataTestID: 'yearToolTipParagraph1'
    },
    {
      key: 'tt-1-3',
      type: 'List',
      className: 'my-3 ml-10 list list-disc',
      dataTestID: 'yearToolTipList',
      list: [
        'generalInfo.li.yearTT1',
        'generalInfo.li.yearTT2',
        'generalInfo.li.yearTT3'
      ]
    }
  ]
)

export const citizenToolTip = () => (
  [
    {
      key: 'tt-2-1',
      type: 'Heading',
      level: '2',
      className: 'text-xl mb-2 font-bold',
      text: 'generalInfo.h2.citizenTT',
      dataTestID: 'citizenToolTipHeader'
    },
    {
      key: 'tt-2-2',
      type: 'Paragraph',
      className: 'my-3',
      text: 'generalInfo.p.citizenTT1',
      dataTestID: 'citizenToolTipParagraph1'
    },
    {
      key: 'tt-2-3',
      type: 'Paragraph',
      className: 'my-3',
      text: 'generalInfo.p.citizenTT2',
      dataTestID: 'citizenToolTipParagraph2'
    },
    {
      key: 'tt-2-4',
      type: 'Paragraph',
      className: 'my-3',
      text: 'generalInfo.p.citizenTT3',
      dataTestID: 'citizenToolTipParagraph3',
      replacements: [
        {
          type: 'link',
          key: ':irsPub519',
          href: 'https://www.irs.gov/forms-pubs/about-publication-519',
          text: 'generalInfo.a.citizenTT',
          external: true,
          dataTestID: 'citizenToolTipLink',
        }
      ]
    }
  ]
)

export const validSSNToolTip = (year) => (
  [
    {
      key: 'tt-3-1',
      type: 'Heading',
      className: 'text-xl mb-2 font-bold',
      level: '2',
      text: 'generalInfo.h2.validSSNTT',
      dataTestID: 'validSSNToolTipHeader'
    },
    {
      key: 'tt-3-2',
      type: 'Paragraph',
      className: 'my-3',
      text: 'generalInfo.p.validSSNTT1',
      dataTestID: 'validSSNToolTipParagraph1',
      replacements: [
        {
          type: 'simpleText',
          key: ':year',
          text: year,
        }
      ]
    },
    {
      key: 'tt-3-3',
      type: 'Paragraph',
      className: 'my-3',
      text: 'generalInfo.p.validSSNTT2',
      dataTestID: 'validSSNToolTipParagraph2',
    },
    {
      key: 'tt-3-5',
      type: 'Paragraph',
      className: 'my-3',
      text: 'generalInfo.p.validSSNTT4',
      dataTestID: 'validSSNToolTipParagraph4',
    },
    {
      key: 'tt-3-6',
      type: 'List',
      className: 'my-3 ml-10 list list-disc',
      dataTestID: 'validSSNToolTipList',
      list: [
        'generalInfo.li.validSSNTT1',
        'generalInfo.li.validSSNTT2',
        'generalInfo.li.validSSNTT3',
        'generalInfo.li.validSSNTT4',
      ]
    },
    {
      key: 'tt-3-8',
      type: 'Paragraph',
      className: 'my-3',
      text: 'generalInfo.p.validSSNTT5',
      dataTestID: 'validSSNToolTipParagraph5',
      replacements: [
        {
          type: 'link',
          key: ':irsPub596',
          href: 'https://www.irs.gov/publications/p596',
          text: 'generalInfo.p.validSSNTT6',
          external: true,
          dataTestID: 'citizenToolTipLink',
        },
        {
          type: 'link',
          key: ':validSocial',
          href: 'https://www.irs.gov/publications/p596#en_US_2024_publink1000297446',
          text: 'generalInfo.p.validSSNTT7',
          external: true,
          dataTestID: 'citizenToolTipLink',
        }
      ]
    },
  ]
)

export const claimedAsDependentToolTip = () => (
  [
    {
      key: 'tt-4-1',
      type: 'Heading',
      className: 'text-xl mb-2 font-bold',
      level: '2',
      text: 'generalInfo.h2.claimedAsDependentTT',
      dataTestID: 'claimToolTipHeader'
    },
    {
      key: 'tt-4-2',
      type: 'Paragraph',
      className: 'my-3',
      text: 'generalInfo.p.claimedAsDependentTT1',
      dataTestID: 'claimToolTipParagraph1'
    },
    {
      key: 'tt-4-3',
      type: 'Paragraph',
      className: 'my-3',
      text: 'generalInfo.li.claimedAsDependentTT1',
      dataTestID: 'claimToolTipParagraph2',
      replacements: [
          {
            type: 'bold',
            key: ':yesBold',
            text: 'global.label.yes'
          },
        [
          {
            type: 'bold',
            key: ':only',
            text: 'global.span.only'
          }
        ]
      ]
    },
    {
      key: 'tt-4-4',
      type: 'Paragraph',
      className: 'my-3',
      text: 'generalInfo.li.claimedAsDependentTT2',
      dataTestID: 'claimToolTipParagraph3',
      replacements: [
          {
            type: 'bold',
            key: ':only',
            text: 'global.span.only'
          }
      ]
    },
    {
      key: 'tt-4-5',
      type: 'Paragraph',
      className: 'my-3',
      text: 'generalInfo.p.claimedAsDependentTT2',
      dataTestID: 'claimToolTipParagraph5',
      replacements: [
        {
          type: 'link',
          key: ':whoMayIClaim',
          href: 'https://www.irs.gov/help/ita/whom-may-i-claim-as-a-dependent',
          text: 'generalInfo.a.claimedAsDependentTT1',
          external: true,
          dataTestID: 'claimToolTipLink1'
        }
      ]
    },
    {
      key: 'tt-4-6',
      type: 'Paragraph',
      className: 'my-3',
      text: 'generalInfo.p.claimedAsDependentTT3',
      dataTestID: 'claimToolTipParagraph6',
      replacements: [
        {
          type: 'link',
          key: ':irsPub596',
          href: 'https://www.irs.gov/publications/p596#en_US_2021_publink1000298540',
          text: 'generalInfo.a.claimedAsDependentTT2',
          external: true,
          dataTestID: 'claimToolTipLink2'
        }
      ]
    },
    {
      key: 'tt-4-7',
      type: 'Paragraph',
      className: 'my-3',
      text: 'generalInfo.p.claimedAsDependentTT4',
      dataTestID: 'claimToolTipParagraph7',
    }
  ]
)

export const foreignIncomeToolTip = () => (
  [
    {
      key: 'tt-5-1',
      type: 'Heading',
      level: '2',
      className: 'text-xl mb-2 font-bold',
      text: 'generalInfo.h2.foreignIncomeTT',
      dataTestID: 'foreignIncomeToolTipHeader'
    },
    {
      key: 'tt-5-2',
      type: 'Paragraph',
      className: 'my-3',
      text: 'generalInfo.p.foreignIncomeTT',
      dataTestID: 'foreignIncomeToolTipParagraph1',
      replacements: [
        {
          type: 'link',
          key: ':pub2555',
          href: 'https://www.irs.gov/forms-pubs/about-form-2555',
          text: 'generalInfo.a.foreignIncomeTT',
          external: true,
          dataTestID: 'foreignIncomeToolTipLink1'
        }
      ]
    },
  ]
)

export const qualifiedHomelessYouthToolTip = () => (
  [
    {
      key: 'tt-6-1',
      type: 'Heading',
      className: 'text-xl mb-2 font-bold',
      level: '2',
      text: 'generalInfo.h2.qualifiedHomelessYouthTT1',
      dataTestID: 'qualifiedHomelessYouthHelpTipHeading1'
    },
    {
      key: 'tt-6-2',
      type: 'Paragraph',
      className: 'my-3',
      text: 'generalInfo.p.qualifiedHomelessYouthTT1',
      dataTestID: 'qualifiedHomelessYouthHelpTipParagraph1',
    },
    {
      key: 'tt-6-3',
      type: 'Heading',
      className: 'text-xl mb-2 font-bold',
      level: '2',
      text: 'generalInfo.h2.qualifiedHomelessYouthTT2',
      dataTestID: 'qualifiedHomelessYouthHelpTipHeading2'
    },
    {
      key: 'tt-6-4',
      type: 'Paragraph',
      className: 'my-3',
      text: 'generalInfo.p.qualifiedHomelessYouthTT2',
      dataTestID: 'qualifiedHomelessYouthHelpTipParagraph2',
    },
  ]
)

export const studentToolTip = (year) => (
  [
    {
      key: 'tt-7-1',
      type: 'Heading',
      className: 'text-xl mb-2 font-bold',
      level: '2',
      text: 'generalInfo.h2.studentTT1',
      dataTestID: 'studentHelpTipHeading1'
    },
    {
      key: 'tt-7-2',
      type: 'Paragraph',
      className: 'my-3',
      text: 'generalInfo.p.studentTT1',
      dataTestID: 'studentHelpTipParagraph1',
      replacements: [
        {
          key: ':year',
          type: 'simpleText',
          text: year,
        }
      ]
    },
    {
      key: 'tt-7-3',
      type: 'Paragraph',
      className: 'my-3',
      text: 'generalInfo.p.spouseStudentTT2',
      dataTestID: 'spouseStudentHelpTipParagraph2',
      replacements: [
        {
          type: 'link',
          key: ':irsForm8863',
          href: 'https://www.irs.gov/forms-pubs/about-form-8863',
          text: 'generalInfo.a.spouseStudentTT1',
          external: true,
          dataTestID: 'spouseStudentHelpTipLink1'
        }
      ]
    },
  ]
)
