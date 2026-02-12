import { formatNumber } from '../../helpers'

const isEligible = (site) => {
  const { filingStatus, agi } = site.forms.filingInfo.values
  const { numOfQualifyingChildrenUnder18, numOfQualifyingChildrenUnder6 } = site.forms.qualifyingChildren.values

  /* example  numUnder6 = 5  numUnder18 = 13 */

  const under6 = parseInt(numOfQualifyingChildrenUnder6) > 4 ? 4 : parseInt(numOfQualifyingChildrenUnder6)
  const remainder = parseInt(numOfQualifyingChildrenUnder6) - 4 < 0 ? 0 : parseInt(numOfQualifyingChildrenUnder6) - 4
  const under18 = parseInt(numOfQualifyingChildrenUnder18) + remainder > (15 - under6)
    ? 15 - under6
    : parseInt(numOfQualifyingChildrenUnder18) + remainder

  /*
  under6  MAX of 4  ;  remainder can go up to max 11   15 kids MAX total

  under6 = numOfQualifyingChildrenUnder6 > 4 ? 4 : numOfQualifyingChildrenUnder6

  remainder = numOfQualifyingChildrenUnder6 - 4 < 0 ? 0 : numOfQualifyingChildrenUnder6 - 4

  under18 = numOfQualifyingChildrenUnder18 + remainder > 11 ? 11 : numOfQualifyingChildrenUnder18 + remainder


  */

  // ********** STEP 2 **********
  // 2i
  const qcUnder6Total = under6 * 3600

  // 2ii
  const qcUnder18Total = under18 * 3000

  // ********** STEP 3 **********
  // 3i
  const qcTotal = qcUnder18Total + qcUnder6Total

  // 3ii
  const qcAdjustment = (under18 + under6) * 2000
  const agiNum = parseInt(formatNumber(agi))
  // 3iv
  let agiAdjustment = agiNum

  // 3vii
  let fsLimitation = null

  switch (filingStatus) {
    case 'married':
    case 'widow':
      agiAdjustment -= 150000
      fsLimitation = 2500
      break
    case 'head-of-household':
      agiAdjustment -= 112500
      fsLimitation = 4375
      break
    default:
      agiAdjustment -= 75000
      fsLimitation = 6250
  }

  if (agiAdjustment <= 0) {
    agiAdjustment = 0
  }

  if (agiAdjustment % 1000 !== 0) {
    agiAdjustment = Math.ceil(agiAdjustment / 1000) * 1000
  }

  // 3v
  agiAdjustment *= 0.05

  // 3vi
  const qcFinalAdjustment = qcTotal - qcAdjustment

  // 3viii
  const smallest = Math.min(agiAdjustment, fsLimitation, qcFinalAdjustment)

  // 3ix
  const qcSubSmallest = qcTotal - smallest

  // 3x
  let agiSub = filingStatus === 'married' ? agiNum - 400000 : agiNum - 200000

  if (agiSub <= 0) {
    agiSub = 0
  }

  if (agiSub % 1000 !== 0) {
    agiSub = Math.ceil(agiSub / 1000) * 1000
  }

  // 3xi
  agiSub *= 0.05

  // 3xii
  const credit = qcSubSmallest - agiSub

  return (credit > 0) && (under18 > 0 || under6 > 0)
}

export default isEligible
