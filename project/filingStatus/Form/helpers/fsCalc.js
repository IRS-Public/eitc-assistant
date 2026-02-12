import {
  isSingle,
  isHoH,
  isWidow,
  isMarried,
  isMFS
} from './fsScenarios'

const fsCalc = (values) => {
  if (isSingle(values)) {
    return 'single'
  }

  if (isHoH(values)) {
    return 'head-of-household'
  }

  if (isWidow(values)) {
    return 'widow'
  }

  if (isMarried(values)) {
    return 'married'
  }

  if (isMFS(values)) {
    return 'married-separate'
  }

  return ''
}

export default fsCalc
