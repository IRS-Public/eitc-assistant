const accordionOpenErrors = (values, errors, setAccordionOpenArr, accordionOpenArr, showAccordion) => {
  const newAccordionOpenArr = [...accordionOpenArr]

  if (errors.children) {
    accordionOpenArr.forEach((_item, index) => {
      if (showAccordion(index, values)) {
        if (errors.children[index]) {
          newAccordionOpenArr[index] = true
        } else {
          newAccordionOpenArr[index] = false
        }
      }
    })
  }

  setAccordionOpenArr(newAccordionOpenArr)
}

export default accordionOpenErrors
