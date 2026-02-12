const addAndSortArr = (arr, val) => {
  const newArr = [...arr]
  let i = 0,
    item = {}
  newArr.push(val);
  i = newArr.length - 1;
  item = newArr[i];
  while (i > 0 && item.value < newArr[i - 1].value) {
    newArr[i] = newArr[i - 1];
    i -= 1;
  }
  newArr[i] = item;
  return newArr;
}

const getSliderProps = (overUnderAmt, taxableIncome, shutDownSalary, shutDownWithholding) => {
  let maxValueForTheSlider = Math.min(Math.round((taxableIncome * 0.05) / 1000) * 1000, 5000)

  if (maxValueForTheSlider >= 0 && maxValueForTheSlider < 1000) {
    maxValueForTheSlider = 1000
  }

  if (overUnderAmt > 0 && shutDownSalary < maxValueForTheSlider) {
    maxValueForTheSlider = Math.round(shutDownSalary)
  }

  let incrementsForTheSlider = Math.round(maxValueForTheSlider / 20),
    minValueForTheSlider = 0,
    marks = [],
    defaultValue = 0,
    incrementIndex = 0,
    inc = 0,
    labelMargin = -20

  // taxPayer gets a refund.
  if (overUnderAmt < 0) {
    if (Math.abs(overUnderAmt) >= maxValueForTheSlider) {
      maxValueForTheSlider = Math.abs(overUnderAmt)
    }
    defaultValue = Math.abs(overUnderAmt)
    incrementsForTheSlider = null
    inc = Math.round((maxValueForTheSlider / 20) / 50) * 50
    for (incrementIndex = 0; incrementIndex < 21; incrementIndex++) {
      marks.push({ value: inc * incrementIndex, label: '' })
    }
    marks = addAndSortArr(marks, { value: defaultValue, label: '|' })
    if (shutDownWithholding > 0) {
      marks = addAndSortArr(marks, { value: shutDownWithholding, label: '' })
    }
    labelMargin = -40
  }

  return { maxValueForTheSlider, minValueForTheSlider, incrementsForTheSlider, marks, defaultValue, incrementIndex, inc, labelMargin }
}

export default getSliderProps
