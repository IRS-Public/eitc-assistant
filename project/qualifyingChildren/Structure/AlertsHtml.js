import params from '../../../calculations/eitc/EITCParams.json'

const PrevPagesHTML = (lang, href) => (
  [
    {
      key: 'p1',
      type: 'Paragraph',
      className: 'mt-4',
      text: 'children.p.introNoQC1',
      dataTestID: 'noQCIntro',
      replacements: [
        {
          type: 'route',
          key: ':link',
          href,
          text: lang('global.a.filingStatus')
        }
      ]
    },
    {
      key: 'p2',
      type: 'Paragraph',
      className: 'mt-2',
      text: 'children.p.introNoQC2',
      dataTestID: 'noQCParagraph',
    }
  ]
)

const PrevPagesOneHTML = (lang, href) => (
  [
    {
      key: 'p1',
      type: 'Paragraph',
      className: 'text mt-4 lg:w-5/6 fade-in',
      text: 'children.p.introOneQC',
      dataTestID: '1ChildIntroParagraph',
      replacements: [
        {
          type: 'bold',
          key: ':bold',
          text: 'children.p.introOneQCBold'
        },
        {
          type: 'route',
          key: ':link',
          href,
          text: lang('global.a.filingStatus')
        }
      ]
    },
    {
      key: 'p2',
      type: 'Paragraph',
      text: 'global.span.asterisk',
      className: 'my-4 fade-in',
      dataTestID: '1ChildReqText',
      replacements: [
        {
          type: 'redText',
          key: ':*',
          text: '*'
        }
      ]
    },
  ]
)

