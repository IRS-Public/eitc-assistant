import React from 'react'
import params from '../../../calculations/eitc/EITCParams.json'
import HtmlBuilder from '../../../components/HtmlBuilder'
import { formatMoney } from '../../../helpers'

export const noEarnedIncomeWarning = () => (
  <HtmlBuilder elements={
    [
      {
        key: 'noEarnedIncomeWarning-p1',
        type: 'Paragraph',
        text: 'agi.p.noEarnedIncomeWarning1',
        className: 'text mt-1',
        dataTestID: 'noEarnedIncomeWarning-p1',
      },
      {
        key: 'noEarnedIncomeWarning-p2',
        type: 'Paragraph',
        text: 'agi.p.noEarnedIncomeWarning2',
        className: 'text mt-1',
        dataTestID: 'noEarnedIncomeWarning-p2',
        replacements: [
          {
            type: 'link',
            key: ':whatIsEarnedIncome',
            href: 'https://www.irs.gov/credits-deductions/individuals/earned-income-tax-credit/earned-income',
            text: 'agi.a.noEarnedIncomeWarning',
            external: true,
            dataTestID: 'noEarnedIncomeWarning-a1',
          }
        ]
      }
    ]}
  />
)

export const onlyPenalIncomeWarning = (langCode) => (
  <HtmlBuilder elements={
    [
      {
        key: 'onlyPenalIncomeWarning-p1',
        type: 'Paragraph',
        text: 'agi.p.onlyPenalIncomeWarning1',
        className: 'text mt-1',
        dataTestID: 'onlyPenalIncomeWarning-p1',
      },
      {
        key: 'onlyPenalIncomeWarning-p2',
        type: 'Paragraph',
        text: 'agi.p.onlyPenalIncomeWarning2',
        className: 'text mt-1',
        dataTestID: 'onlyPenalIncomeWarning-p2',
        replacements: [
          {
            type: 'link',
            key: ':pub596',
            href: langCode === 'en' ? 'https://www.irs.gov/forms-pubs/about-publication-596' : `https://www.irs.gov/${langCode}/forms-pubs/about-publication-596`,
            text: 'agi.a.onlyPenalIncomeWarning',
            external: true,
            dataTestID: 'onlyPenalIncomeWarning-a1',
          }
        ]
      }
    ]}
  />
)

export const agiLimitWarning = (langCode) => (
  <HtmlBuilder elements={
    [
      {
        key: 'agiLimitWarning-p1',
        type: 'Paragraph',
        text: 'agi.p.agiDisqualifier1',
        className: 'text mt-1',
        dataTestID: 'agiLimitWarning-p1',
      },
      {
        key: 'agiLimitWarning-p2',
        type: 'Paragraph',
        text: 'agi.p.agiDisqualifier2',
        className: 'text mt-1',
        dataTestID: 'agiLimitWarning-p2',
        replacements: [
          {
            type: 'bold',
            key: ':note',
            text: 'global.span.note',
            dataTestID: 'agiLimitWarning-b1',
          },
          {
            type: 'link',
            key: ':tablesLink',
            href: langCode === 'en' ? 'http://www.irs.gov/eitctable' : `https://www.irs.gov/${langCode}/credits-deductions/individuals/earned-income-tax-credit/earned-income-and-earned-income-tax-credit-eitc-tables`,
            text: 'agi.a.agiDisqualifier',
            external: true,
            dataTestID: 'agiLimitWarning-a1',
          }
        ]
      }
    ]}
  />
)

export const earnedIncomeLimitWarning = (langCode) => (
  <HtmlBuilder elements={
    [
      {
        key: 'earnedIncomeLimitWarning-p1',
        type: 'Paragraph',
        text: 'agi.p.earnedIncomeDisqualifier1',
        className: 'text mt-1',
        dataTestID: 'earnedIncomeLimitWarning-p1',
      },
      {
        key: 'earnedIncomeLimitWarning-p2',
        type: 'Paragraph',
        text: 'agi.p.earnedIncomeDisqualifier2',
        className: 'text mt-1',
        dataTestID: 'earnedIncomeLimitWarning-p2',
        replacements: [
          {
            type: 'bold',
            key: ':note',
            text: 'global.span.note',
            dataTestID: 'earnedIncomeLimitWarning-b1',
          },
          {
            type: 'link',
            key: ':tablesLink',
            href: langCode === 'en' ? 'http://www.irs.gov/eitctable': `https://www.irs.gov/${langCode}/credits-deductions/individuals/earned-income-tax-credit/earned-income-and-earned-income-tax-credit-eitc-tables`,
            text: 'agi.a.earnedIncomeDisqualifier',
            external: true,
            dataTestID: 'earnedIncomeLimitWarning-a1',
          }
        ]
      }
    ]}
  />
)

export const investmentIncomeOver = (year, langCode) => (
  [
    {
      key: 'investmentIncomeOver-p1',
      type: 'Paragraph',
      text: 'agi.p.investmentIncomeOver1',
      className: 'text mt-1',
      dataTestID: 'investmentIncomeOver-p1',
      replacements: [
        {
          type: 'simpleText',
          key: ':amount',
          text: formatMoney(params[year].investmentsThreshold),
          dataTestID: 'investmentIncomeOver-threshold',
        }
      ]
    },
    {
      key: 'investmentIncomeOver-b1',
      type: 'BoldParagraph',
      text: 'agi.b.investmentIncomeOver',
      className: 'text mt-1',
      dataTestID: 'investmentIncomeOver-b1',
    },
    {
      key: 'investmentIncomeOver-ul1',
      type: 'List',
      list: [
        'agi.li.investmentIncomeOver1',
        'agi.li.investmentIncomeOver2',
        'agi.li.investmentIncomeOver3',
        'agi.li.investmentIncomeOver4',
        'agi.li.investmentIncomeOver5'
      ],
      className: 'my-3 ml-10 list list-disc',
      dataTestID: 'investmentIncomeOver-ul1',
    },
    {
      key: 'investmentIncomeOver-p2',
      type: 'Paragraph',
      text: 'agi.p.investmentIncomeOver2',
      className: 'text mt-1',
      dataTestID: 'investmentIncomeOver-p2',
      replacements: [
        {
          type: 'link',
          key: ':pub550',
          href: 'https://www.irs.gov/forms-pubs/about-publication-550',
          text: 'agi.a.investmentIncomeOver1',
          external: true,
          dataTestID: 'investmentIncomeOver-a1',
        }
      ],
    },
    {
      key: 'investmentIncomeOver-p3',
      type: 'Paragraph',
      text: 'agi.p.investmentIncomeOver3',
      className: 'text mt-1',
      dataTestID: 'investmentIncomeOver-p3',
      replacements: [
        {
          type: 'link',
          key: ':pub596',
          href: langCode === 'en' ? 'https://www.irs.gov/forms-pubs/about-publication-596' : `https://www.irs.gov/${langCode}/forms-pubs/about-publication-596`,
          text: 'agi.a.investmentIncomeOver2',
          external: true,
          dataTestID: 'investmentIncomeOver-a2',
        }
      ],
    }
  ]
)
