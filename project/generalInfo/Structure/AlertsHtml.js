import React from 'react'
import HtmlBuilder from '../../../components/HtmlBuilder'

export const citizenWarning = (year) => (
  <HtmlBuilder elements={
    [
      {
        key: 'citizenWarning-p1',
        type: 'Paragraph',
        text: 'generalInfo.p.citizenWarning1',
        className: 'text mt-1',
        dataTestID: 'citizenWarning-p1',
        replacements: [
          {
            type: 'link',
            key: ':irsPub519',
            href: 'https://www.irs.gov/forms-pubs/about-publication-519',
            text: 'generalInfo.a.citizenWarning',
            external: true,
            dataTestID: 'citizenWarning-a1',
          }
        ]
      },
      {
        key: 'citizenWarning-p2',
        type: 'Paragraph',
        text: 'generalInfo.p.citizenWarning2',
        className: 'text mt-1',
        dataTestID: 'citizenWarning-p2',
        replacements: [
          {
            type: 'bold',
            key: ':note',
            text: 'global.span.note',
            dataTestID: 'citizenWarning-b1',
          },
          {
            type: 'bold',
            key: ':yes',
            text: 'global.label.yes',
            dataTestID: 'citizenWarning-b2',
          },
          {
            type: 'simpleText',
            key: ':year',
            text: year,
            dataTestID: 'citizenWarning-year',
          }
        ]
      }
    ]}
  />
)

export const validSSNWarning = (langCode) => (
  <HtmlBuilder elements={
    [
      {
        key: 'validSSNWarning-p1',
        type: 'Paragraph',
        text: 'generalInfo.p.validSSNWarning',
        className: 'text mt-1',
        dataTestID: 'validSSNWarning-p1',
      },
      {
        key: 'validSSNWarning-p2',
        type: 'Paragraph',
        text: 'generalInfo.p.validSSNWarning2',
        className: 'text mt-1',
        dataTestID: 'validSSNWarning-p2',
        replacements: [
          {
            type: 'link',
            key: ':irsPub596',
            href: langCode === 'en' ? 'https://www.irs.gov/publications/p596' : `https://www.irs.gov/${langCode}/forms-pubs/about-publication-596`,
            text: 'generalInfo.a.validSSNWarning1',
            external: true,
            dataTestID: 'validSSNWarning-a1',
          }
        ]
      },
    ]}
  />
)

export const foreignIncomeWarning = () => (
  <HtmlBuilder elements={
    [
      {
        key: 'foreignIncomeWarning-p1',
        type: 'Paragraph',
        text: 'generalInfo.p.foreignIncomeWarning1',
        className: 'text mt-1',
        dataTestID: 'foreignIncomeWarning-p1',
        replacements: [
          {
            type: 'link',
            key: ':form2555',
            href: 'https://www.irs.gov/forms-pubs/about-form-2555',
            text: 'generalInfo.a.foreignIncomeWarning1',
            external: true,
            dataTestID: 'foreignIncomeWarning-a1',
          }
        ]
      },
      {
        key: 'foreignIncomeWarning-p2',
        type: 'Paragraph',
        text: 'generalInfo.p.foreignIncomeWarning2',
        className: 'text mt-1',
        dataTestID: 'foreignIncomeWarning-p2',
        replacements: [
          {
            type: 'link',
            key: ':pub54',
            href: 'https://www.irs.gov/forms-pubs/about-publication-54',
            text: 'generalInfo.a.foreignIncomeWarning2',
            external: true,
            dataTestID: 'foreignIncomeWarning-a2',
          }
        ]
      }
    ]}
  />
)

export const claimedAsDependentWarning = () => (
  <HtmlBuilder elements={
    [
      {
        key: 'claimedAsDependentWarning-p1',
        type: 'Paragraph',
        text: 'generalInfo.p.claimedAsDependentWarning1',
        className: 'text mt-1',
        dataTestID: 'claimedAsDependentWarning-p1',
      },
      {
        key: 'claimedAsDependentWarning-p2',
        type: 'Paragraph',
        text: 'generalInfo.p.claimedAsDependentWarning2',
        className: 'text mt-1',
        dataTestID: 'claimedAsDependentWarning-p2',
        replacements: [
          {
            type: 'link',
            key: ':link',
            href: 'https://www.irs.gov/publications/p596',
            text: 'generalInfo.a.claimedAsDependentWarning',
            external: true,
            dataTestID: 'claimedAsDependentWarning-a1',
          }
        ]
      },
      {
        key: 'claimedAsDependentWarning-p3',
        type: 'Paragraph',
        text: 'generalInfo.p.claimedAsDependentWarning3',
        className: 'text mt-1',
        dataTestID: 'claimedAsDependentWarning-p3',
      },
    ]}
  />
)

export const ageWarning = () => (
  <HtmlBuilder elements={
    [
      {
        key: 'age-p1',
        type: 'Paragraph',
        text: 'generalInfo.p.age1',
        className: 'text mt-1',
        dataTestID: 'ageWarning-p1',
      },
    ]}
  />
)

export const studentWarning = () => (
  <HtmlBuilder elements={
    [
      {
        key: 'student-p1',
        type: 'Paragraph',
        text: 'generalInfo.p.student1',
        className: 'text mt-1',
        dataTestID: 'studentWarning-p1',
      },
    ]}
  />
)