const IntroHTML = (site, lang, langCode, numOfDependents, route) => (
  [
    {
      key: 'p1',
      type: 'Paragraph',
      text: 'children.p.introPlus',
      className: 'text mt-4 lg:w-5/6',
      dataTestID: 'qcIntroParagraph',
      replacements: [
        {
          type: 'route',
          key: ':link',
          href: route,
          text: lang('global.a.filingStatus'),
          dataTestID: 'qcPageFSLink1',
        },
      ]
    },
    {
      key: 'p2',
      type: 'Paragraph',
      text: 'global.span.asterisk',
      className: 'my-4',
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
)

const ShowChildrenLimitHtml = (lang, langCode, qualifyingChildren) => {
  let final = 0

  qualifyingChildren.forEach((item) => {
    item && final++
  })

  return (
    [
      {
        key: 'h3-1',
        type: 'Heading',
        className: 'text-xl my-2 font-bold',
        level: '3',
        text: final > 1
          ? 'children.h3.finalBlockTitle'
          : 'children.h3.finalBlockTitleSingle',
        dataTestID: 'finalBlockTitleHeading1',
        replacements: [
          {
            type: 'simpleText',
            key: ':num',
            text: final
          }
        ]
      },
      {
        key: 'p-1',
        type: 'Paragraph',
        text: lang('child.p.finalBlockTitleSingle'),
        dataTestID: 'finalBlockTitleParagraph1',
      },
    ]
  )
}

const ShowNoQcCreditHtml = (lang, langCode, href, qualifyingChildren) => {
  let final = 0

  qualifyingChildren.forEach((item) => {
    item && final++
  })

  return (
    [
      {
        key: 'h3-1',
        type: 'Heading',
        className: 'text-xl my-2 font-bold',
        level: '3',
        text: final > 1
          ? 'children.h3.finalBlockTitle'
          : 'children.h3.finalBlockTitleSingle',
        dataTestID: 'finalBlockTitleHeading1',
        replacements: [
          {
            type: 'simpleText',
            key: ':num',
            text: final
          }
        ]
      },
      {
        key: 'p-1',
        type: 'Paragraph',
        text: 'children.p.finalBlockP',
        dataTestID: 'finalBlockTitleParagraph1',
        replacements: [
          {
            type: 'route',
            key: ':link',
            href,
            text: lang('global.a.filingStatus')
          }
        ]
      },
    ]
  )
}

const NoQcButCreditMessageHtml = (lang, href, year) => {
  let elements = []
  if( params[year]?.useARPA && year == "2022"){
    elements =
  [
    {
      key: 'h3-1',
      type: 'Heading',
      className: 'text-xl mb-2 mt-6 font-bold fade-in',
      level: '3',
      text: 'children.h2.finalNoQcTitle',
      dataTestID: 'finalNoQcTitleHeading1',
    },
    {
      key: 'p-1',
      type: 'Paragraph',
      text: 'children.p.noQcButCreditMessage',
      className: 'fade-in w-5/6',
      dataTestID: 'noQcButCreditMessageParagraph1',
      replacements: [
        {
          type: 'route',
          key: ':link',
          href,
          text: lang('global.a.filingStatus'),
          dataTestID: 'qcPageFSLink2',
        }
      ]
    }
  ]
} else 
 {
  elements = 
    [
      {
        key: 'h3-1',
        type: 'Heading',
        className: 'text-xl mb-2 mt-6 font-bold fade-in',
        level: '3',
        text: 'children.h2.finalNoQcTitle2',
        dataTestID: 'finalNoQcTitleHeading1',
      },
      {
        key: 'p-1',
        type: 'Paragraph',
        text: 'children.p.noQcButCreditMessage',
        className: 'fade-in mb-3',
        dataTestID: 'noQcButCreditMessageParagraph1',
      },
      {
        key: 'p-2',
        type: 'Paragraph',
        text: 'children.p.introNoQC2',
        className: 'fade-in',
        dataTestID: 'noQcButCreditMessageParagraph2',
      }
    ]
 }

  return elements
}

const NoQCDisqualifiermHTML = (year, filingStatus, langCode) => {
  let elements = []
  if (params[year].useARPA && year =="2021") {
    if (filingStatus === 'married-separate') {
      elements = [
        {
          key: 'childDisqualifiersAge-p1',
          type: 'Paragraph',
          text: 'qualifyingChildren.p.childDisqualifiersAge',
          className: 'text mt-1',
          dataTestID: 'childDisqualifiersAge-p1',
        },
        {
          key: 'childDisqualifiersAge-ul',
          type: 'List',
          list: [
            'qualifyingChildren.li.childDisqualifiersAge1',
            'qualifyingChildren.li.childDisqualifiersAge2',
          ],
          className: 'my-3 ml-10 list list-disc',
          dataTestID: 'childDisqualifiersAge-ul',
        },
        {
          key: 'noDependentsAgeWarning-p2',
          type: 'Paragraph',
          text: 'qualifyingChildren.p.noDependentsAgeWarning2',
          className: 'text mt-1',
          dataTestID: 'noDependentsAgeWarning-p2',
          replacements: [
            {
              type: 'simpleText',
              key: ':year',
              text: year,
            },
            {
              type: 'link',
              key: ':irsPub596',
              href: langCode === 'en' ? 'https://www.irs.gov/forms-pubs/about-publication-596' : `https://www.irs.gov/${langCode}/forms-pubs/about-publication-596`,
              text: 'qualifyingChildren.a.noDependentsAgeWarning1',
              external: true,
              dataTestID: 'noDependentsAgeWarning-a1',
            }
          ]
        },
      ]
    } else {
      elements = [
        {
          key: 'childDisqualifiersAge-p1',
          type: 'Paragraph',
          text: 'qualifyingChildren.p.childDisqualifiersAge',
          className: 'text mt-1',
          dataTestID: 'childDisqualifiersAge-p1',
        },
        {
          key: 'childDisqualifiersAge-ul',
          type: 'List',
          list: [
            'qualifyingChildren.li.childDisqualifiersAge1',
            'qualifyingChildren.li.childDisqualifiersAge2',
          ],
          className: 'my-3 ml-10 list list-disc',
          dataTestID: 'childDisqualifiersAge-ul',
        },
      ]
    }
  }


  if (params[year].useARPA && year != "2021") {
    if (filingStatus === 'married-separate') {
      elements = [
        {
          key: 'childDisqualifiersAge-p1',
          type: 'Paragraph',
          text: 'filingStatus.p.noDependentsAgeWarning3',
          className: 'text mt-1',
          dataTestID: 'childDisqualifiersAge-p1',
        },
      ]
    } else {
      elements = [
        {
          key: 'childDisqualifiersAge-p1',
          type: 'Paragraph',
          text: 'filingStatus.p.noDependentsAgeWarning3',
          className: 'text mt-1',
          dataTestID: 'childDisqualifiersAge-p1',
        },
      ]
    }
  }

  if (!params[year].useARPA) {
    elements = [
      {
        key: 'childDisqualifiersAge',
        type: 'Paragraph',
        text: 'child.p.disqualifiersAge',
        dataTestID: 'childDisqualifiersAge',
      },
    ]
  }

  return elements
}

export {
  PrevPagesHTML,
  PrevPagesOneHTML,
  IntroHTML,
  ShowChildrenLimitHtml,
  ShowNoQcCreditHtml,
  NoQcButCreditMessageHtml,
  NoQCDisqualifiermHTML
}
