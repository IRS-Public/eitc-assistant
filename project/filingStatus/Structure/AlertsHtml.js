import React from 'react'
import HtmlBuilder from '../../../components/HtmlBuilder'
import params from '../../../calculations/eitc/EITCParams.json'
import { showIsMarriedHoH, showMaritalStatus } from '../Form/helpers/fsScenarios'

export const mfsWarning = (year, langCode) => {
  let elements = []

  if (params[year].useARPA) {
    elements = [
      {
        key: 'mfsWarning-p1',
        type: 'Paragraph',
        text: 'filingStatus.p.mfsLegalDocWarning1',
        className: 'text mt-1',
        dataTestID: 'mfsWarning-p1',
        replacements: [
          {
            type: 'simpleText',
            key: ':year',
            text: year,
            dataTestID: 'filingStatus.p.mfsLegalDocWarning1-year',
          },
          // {
          //   type: 'simpleText',
          //   key: ':year2',
          //   text: year,
          //   dataTestID: 'filingStatus.p.mfsLegalDocWarning1-year2',
          // },
          // {
          //   type: 'simpleText',
          //   key: ':year3',
          //   text: year,
          //   dataTestID: 'filingStatus.p.mfsLegalDocWarning1-year3',
          // },
        ]
      },
      {
        key: 'mfsWarning-p2',
        type: 'List',
        className: 'my-3 ml-10 list list-disc',
        dataTestID: 'filingStatusmfsLegalDocWarningList',
        list: [
          'filingStatus.li.mfsLegalDocWarning2',
          'filingStatus.li.mfsLegalDocWarning3'
        ],
        replacements: [
          [
            {
              type: 'simpleText',
              key: ':year1',
              text: year,
            }
          ],
          [
            {
              type: 'simpleText',
              key: ':year2',
              text: year,
            }
          ]
        ],
      },
      {
        key: 'mfsWarning-p4',
        type: 'Paragraph',
        text: 'filingStatus.p.mfsWarning4',
        className: 'text mt-1',
        dataTestID: 'mfsWarning-p4',
        replacements: [
          {
            type: 'link',
            key: ':irsPub501',
            href: 'https://www.irs.gov/forms-pubs/about-publication-501',
            text: 'filingStatus.a.filingStatusTT1',
            external: true,
            dataTestID: 'mfsWarning-a3',
          }
        ]
      },
    ]
  } else {
    elements = [
      {
        key: 'mfsWarning-p1',
        type: 'Paragraph',
        text: 'filingStatus.p.mfsWarning1',
        className: 'text mt-1',
        dataTestID: 'mfsWarning-p1',
      },
      {
        key: 'mfsWarning-p2',
        type: 'Paragraph',
        text: 'filingStatus.p.mfsWarning2',
        className: 'text mt-1',
        dataTestID: 'mfsWarning-p2',
        replacements: [
          {
            type: 'link',
            key: ':irsPub501',
            href: 'https://www.irs.gov/forms-pubs/about-publication-501',
            text: 'filingStatus.a.mfsWarning1',
            external: true,
            dataTestID: 'mfsWarning-a1',
          }
        ]
      },
      {
        key: 'mfsWarning-p3',
        type: 'Paragraph',
        text: 'filingStatus.p.mfsWarning3',
        className: 'text mt-1',
        dataTestID: 'mfsWarning-p3',
        replacements: [
          {
            type: 'link',
            key: ':irsPub596',
            href: langCode === 'en' ? 'https://www.irs.gov/forms-pubs/about-publication-596' : `https://www.irs.gov/${langCode}/forms-pubs/about-publication-596`,
            text: 'filingStatus.a.mfsWarning2',
            external: true,
            dataTestID: 'mfsWarning-a2',
          }
        ]
      }
    ]
  }

  return (
    <HtmlBuilder elements={elements} />
  )
}

export const spouseValidSSNWarning = () => (
  <HtmlBuilder elements={
    [
      {
        key: 'spouseValidSSNWarning-p1',
        type: 'Paragraph',
        text: 'filingStatus.p.spouseValidSSNWarning',
        className: 'text mt-1',
        dataTestID: 'spouseValidSSNWarning-p1',
      },
    ]}
  />
)

export const deceasedSpouseValidSSNWarning = () => (
  <HtmlBuilder elements={
    [
      {
        key: 'deceasedSpouseValidSSNWarning-p1',
        type: 'Paragraph',
        text: 'filingStatus.p.deceasedSpouseValidSSNWarning',
        className: 'text mt-1',
        dataTestID: 'deceasedSpouseValidSSNWarning-p1',
      },
      {
        key: 'deceasedSpouseValidSSNWarning-p2',
        type: 'Paragraph',
        text: 'filingStatus.p.deceasedSpouseValidSSNWarning2',
        className: 'text mt-2',
        dataTestID: 'deceasedSpouseValidSSNWarning-p2',
      },
    ]}
  />
)


