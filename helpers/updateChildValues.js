const updateChildValues = (site, siteDispatch, value, values, isCompleted, errors) => {
  const numOfChildren = parseInt(value)
  let childrensArr = []
  let accordionArr = []
  const newValues = {
    ...values,
    numOfDependents: value
  }

  let helpTips = {}

  if (numOfChildren === 0) {
    childrensArr = [
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
        younger: '',
        validSSN: '',
      }
    ]

    accordionArr = [true]
  } else {
    for (let i = numOfChildren; i > 0; i--) {
      childrensArr.push(
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
          younger: '',
          validSSN: '',
        }
      )

      accordionArr.push(i === numOfChildren)


      // dynamically create helptips object (2023 update)
      helpTips[`children.${[i - 1]}.live51Pct`] = {
        "key": `children.${[i - 1]}.live51Pct-tt`,
        "id": `children.${[i - 1]}.live51Pct`,
        "open": false
      }
      helpTips[`children.${[i - 1]}.claimOther`] = {
        "key": `children.${[i - 1]}.claimOther-tt`,
        "id": `children.${[i - 1]}.claimOther`,
        "open": false
      }
      helpTips[`children.${[i - 1]}.claimOtherConfirm`] = {
        "key": `children.${[i - 1]}.claimOtherConfirm-tt`,
        "id": `children.${[i - 1]}.claimOtherConfirm`,
        "open": false
      }
      helpTips[`children.${[i - 1]}.fileJoint`] = {
        "key": `children.${[i - 1]}.fileJoint-tt`,
        "id": `children.${[i - 1]}.fileJoint`,
        "open": false
      }
      helpTips[`children.${[i - 1]}.fileJointConfirm`] = {
        "key": `children.${[i - 1]}.fileJointConfirm-tt`,
        "id": `children.${[i - 1]}.fileJointConfirm`,
        "open": false
      }
      helpTips[`children.${[i - 1]}.permanentlyDisabled`] = {
        "key": `children.${[i - 1]}.permanentlyDisabled-tt`,
        "id": `children.${[i - 1]}.permanentlyDisabled`,
        "open": false
      }
      helpTips[`children.${[i - 1]}.relationship`] = {
        "key": `children.${[i - 1]}.relationship-tt`,
        "id": `children.${[i - 1]}.relationship`,
        "open": false
      }
      helpTips[`children.${[i - 1]}.younger`] = {
        "key": `children.${[i - 1]}.younger-tt`,
        "id": `children.${[i - 1]}.younger`,
        "open": false
      }
      helpTips[`children.${[i - 1]}.student`] = {
        "key": `children.${[i - 1]}.student-tt`,
        "id": `children.${[i - 1]}.student`,
        "open": false
      }
      helpTips[`children.${[i - 1]}.validSSN`] = {
        "key": `children.${[i - 1]}.validSSN-tt`,
        "id": `children.${[i - 1]}.validSSN`,
        "open": false
      }
    }
    helpTips.us50Percent = {
      "id": "us50Percent",
      "key": "us50Percent-tt",
      "open": false
  }
  }

  const newForms = {
    ...site.forms,
    filingStatus: {
      ...site.forms.filingStatus,
      completed: isCompleted(newValues, errors),
      values: {
        ...site.forms.filingStatus.values,
        ...values,
        numOfDependents: value
      }
    },
    qualifyingChildren: {
      ...site.forms.qualifyingChildren,
      completed: false,
      accordionOpenArr: accordionArr,
      values: {
        ...site.forms.qualifyingChildren.values,
        children: [
          ...childrensArr
        ],
        numOfDependents: '',
        us50Percent: ''
      },
      helpTips
    }
  }

  siteDispatch({
    type: 'UPDATE_FORMS',
    payload: newForms,
  })
}

export default updateChildValues
