import params from '../../../calculations/eitc/EITCParams.json'

export const live51PctToolTip = (year) => {
  let elements = []
  if(year != "2021"){
  elements = [
    {
      key: 'tt-1-1',
      type: 'Heading',
      level: '2',
      className: 'text-xl mb-2 font-bold',
      text: 'children.h2.live51PctTT1',
      dataTestID: 'live51PctTTHeading1',
    },
    {
      'key': 'tt-1-2',
      'type': 'Paragraph',
      'className': 'my-3',
      'text': 'children.p.live51PctTT1',
      dataTestID: 'live51PctTTParagraph1',
      replacements: [
        {
          type: 'simpleText',
          key: ':year',
          text: year,
        }
      ]
    },
    {
      'key': 'tt-1-3',
      'type': 'Heading',
      'level': '2',
      'className': 'text-xl mb-2 font-bold',
      'text': 'children.h2.live51PctTT2',
      dataTestID: 'live51PctTTHeading2',
    },
    {
      'key': 'tt-1-4',
      'type': 'Paragraph',
      'className': 'my-3',
      'text': 'children.p.live51PctTT2',
      dataTestID: 'live51PctTTParagraph2',
      replacements: [
        {
          type: 'simpleText',
          key: ':year',
          text: year,
        }
      ]
    },
    {
      'key': 'tt-1-5',
      'type': 'Heading',
      'level': '2',
      'className': 'text-xl mb-2 font-bold',
      'text': 'children.h2.live51PctTT4',
      dataTestID: 'live51PctTTHeading4',
    },
    {
      'key': 'tt-1-6',
      'type': 'Paragraph',
      'className': 'mb-3',
      'text': 'children.p.live51PctTT5',
      dataTestID: 'live51PctTTParagraph5',
      replacements: [
        {
          type: 'simpleText',
          key: ':year1',
          text: year,
        },
        {
          type: 'simpleText',
          key: ':year2',
          text: year,
        },
        {
          type: 'simpleText',
          key: ':year3',
          text: year,
        },
        {
          type: 'simpleText',
          key: ':year4',
          text: year,
        },
      ]
    },
    {
      'key': 'tt-1-7',
      'type': 'Heading',
      'level': '2',
      'className': 'text-xl mb-2 font-bold',
      'text': 'children.h2.live51PctTT3',
      dataTestID: 'live51PctTTHeading3',
    },
    {
      'key': 'tt-1-8',
      'type': 'Paragraph',
      'className': 'my-3',
      'text': 'children.p.live51PctTT3',
      dataTestID: 'live51PctTTParagraph3',
    },
    {
      'key': 'tt-1-9',
      'type': 'List',
      'className': 'my-3 ml-10 list list-disc',
      dataTestID: 'live51PctTTList',
      'list': [
        'children.li.live51PctTT1',
        'children.li.live51PctTT2',
        'children.li.live51PctTT3',
        'children.li.live51PctTT4'
      ]
    },
    {
      'key': 'tt-1-10',
      'type': 'Paragraph',
      'className': 'my-3',
      'text': 'children.p.live51PctTT4',
      dataTestID: 'live51PctTTParagraph4',
      'replacements': [
        {
          'type': 'link',
          'key': ':irsPub519',
          'href': 'https://www.irs.gov/publications/p596#en_US_2023_publink1000298148',
          'text': 'children.a.live51PctTT',
          'external': true,
          dataTestID: 'live51PctTTLink1',
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
    text: 'children.h2.live51PctTT1',
    dataTestID: 'live51PctTTHeading1',
  },
  {
    'key': 'tt-1-2',
    'type': 'Paragraph',
    'className': 'my-3',
    'text': 'children.p.live51PctTT1',
    dataTestID: 'live51PctTTParagraph1',
    replacements: [
      {
        type: 'simpleText',
        key: ':year',
        text: year,
      }
    ]
  },
  {
    'key': 'tt-1-3',
    'type': 'Heading',
    'level': '2',
    'className': 'text-xl mb-2 font-bold',
    'text': 'children.h2.live51PctTT2',
    dataTestID: 'live51PctTTHeading2',
  },
  {
    'key': 'tt-1-4',
    'type': 'Paragraph',
    'className': 'my-3',
    'text': 'children.p.live51PctTT2',
    dataTestID: 'live51PctTTParagraph2',
    replacements: [
      {
        type: 'simpleText',
        key: ':year',
        text: year,
      }
    ]
  },
  {
    'key': 'tt-1-5',
    'type': 'Heading',
    'level': '2',
    'className': 'text-xl mb-2 font-bold',
    'text': 'children.h2.live51PctTT3',
    dataTestID: 'live51PctTTHeading3',
  },
  {
    'key': 'tt-1-6',
    'type': 'Paragraph',
    'className': 'my-3',
    'text': 'children.p.live51PctTT3',
    dataTestID: 'live51PctTTParagraph3',
  },
  {
    'key': 'tt-1-7',
    'type': 'List',
    'className': 'my-3 ml-10 list list-disc',
    dataTestID: 'live51PctTTList',
    'list': [
      'children.li.live51PctTT1',
      'children.li.live51PctTT2',
      'children.li.live51PctTT3',
      'children.li.live51PctTT4'
    ]
  },
  {
    'key': 'tt-1-8',
    'type': 'Paragraph',
    'className': 'my-3',
    'text': 'children.p.live51PctTT4',
    dataTestID: 'live51PctTTParagraph4',
    'replacements': [
      {
        'type': 'link',
        'key': ':irsPub519',
        'href': 'https://www.irs.gov/publications/p596#en_US_2019_publink1000298148',
        'text': 'children.a.live51PctTT',
        'external': true,
        dataTestID: 'live51PctTTLink1',
      }
    ]
  }
]
}
return elements 
}

export const claimOtherToolTip = () => (
  [
    {
      'key': 'tt-2-1',
      'type': 'Heading',
      'className': 'text-xl mb-2 font-bold',
      'level': '2',
      'text': 'children.h2.claimOtherTT',
      dataTestID: 'claimOtherTTHeading1',
    },
    {
      'key': 'tt-2-2',
      'type': 'Paragraph',
      'className': 'my-3',
      'text': 'children.p.claimOtherTT1',
      dataTestID: 'claimOtherTTParagraph1',
    },
    {
      'key': 'tt-2-3',
      'type': 'Paragraph',
      'className': 'my-3',
      'text': 'children.p.claimOtherTT2',
      dataTestID: 'claimOtherTTParagraph2',
      'replacements': [
        {
          'type': 'link',
          'key': ':irsPub519',
          'href': 'https://www.irs.gov/publications/p596#en_US_2019_publink1000298172',
          'text': 'children.a.claimOtherTT',
          'external': true,
          dataTestID: 'claimOtherTTLink1',
        }
      ]
    }
  ]
)

export const claimOtherConfirmToolTip = () => (
  [
    {
      'key': 'tt-3-1',
      'type': 'Heading',
      'className': 'text-xl mb-2 font-bold',
      'level': '2',
      'text': 'children.h2.claimOtherConfirmTT',
      dataTestID: 'claimOtherConfirmTTHeading1',
    },
    {
      'key': 'tt-3-2',
      'type': 'Paragraph',
      'className': 'my-3',
      'text': 'children.p.claimOtherConfirmTT1',
      dataTestID: 'claimOtherConfirmTTParagraph1',
    },
    {
      'key': 'tt-3-3',
      'type': 'Paragraph',
      'className': 'my-3',
      'text': 'children.p.claimOtherConfirmTT2',
      dataTestID: 'claimOtherConfirmTTParagraph2',
      'replacements': [
        {
          'type': 'link',
          'key': ':irsPub519',
          'href': 'https://www.irs.gov/publications/p596#en_US_2019_publink1000298172',
          'text': 'children.a.claimOtherConfirmTT',
          'external': true,
          dataTestID: 'claimOtherConfirmTTLink1',
        }
      ]
    }
  ]
)

export const fileJointToolTip = () => (
  [
    {
      'key': 'tt-4-1',
      'type': 'Heading',
      'className': 'text-xl mb-2 font-bold',
      'level': '2',
      'text': 'children.h2.fileJointTT',
      dataTestID: 'fileJointTTHeading1',
    },
    {
      'key': 'tt-4-2',
      'type': 'Paragraph',
      'className': 'my-3',
      'text': 'children.p.fileJointTT1',
      dataTestID: 'fileJointTTParagraph1',
    },
    {
      'key': 'tt-4-3',
      'type': 'Paragraph',
      'className': 'my-3',
      'text': 'children.p.fileJointTT2',
      dataTestID: 'fileJointTTParagraph2',
      'replacements': [
        {
          'type': 'link',
          'key': ':irsPub519',
          'href': 'https://www.irs.gov/publications/p596#en_US_2019_publink1000298157',
          'text': 'children.a.fileJointTT',
          'external': true,
          dataTestID: 'fileJointTTLink1',
        }
      ]
    }
  ]
)

export const fileJointConfirmToolTip = () => (
  [
    {
      'key': 'tt-5-1',
      'type': 'Heading',
      'className': 'text-xl mb-2 font-bold',
      'level': '2',
      'text': 'children.h2.fileJointConfirmTT',
      dataTestID: 'fileJointConfirmTTHeading1',
    },
    {
      'key': 'tt-5-2',
      'type': 'Paragraph',
      'className': 'my-3',
      'text': 'children.p.fileJointConfirmTT1',
      dataTestID: 'fileJointConfirmTTParagraph1',
    },
    {
      'key': 'tt-5-3',
      'type': 'Paragraph',
      'className': 'my-3',
      'text': 'children.p.fileJointConfirmTT2',
      dataTestID: 'fileJointConfirmTTParagraph2',
      'replacements': [
        {
          'type': 'link',
          'key': ':irsPub519',
          'href': 'https://www.irs.gov/publications/p596#en_US_2019_publink1000298157',
          'text': 'children.a.fileJointConfirmTT',
          'external': true,
          dataTestID: 'fileJointConfirmTTLink1',
        }
      ]
    }
  ]
)

export const permanentlyDisabledToolTip = () => (
  [
    {
      'key': 'tt-6-1',
      'type': 'Heading',
      'className': 'text-xl mb-2 font-bold',
      'level': '2',
      'text': 'children.h2.permanentlyDisabledTT',
      dataTestID: 'permanentlyDisabledTTHeading1',
    },
    {
      'key': 'tt-6-2',
      'type': 'Paragraph',
      'className': 'my-3',
      'text': 'children.p.permanentlyDisabledTT1',
      dataTestID: 'permanentlyDisabledTTParagraph1',
    },
    {
      'key': 'tt-6-3',
      'type': 'List',
      'className': 'my-3 ml-10 list list-disc',
      dataTestID: 'permanentlyDisabledTTList',
      'list': [
        'children.li.permanentlyDisabledTT1',
        'children.li.permanentlyDisabledTT2'
      ]
    },
    {
      'key': 'tt-6-4',
      'type': 'Paragraph',
      'className': 'my-3',
      'text': 'children.p.permanentlyDisabledTT2',
      dataTestID: 'permanentlyDisabledTTParagraph2',
      'replacements': [
        {
          'type': 'link',
          'key': ':irsPub519',
          'href': 'https://www.irs.gov/publications/p596#en_US_2019_publink1000298147',
          'text': 'children.a.permanentlyDisabledTT',
          'external': true,
          dataTestID: 'permanentlyDisabledTTLink1',
        }
      ]
    }
  ]
)

export const relationshipToolTip = () => (
  [
    {
      'key': 'tt-7-1',
      'type': 'Heading',
      'className': 'text-xl mb-2 font-bold',
      'level': '2',
      'text': 'children.h2.relationshipTT1',
      dataTestID: 'relationshipTT1Heading1',
    },
    {
      'key': 'tt-7-2',
      'type': 'Paragraph',
      'className': 'my-3',
      'text': 'children.p.relationshipTT1',
      dataTestID: 'relationshipTT1Paragraph1',
    },
    {
      'key': 'tt-7-3',
      'type': 'Heading',
      'className': 'text-xl mb-2 font-bold',
      'level': '2',
      'text': 'children.h2.relationshipTT2',
      dataTestID: 'relationshipTT1Heading2',
    },
    {
      'key': 'tt-7-4',
      'type': 'Paragraph',
      'className': 'my-3',
      'text': 'children.p.relationshipTT2',
      dataTestID: 'relationshipTT1Paragraph2',
    },
    {
      'key': 'tt-7-5',
      'type': 'Heading',
      'className': 'text-xl mb-2 font-bold',
      'level': '2',
      'text': 'children.h2.relationshipTT3',
      dataTestID: 'relationshipTT1Heading3',
    },
    {
      'key': 'tt-7-6',
      'type': 'Paragraph',
      'className': 'my-3',
      'text': 'children.p.relationshipTT3',
      dataTestID: 'relationshipTT1Paragraph3',
    },
    {
      'key': 'tt-7-7',
      'type': 'Heading',
      'className': 'text-xl mb-2 font-bold',
      'level': '2',
      'text': 'children.h2.relationshipTT4',
      dataTestID: 'relationshipTT1Heading4',
    },
    {
      'key': 'tt-7-8',
      'type': 'Paragraph',
      'className': 'my-3',
      'text': 'children.p.relationshipTT5',
      dataTestID: 'relationshipTT1Paragraph4',
    }
  ]
)

export const youngerToolTip = (year) => (
  [
    {
      'key': 'tt-8-1',
      'type': 'Heading',
      'className': 'text-xl mb-2 font-bold',
      'level': '2',
      'text': 'children.h2.youngerTT',
      dataTestID: 'youngerTTHeading1',
    },
    {
      'key': 'tt-8-2',
      'type': 'Paragraph',
      'className': 'my-3',
      'text': 'children.p.youngerTT1',
      dataTestID: 'youngerTTParagraph1',
      replacements: [
        {
          type: 'simpleText',
          key: ':year',
          text: year,
        }
      ]
    },
    {
      'key': 'tt-8-4',
      'type': 'Paragraph',
      'className': 'my-3',
      'text': 'children.p.youngerTT2',
      dataTestID: 'youngerTTParagraph2',
      'replacements': [
        {
          'type': 'link',
          'key': ':irsPub519',
          'href': 'https://www.irs.gov/publications/p596#en_US_2019_publink1000298140',
          'text': 'children.a.youngerTT',
          'external': true,
          dataTestID: 'youngerTTLink1',
        }
      ]
    }
  ]
)

export const youngerSpouseToolTip = (year) => (
  [
    {
      'key': 'tt-9-1',
      'type': 'Heading',
      'className': 'text-xl mb-2 font-bold',
      'level': '2',
      'text': 'children.h2.youngerSpouseTT',
      dataTestID: 'youngerSpouseTTHeading1',
    },
    {
      'key': 'tt-9-2',
      'type': 'Paragraph',
      'className': 'my-3',
      'text': 'children.p.youngerSpouseTT1',
      dataTestID: 'youngerSpouseTTParagraph1',
      replacements: [
        {
          type: 'simpleText',
          key: ':year',
          text: year,
        }
      ]
    },
    {
      'key': 'tt-9-4',
      'type': 'Paragraph',
      'className': 'my-3',
      'text': 'children.p.youngerSpouseTT2',
      dataTestID: 'youngerSpouseTTParagraph2',
      'replacements': [
        {
          'type': 'link',
          'key': ':irsPub519',
          'href': 'https://www.irs.gov/publications/p596#en_US_2019_publink1000298140',
          'text': 'children.a.youngerSpouseTT',
          'external': true,
          dataTestID: 'youngerSpouseTTLink1',
        }
      ]
    }
  ]
)

export const studentToolTip = () => (
  [
    {
      'key': 'tt-9-1',
      'type': 'Heading',
      'className': 'text-xl mb-2 font-bold',
      'level': '2',
      'text': 'children.h2.studentTT1',
      dataTestID: 'studentTTHeading1',
    },
    {
      'key': 'tt-9-2',
      'type': 'Paragraph',
      'className': 'my-3',
      'text': 'children.p.studentTT1',
      dataTestID: 'studentTTParagraph1',
    },
    {
      'key': 'tt-9-3',
      'type': 'Paragraph',
      'className': 'my-3',
      'text': 'children.p.studentTT2',
      dataTestID: 'studentTTParagraph2',
    },
    {
      'key': 'tt-9-4',
      'type': 'Heading',
      'className': 'text-xl mb-2 font-bold',
      'level': '2',
      'text': 'children.h2.studentTT2',
      dataTestID: 'studentTTHeading2',
    },
    {
      'key': 'tt-9-5',
      'type': 'Paragraph',
      'className': 'my-3',
      'text': 'children.p.studentTT3',
      dataTestID: 'studentTTParagraph3',
    },
    {
      'key': 'tt-9-6',
      'type': 'List',
      'className': 'my-3 ml-10 list list-disc',
      dataTestID: 'studentTTList',
      'list': [
        'children.li.studentTT1',
        'children.li.studentTT2',
        'children.li.studentTT3',
        'children.li.studentTT4'
      ]
    },
    {
      'key': 'tt-9-7',
      'type': 'Paragraph',
      'className': 'my-3',
      'text': 'children.p.studentTT4',
      dataTestID: 'studentTTParagraph4',
    },
    {
      'key': 'tt-9-8',
      'type': 'List',
      'className': 'my-3 ml-10 list list-disc',
      dataTestID: 'studentTTList2',
      'list': [
        'children.li.studentTT5',
        'children.li.studentTT6',
        'children.li.studentTT7'
      ]
    },
    {
      'key': 'tt-9-9',
      'type': 'Paragraph',
      'className': 'my-3',
      'text': 'children.p.studentTT5',
      dataTestID: 'studentTTParagraph5',
      'replacements': [
        {
          'type': 'link',
          'key': ':irsPub519',
          'href': 'https://www.irs.gov/publications/p596#en_US_2019_publink1000298144',
          'text': 'children.a.studentTT',
          'external': true,
          dataTestID: 'studentTTLink1',
        }
      ]
    }
  ]
)

export const validSSNToolTip = () => (
  [
    {
      key: 'tt-10-1',
      type: 'Heading',
      className: 'text-xl mb-2 font-bold',
      level: '2',
      text: 'qualifyingChildren.h2.numOfDependentsTT',
      dataTestID: 'depHelpTipHeading1',
    },
    {
      key: 'tt-10-2',
      type: 'Paragraph',
      className: 'my-3',
      text: 'qualifyingChildren.p.validSSNTT1',
      dataTestID: 'depHelpTipParagraph1',
    },
    {
      key: 'tt-10-3',
      type: 'Paragraph',
      className: 'my-3',
      text: 'qualifyingChildren.p.validSSNTT2',
      dataTestID: 'depHelpTipParagraph2',
    },
    {
      key: 'tt-10-4',
      type: 'Paragraph',
      className: 'my-3',
      text: 'qualifyingChildren.p.validSSNTT3',
      dataTestID: 'depHelpTipParagraph3',
    },
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
        'qualifyingChildren.li.validSSNTT3'
      ]
    }
  ]
)

export const us50PercentToolTip = (year) => (
  [
    {
      'key': 'tt-10-1',
      'type': 'Heading',
      'className': 'text-xl mb-2 font-bold',
      'level': '2',
      'text': 'children.h2.us50PercentTT1',
      dataTestID: 'us50PercentTTHeading1',
    },
    {
      'key': 'tt-10-2',
      'type': 'Paragraph',
      'className': 'my-3',
      'text': 'children.p.us50PercentTT1',
      dataTestID: 'us50PercentTTParagraph1',
      'replacements': [
        {
          'type': 'simpleText',
          'key': ':year',
          'text': year,
        }
      ]
    },
    {
      'key': 'tt-10-3',
      'type': 'Heading',
      'className': 'text-xl mb-2 font-bold',
      'level': '2',
      'text': 'children.h2.us50PercentTT2',
      dataTestID: 'us50PercentTTHeading2',
    },
    {
      'key': 'tt-10-4',
      'type': 'Paragraph',
      'className': 'my-3',
      'text': 'children.p.us50PercentTT2',
      dataTestID: 'us50PercentTTParagraph2',
      'replacements': [
        {
          'type': 'simpleText',
          'key': ':yes',
          'text': 'global.label.yes',
        }
      ]
    }
  ]
)