export const noDependentsAgeWarning = (values, year, filingStatus) => {

  let elements = []
  if (params[year]?.useARPA && year =="2021") {
    if (filingStatus === 'married-separate'
      || (filingStatus === 'head-of-household'
        && ((showIsMarriedHoH(values, year) && values.isMarriedHoH === 'yes')
          || (showMaritalStatus(values) && values.maritalStatus === 'married')))) {

      elements = [
        {
          key: 'noDependentsAgeWarning-p1',
          type: 'Paragraph',
          text: 'filingStatus.p.noDependentsAgeWarningFS',
          className: 'text mt-1',
          dataTestID: 'noDependentsAgeWarning-p1',
          replacements: [

            {
              type: 'simpleText',
              key: ':year1',
              text: year,
              dataTestID: 'filingStatus.p.noDependentsAgeWarningFS-year',
            },
            {
              type: 'simpleText',
              key: ':year2',
              text: year,
              dataTestID: 'filingStatus.p.noDependentsAgeWarningFS-year',
            },
          ]
        },
      ]

    } else {

      elements = [

        {
          key: 'noDependentsAgeWarning-p3',
          type: 'Paragraph',
          text: 'filingStatus.p.noDependentsAgeWarning4',
          className: 'text mt-1',
          dataTestID: 'noDependentsAgeWarning-p3',
        },
        {
          key: 'noDependentsAgeWarning-ul',
          type: 'List',
          list: [
            'filingStatus.li.noDependentsAgeWarning3',
            'filingStatus.li.noDependentsAgeWarning4',
            'filingStatus.li.noDependentsAgeWarning5',
          ],
          className: 'my-3 ml-10 list list-disc',
          dataTestID: 'noDependentsAgeWarning-ul',
          replacements: [

            [],

            [
              {
                type: 'simpleText',
                key: ':year',
                text: year,
                dataTestID: 'filingStatus.p.noDependentsAgeWarning-year1',
              },
            ],
            [
              {
                type: 'simpleText',
                key: ':year',
                text: year,
                dataTestID: 'filingStatus.p.noDependentsAgeWarning-year2',

              },
            ]
          ]
        },
      ]
    }
  } 
  
  if (params[year]?.useARPA && year != "2021") {
    if (filingStatus === 'married-separate'
      || (filingStatus === 'head-of-household'
        && ((showIsMarriedHoH(values, year) && values.isMarriedHoH === 'yes')
          || (showMaritalStatus(values) && values.maritalStatus === 'married')))) {

      elements = [
        {
          key: 'noDependentsAgeWarning-p1',
          type: 'Paragraph',
          text: 'filingStatus.p.mfsLegalDocWarning1',
          className: 'text mt-1',
          dataTestID: 'noDependentsAgeWarning-p1',
          replacements: [

            {
              type: 'simpleText',
              key: ':year',
              text: year,
              dataTestID: 'filingStatus.p.noDependentsAgeWarningFS-year',
            },
          ]
        },
        {
          key: 'noDependentsAgeWarning-p2',
          type: 'List',
          className: 'my-3 ml-10 list list-disc',
          dataTestID: 'noDependentsAgeWarning-p2',
          list: [
            'filingStatus.li.mfsLegalDocWarning2',
            'filingStatus.li.mfsLegalDocWarning3'
          ],
          replacements: [
            [
              {
                type: 'simpleText',
                key: ':year1',
                text: year,
              }
            ],
            [
              {
                type: 'simpleText',
                key: ':year2',
                text: year,
              }
            ]
          ],
        },
        {
          key: 'noDependentsAgeWarning-p3',
          type: 'Paragraph',
          text: 'filingStatus.p.mfsWarning4',
          className: 'text mt-1',
          dataTestID: 'noDependentsAgeWarning-p3',
          replacements: [
            {
              type: 'link',
              key: ':irsPub501',
              href: 'https://www.irs.gov/forms-pubs/about-publication-501',
              text: 'filingStatus.a.filingStatusTT1',
              external: true,
              dataTestID: 'noDependentsAgeWarning-a3',
            }
          ]
        },
      ]

    } else {

      elements = [
        {
          key: 'noDependentsAgeWarning-p3',
          type: 'Paragraph',
          text: 'filingStatus.p.noDependentsAgeWarning3',
          className: 'text mt-1',
          dataTestID: 'noDependentsAgeWarning-p3',
        },
        {
          key: 'noDependentsAgeWarning-ul',
          type: 'List',
          list: [],
          className: 'my-3 ml-10 list list-disc',
          dataTestID: 'noDependentsAgeWarning-ul',
          replacements: [
            [],
            [
              {
                type: 'simpleText',
                key: ':year',
                text: year,
                dataTestID: 'filingStatus.p.noDependentsAgeWarning-year1',
              },
            ],
            [
              {
                type: 'simpleText',
                key: ':year',
                text: year,
                dataTestID: 'filingStatus.p.noDependentsAgeWarning-year2',
              },
            ]
          ]
        },
      ]
    }
  }  
  if (!params[year]?.useARPA )  {

    elements = [
      {
        key: 'noDependentsAgeWarning-p1',
        type: 'Paragraph',
        text: 'filingStatus.p.noDependentsAgeWarning',
        className: 'text mt-1',
        dataTestID: 'noDependentsAgeWarning-p1',
      },
      {
        key: 'noDependentsAgeWarning-ul',
        type: 'List',
        list: [
          'filingStatus.li.noDependentsAgeWarning1',
          'filingStatus.li.noDependentsAgeWarning2',
        ],
        className: 'my-3 ml-10 list list-disc',
        dataTestID: 'noDependentsAgeWarning-ul',
      },
    ]
  }
  return (
    <HtmlBuilder elements={elements} />
  )
}

export const us50PercentWarning = () => (
  <HtmlBuilder elements={
    [
      {
        key: 'us50PercentWarning-p1',
        type: 'Paragraph',
        text: 'filingStatus.p.us50PercentWarning',
        className: 'text mt-1',
        dataTestID: 'us50PercentWarning-p1'
      },
    ]}
  />
)
