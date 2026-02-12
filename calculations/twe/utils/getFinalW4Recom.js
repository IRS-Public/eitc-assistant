import getStandardWH from './results/getStandardWH'

const getCombinations = (arr, n) => {
  let i,
    j,
    k,
    elem,
    l = arr.length,
    childperm,
    ret = [];
  if (n == 1) {
    for (i = 0; i < arr.length; i++) {
      for (j = 0; j < arr[i].length; j++) {
        ret.push([arr[i][j]]);
      }
    }
    return ret;
  }

  for (i = 0; i < l; i++) {
    elem = arr.shift();
    for (j = 0; j < elem.length; j++) {
      childperm = getCombinations(arr.slice(), n - 1);
      for (k = 0; k < childperm.length; k++) {
        ret.push([elem[j]].concat(childperm[k]));
      }
    }
  }
  return ret;
}

const estFutureW4Line3Check = (estFutureTaxPay, taxLiability, totalWageIncomeEstPay, finalTotalIncome, wagesTaxLiability, currIncome, taxToDate) => {
  const minRatio = totalWageIncomeEstPay / finalTotalIncome,
    minWageWH = minRatio * wagesTaxLiability,
    estPayAndWhToDate = taxToDate + currIncome.adjustedTaxWHPP,
    minWHRemainderYr = minWageWH - estPayAndWhToDate < 0 ? 0 : minWageWH - estPayAndWhToDate,
    futureWHAmt = taxLiability - estFutureTaxPay < 0 ? 0 : taxLiability - estFutureTaxPay,
    futureWHFlag = minWHRemainderYr <= futureWHAmt,
    increaseWHAmt = minWHRemainderYr - futureWHAmt < 0 ? 0 : minWHRemainderYr - futureWHAmt

  const updatedLine3Amt = futureWHFlag ? currIncome.finalAnnualAmtFH : currIncome.finalAnnualAmtFH - ((increaseWHAmt / currIncome.percentOfFullYrLeft) * currIncome.zeroAlwPtc)
  return updatedLine3Amt < 0 ? 0 : updatedLine3Amt
}

const estFutureW4Line4Check = (estFutureTaxPay, taxLiability, totalWageIncomeEstPay, finalTotalIncome, wagesTaxLiability, currIncome, taxToDate) => {
  const minRatio = totalWageIncomeEstPay / finalTotalIncome,
    minWageWH = minRatio * wagesTaxLiability,
    estPayAndWhToDate = taxToDate + currIncome.adjustedTaxWHPP,
    minWHRemainderYr = minWageWH - estPayAndWhToDate < 0 ? 0 : minWageWH - estPayAndWhToDate,
    futureWHAmt = taxLiability - estFutureTaxPay < 0 ? 0 : taxLiability - estFutureTaxPay,
    futureWHFlag = minWHRemainderYr <= futureWHAmt,
    increaseWHAmt = minWHRemainderYr - futureWHAmt < 0 ? 0 : minWHRemainderYr - futureWHAmt

  const updatedLine4Amt = futureWHFlag ? currIncome.addtlWHDue : currIncome.addtlWHDue
    + (((increaseWHAmt * currIncome.zeroAlwPtc) - (currIncome.finalAnnualAmtFH * currIncome.percentOfFullYrLeft))
      / currIncome.adjustedRemainingPayPeriods)

  return updatedLine4Amt < 0 ? 0 : updatedLine4Amt
}
const getFinalW4Recom = (incomes, projectWithholding, taxLiability, _taxToDate, sliderValue, otherIncome, agi, wagesTaxLiability) => {
  const refundValue = sliderValue, // desrtructed from site.forms.SLIDER
    { currentIncomes, pastIncomes, ssiIncomes } = incomes
  // console.log('taxliab', projectWithholding)
  let
    // obligatedTax = tax + refundValue,
    shutDownWithholding = 0,
    obligatedTax = taxLiability + refundValue,
    shutDownSalary = 0,
    refund = 0,
    baselineTotalWHFH = 0,
    taxToDate = _taxToDate,
    // taxToDate = totalWHTaxesYTD,
    projectedTax = projectWithholding.total,
    bonusTaxes = projectWithholding.bonusTaxWH,
    // allIncomes = taxPayer.incomes.totalIncomes,
    // { pensionExists } = taxPayer.calculations,
    // { jobExists } = taxPayer.calculations,
    whCount = 101,
    target = 0,
    tempAllow = 0,
    zeroAllow = 0,
    tempAllowFH = 0,
    overFH = 0,
    percentIncomesArr = [],
    newTaxPct = 0,
    finalAddtlWH = 0,
    _finalAddtlWH = 0,
    withholdX = 0,
    withholdY = 0,
    withholdFH = 0,
    totalProjectedZeroAllowances = 0,
    leftOver = 0,
    leftOverFH = 0,
    argAllow = [],
    priorJobTaxes = taxToDate,
    tempZero = 0,
    zeroAllowCheck = false,
    zeroAllowCheckFH = false,
    ssProjTaxes = projectWithholding.projectedSSTaxes,
    annualAmt4c = 0,
    annualAmt4cFH = 0,
    obligatedTaxPlusRefund = obligatedTax,
    highestSalary = [],
    totalTaxesPaid = 0,
    pastIncomeTaxes = 0,
    estFutureTaxPay = 0

  Object.keys(otherIncome).forEach((item) => {
    if (item === 'otherTaxes') {
      totalTaxesPaid += ['', undefined].includes(otherIncome[item].info[0].amount) ? 0 : parseInt(otherIncome[item].info[0].amount)
    } else {
      totalTaxesPaid += ['', undefined].includes(otherIncome[item].info[0].taxes) ? 0 : parseInt(otherIncome[item].info[0].taxes)
    }
    if (item === 'plannedEstimatedTaxPayments') {
      estFutureTaxPay += ['', undefined].includes(otherIncome[item].info[0].amount) ? 0 : parseInt(otherIncome[item].info[0].amount)
      totalTaxesPaid += ['', undefined].includes(otherIncome[item].info[0].amount) ? 0 : parseInt(otherIncome[item].info[0].amount)
      priorJobTaxes += ['', undefined].includes(otherIncome[item].info[0].amount) ? 0 : parseInt(otherIncome[item].info[0].amount)
      taxToDate += ['', undefined].includes(otherIncome[item].info[0].amount) ? 0 : parseInt(otherIncome[item].info[0].amount)
    }
  })
  pastIncomes.forEach((pastIncome) => {
    pastIncomeTaxes += pastIncome.taxWithheldYTD
  })

  ssiIncomes.forEach((ssiIncome) => {
    pastIncomeTaxes += ssiIncome.taxWithheldYTD
  })

  if (currentIncomes.length > 0) {
    refund = obligatedTax - taxToDate
    // As per Alan's code updates, the percentage of each income should be calculated based off of projection of each income's tax at zero allowances
    // then divided by all the zero allowances projected for the reamining year.
    for (let i = 0; i < currentIncomes.length; i++) {
      tempZero = currentIncomes[i].baseWHAmounts[0]
      if (tempZero === 0) {
        tempZero = 0.0000001
      }
      totalProjectedZeroAllowances += ((tempZero / currentIncomes[i].totalPPEmployer) * currentIncomes[i].adjustedRemainingPayPeriods)
    }
    for (let i = 0; i < currentIncomes.length; i++) {
      tempZero = currentIncomes[i].baseWHAmounts[0]
      if (tempZero === 0) {
        tempZero = 0.0000001
      }
      percentIncomesArr.push((tempZero / currentIncomes[i].totalPPEmployer * currentIncomes[i].adjustedRemainingPayPeriods) / totalProjectedZeroAllowances)
      argAllow.push([...currentIncomes[i].remainingWHAmounts.filter((value) => value > 0), 0])
    }

    switch (true) {
      case (projectedTax > obligatedTax):

        if (taxToDate < obligatedTax) {
          if (currentIncomes.length < 5) {
            let result = getCombinations(argAllow, argAllow.length),
              sum = 0,
              newTarget = 0,
              newTargetFH = 0,
              previous = -999999999,
              previousFH = -999999999,
              finalK = 0,
              finalKFH = 0,
              refundFH = refund // 500 - MP

            for (let i = 0; i < currentIncomes.length; i++) {
              refund -= currentIncomes[i].adjustedTaxWHPP
              refundFH -= currentIncomes[i].adjustedTaxWHPP
            }
            // final additional taxes withheld from SS taxes, since they are calculated monthly
            refund -= (ssProjTaxes + bonusTaxes)
            refundFH -= (ssProjTaxes + bonusTaxes)

            for (let k = 0; k < result.length; k++) {
              sum = result[k].reduce((x, y) => x + y)
              newTarget = refund - sum
              newTargetFH = refundFH - sum

              if (newTarget <= 0 && newTarget > previous) {
                previous = newTarget
                finalK = k
              }
              if (newTargetFH <= 0 && newTargetFH > previousFH) {
                previousFH = newTargetFH
                finalKFH = k
              }
            }
            for (let k = 0; k < currentIncomes.length; k++) {
              for (let j = 0; j < currentIncomes[k].remainingWHAmounts.length; j++) {
                if (result.length !== 0) {
                  if (currentIncomes[k].remainingWHAmounts[j] === result[finalK][k]) {
                    currentIncomes[k].suggestedAllowances = j
                    if (j > 0) {
                      zeroAllowCheck = true
                    }
                  }
                  if (currentIncomes[k].remainingWHAmounts[j] === result[finalKFH][k]) {
                    currentIncomes[k].suggestAllowFH = j
                    if (j > 0) {
                      zeroAllowCheckFH = true
                    }
                  }
                }
              }
            }
            for (let k = 0; k < currentIncomes.length; k++) {
              newTaxPct = percentIncomesArr[k]

              if (zeroAllowCheck === false) {
                if (currentIncomes[k].suggestedAllowances === 0) {
                  if (((refund * newTaxPct) - currentIncomes[k].remainingWHAmounts[0]) > 0) {
                    currentIncomes[k].addtlWHDue = ((refund * newTaxPct) - currentIncomes[k].remainingWHAmounts[0]) / currentIncomes[k].adjustedRemainingPayPeriods
                  }
                }
              }
              if (zeroAllowCheckFH === false) {
                if (currentIncomes[k].suggestAllowFH === 0) {
                  if (((refundFH * newTaxPct) - currentIncomes[k].remainingWHAmounts[0]) > 0) {
                    currentIncomes[k].addtlWHDueFH = ((refundFH * newTaxPct) - currentIncomes[k].remainingWHAmounts[0]) / currentIncomes[k].adjustedRemainingPayPeriods
                  }
                }
              }
            }
          } else {
            for (let i = 0; i < currentIncomes.length; i++) {
              newTaxPct = percentIncomesArr[i]
              target = (currentIncomes[i].totalPP * (newTaxPct * refund - currentIncomes[i].adjustedTaxWHPP - leftOver)) / currentIncomes[i].adjustedRemainingPayPeriods
              if (target < 0) {
                target = 0
                for (let j = 0; j < whCount - 1; j++) {
                  tempAllow = currentIncomes[i].baseWHAmounts[j]
                  if (tempAllow === 0) {
                    currentIncomes[i].suggestedAllowances = j
                    currentIncomes[i].suggestAllowFH = j
                    break;
                  }
                }
              }
              overFH = (currentIncomes[i].totalPP * (newTaxPct * refund - currentIncomes[i].adjustedTaxWHPP - leftOverFH)) / currentIncomes[i].adjustedRemainingPayPeriods // MP - 500

              for (let j = whCount - 1; j > -1; j--) {
                // looks for all best possible allowances to give at least $0 in their return
                tempAllow = currentIncomes[i].baseWHAmounts[j] - target
                // looks for the best possible allowances to give at least $500 in their return
                tempAllowFH = currentIncomes[i].baseWHAmounts[j] - overFH

                if (tempAllow > 0 && currentIncomes[i].suggestedAllowances === 0) {
                  currentIncomes[i].suggestedAllowances = j
                  leftOver = tempAllow
                }
                if (tempAllowFH > 0 && currentIncomes[i].suggestAllowFH === 0) {
                  currentIncomes[i].suggestAllowFH = j
                  leftOverFH = tempAllowFH
                }
              }
              // small tweak to accommodate when 0 allowances is still not enough
              if (tempAllow < 0 && currentIncomes[i].suggestedAllowances === 0) {
                currentIncomes[i].addtlWHDue = (target - currentIncomes[i].baseWHAmounts[0]) / currentIncomes[i].totalPP
                currentIncomes[i].addtlWHDueFH = (overFH - currentIncomes[i].baseWHAmounts[0]) / currentIncomes[i].totalPP
              }
            }
          }
        }
        // this means if the ActualWH to date has met the obligated tax
        // We shouldn't have to recommend anything
        else {
          for (let i = 0; i < currentIncomes.length; i++) {
            for (let j = 0; j < whCount - 1; j++) {
              tempAllow = currentIncomes[i].baseWHAmounts[j]
              if (tempAllow === 0) {
                currentIncomes[i].suggestedAllowances = j
                currentIncomes[i].suggestAllowFH = j
                break;
              }
            }
          }
        }
        break;
      case (projectedTax < obligatedTax):

        for (let i = 0; i < currentIncomes.length; i++) {
          // gets someone close at least $0 to not owe taxes
          zeroAllow = (currentIncomes[i].baseWHAmounts[0] / currentIncomes[i].totalPPEmployer) * currentIncomes[i].adjustedRemainingPayPeriods
          // collects all the total withholding to date and zeroAllowance withholding
          _finalAddtlWH += (zeroAllow + currentIncomes[i].adjustedTotalTaxWH)
          priorJobTaxes -= currentIncomes[i].taxWithheldYTD
        }
        // gets the zeroAllowances for all jobs adds the total withholding to date and the projected las paycheck taxes
        // then subtracts from the obligated tax to get remaining taxes owed, and added ssProjTaxes
        finalAddtlWH = (obligatedTax - _finalAddtlWH - priorJobTaxes - ssProjTaxes - bonusTaxes)
        // console.log('finalAddtlWH', finalAddtlWH, obligatedTax, _finalAddtlWH, priorJobTaxes, ssProjTaxes, bonusTaxes)

        if (finalAddtlWH < 0) {
          withholdX = obligatedTax - taxToDate
          withholdFH = withholdX // MP - 500
          // obligatedTax - actualWH = x
          // x * TPP / RPP  = y
          // y is the lookuup
          if (currentIncomes.length < 5) {
            let result = getCombinations(argAllow, argAllow.length),
              sum = 0,
              newTarget = 0,
              newTargetFH = 0,
              previous = -999999999,
              previousFH = -999999999,
              finalK = 0,
              finalKFH = 0,
              refundFH = refund // MP - 500

            for (let i = 0; i < currentIncomes.length; i++) {
              refund -= currentIncomes[i].adjustedTaxWHPP
              refundFH -= currentIncomes[i].adjustedTaxWHPP
            }
            // final additional taxes withheld from SS taxes, since they are calculated monthly
            refund -= (ssProjTaxes + bonusTaxes)
            refundFH -= (ssProjTaxes + bonusTaxes)

            for (let k = 0; k < result.length; k++) {
              sum = result[k].reduce((x, y) => x + y)
              newTarget = refund - sum
              newTargetFH = refundFH - sum

              if (newTarget <= 0 && newTarget > previous) {
                previous = newTarget
                finalK = k
              }
              if (newTargetFH <= 0 && newTargetFH > previousFH) {
                previousFH = newTargetFH
                finalKFH = k
              }
            }
            for (let k = 0; k < currentIncomes.length; k++) {
              for (let j = 0; j < currentIncomes[k].remainingWHAmounts.length; j++) {
                if (result.length !== 0) {
                  if (currentIncomes[k].remainingWHAmounts[j] === result[finalK][k]) {
                    currentIncomes[k].suggestedAllowances = j
                    if (j > 0) {
                      zeroAllowCheck = true
                    }
                  }
                  if (currentIncomes[k].remainingWHAmounts[j] === result[finalKFH][k]) {
                    currentIncomes[k].suggestAllowFH = j
                    if (j > 0) {
                      zeroAllowCheckFH = true
                    }
                  }
                }
              }
            }
            for (let k = 0; k < currentIncomes.length; k++) {
              newTaxPct = percentIncomesArr[k]

              if (zeroAllowCheck === false) {
                if (currentIncomes[k].suggestedAllowances === 0) {
                  if (((refund * newTaxPct) - currentIncomes[k].remainingWHAmounts[0]) > 0) {
                    currentIncomes[k].addtlWHDue = ((refund * newTaxPct) - currentIncomes[k].remainingWHAmounts[0]) / currentIncomes[k].adjustedRemainingPayPeriods
                  }
                }
              }
              if (zeroAllowCheckFH === false) {
                if (currentIncomes[k].suggestAllowFH === 0) {
                  if (((refundFH * newTaxPct) - currentIncomes[k].remainingWHAmounts[0]) > 0) {
                    currentIncomes[k].addtlWHDueFH = ((refundFH * newTaxPct) - currentIncomes[k].remainingWHAmounts[0]) / currentIncomes[k].adjustedRemainingPayPeriods
                  }
                }
              }
            }
          } else {
            for (let i = 0; i < currentIncomes.length; i++) {
              newTaxPct = percentIncomesArr[i]

              target = (currentIncomes[i].totalPP * (newTaxPct * withholdX - currentIncomes[i].adjustedTaxWHPP - leftOver)) / currentIncomes[i].adjustedRemainingPayPeriods
              overFH = (currentIncomes[i].totalPP * (newTaxPct * withholdFH - currentIncomes[i].adjustedTaxWHPP - leftOverFH)) / currentIncomes[i].adjustedRemainingPayPeriods

              for (let j = whCount - 1; j > -1; j--) {
                // looks for all best possible allowances to give at least $0 in their return
                tempAllow = currentIncomes[i].baseWHAmounts[j] - target
                // looks for the best possible allowances to give at least $500 in their return
                tempAllowFH = currentIncomes[i].baseWHAmounts[j] - overFH

                if (tempAllow > 0 && currentIncomes[i].suggestedAllowances === 0) {
                  currentIncomes[i].suggestedAllowances = j
                  leftOver = tempAllow
                }
                if (tempAllowFH > 0 && currentIncomes[i].suggestAllowFH === 0) {
                  currentIncomes[i].suggestAllowFH = j
                  leftOverFH = tempAllowFH
                }
              }
              if (tempAllow < 0) {
                withholdY = (target - currentIncomes[i].baseWHAmounts[0]) / currentIncomes[i].totalPP
                currentIncomes[i].addtlWHDue = withholdY
              }
              if (tempAllowFH < 0) {
                withholdY = (overFH - currentIncomes[i].baseWHAmounts[0]) / currentIncomes[i].totalPP
                currentIncomes[i].addtlWHDueFH = withholdY
              }
            }
          }
        } else {
          // multiple jobs additoinal withholding calculation
          for (let i = 0; i < currentIncomes.length; i++) {
            newTaxPct = percentIncomesArr[i]

            currentIncomes[i].addtlWHDue = (finalAddtlWH * newTaxPct) / currentIncomes[i].adjustedRemainingPayPeriods
            currentIncomes[i].addtlWHDueFH = (finalAddtlWH * newTaxPct) / currentIncomes[i].adjustedRemainingPayPeriods // MP - 500
          }
        }
        break;
      default:
    }
  }

  let zeroAlwTotal = 0,
    overWithhold = 0,
    totalTaxWithheld = 0,
    remainingTotalSalary = 0,
    tempWages = 0

  // Step 1: Add up all the baseline witholding for each income
  currentIncomes.forEach((currIncome, index) => {
    if (currIncome.incomeType !== 'pension') {
      baselineTotalWHFH += currIncome.baselineFinalWH
      zeroAlwTotal += currIncome.remainingWHAmounts[0]
      totalTaxWithheld += currIncome.adjustedTotalTaxWH
    } else {
      baselineTotalWHFH += (currentIncomes[index].remainingWHAmounts[currentIncomes[index].suggestAllowFH] + currentIncomes[index].adjustedTotalTaxWH)
      totalTaxWithheld += currentIncomes[index].adjustedTotalTaxWH
    }
  })
  zeroAlwTotal = zeroAlwTotal <= 0 ? 0.00001 : zeroAlwTotal
  // this is Q in Alan's spreadsheet (Overwithholding if baseline w/h rest of the year)
  overWithhold = (baselineTotalWHFH + totalTaxesPaid + pastIncomeTaxes + ssProjTaxes + bonusTaxes) - obligatedTaxPlusRefund
  overWithhold = overWithhold <= 0 ? 0 : overWithhold

  // console.log(overWithhold, baselineTotalWHFH, totalTaxesPaid, obligatedTaxPlusRefund, taxLiability, refundValue, pastIncomeTaxes, taxToDate)

  // Step 2: determine if remainder baseline total WH is greater than Tax (& Tax + desired Refund) at zero allowances (baseline)
  if ((baselineTotalWHFH + totalTaxesPaid + pastIncomeTaxes + ssProjTaxes + bonusTaxes) > obligatedTaxPlusRefund) {
    currentIncomes.forEach((currIncome, index) => {
      if (currIncome.incomeType !== 'pension') {
        currentIncomes[index].zeroAlwPtc = (currIncome.remainingWHAmounts[0] / zeroAlwTotal)
        if (overWithhold > 0) {
          currentIncomes[index].finalAnnualAmtFH = ((overWithhold * currentIncomes[index].zeroAlwPtc * currIncome.totalPPEmployer)
            / currIncome.adjustedRemainingPayPeriods)
        } else {
          currentIncomes[index].finalAnnualAmtFH = currIncome.baseWHAmounts[0]
        }
      }
    })
  }

  // Step 3: find min slider value
  shutDownWithholding = totalTaxWithheld - taxLiability > 0 ? totalTaxWithheld - taxLiability : 0


  // Estimated Future Tax payment check
  const { totalWageIncomeEstPay, finalTotalIncome } = agi
  if (estFutureTaxPay > 0) {
    currentIncomes.forEach((currIncome, index) => {
      // check W-4 Line 3 update logic;  if 0 then move on to W-4 Line 4 update logic
      const w4Line3Check = estFutureW4Line3Check(estFutureTaxPay, taxLiability, totalWageIncomeEstPay, finalTotalIncome, wagesTaxLiability, currIncome, _taxToDate)
      if (w4Line3Check > 0) {
        currentIncomes[index].finalAnnualAmtFH = w4Line3Check
        currentIncomes[index].addtlWHDueFH = 0
      }
      if (w4Line3Check <= 0) {
        const w4Line4Check = estFutureW4Line4Check(estFutureTaxPay, taxLiability, totalWageIncomeEstPay, finalTotalIncome, wagesTaxLiability, currIncome, _taxToDate)
        currentIncomes[index].addtlWHDueFH = w4Line4Check
        currentIncomes[index].finalAnnualAmtFH = 0
      }
    })
  }

  // Step 4 add new variable for front-end paycheck updates

  currentIncomes.forEach((currIncome, index) => {
    if (currIncome.incomeType !== 'pension') {
      currentIncomes[index].zeroAlwPtc = (currIncome.remainingWHAmounts[0] / zeroAlwTotal)
      tempWages = (currIncome.totalWages / currIncome.totalPP)
      remainingTotalSalary += (tempWages * currIncome.adjustedRemainingPayPeriods)

      currentIncomes[index].finalPaycheck = currentIncomes[index].finalAnnualAmtFH === 0
        ? (currIncome.remainingWHAmounts[0] / currIncome.adjustedRemainingPayPeriods)
        + currIncome.addtlWHDueFH
        : (currIncome.remainingWHAmounts[0] / currIncome.adjustedRemainingPayPeriods)
        - (currentIncomes[index].finalAnnualAmtFH / currIncome.totalPPEmployer)

      if (currentIncomes[index].finalPaycheck < 0) {
        currentIncomes[index].finalAnnualAmtFH = currentIncomes[index].baseWHAmounts[0]
        currentIncomes[index].finalPaycheck = 0
      }

      currentIncomes[index].standardWithholding = getStandardWH(index, currentIncomes, currIncome.totalPPEmployer)
    } else {
      tempWages = (currIncome.totalWages / currIncome.totalPP)
      remainingTotalSalary += (tempWages * currIncome.adjustedRemainingPayPeriods)

      currentIncomes[index].finalPaycheck = (currIncome.remainingWHAmounts[currentIncomes[index].suggestAllowFH] / currIncome.adjustedRemainingPayPeriods)
        + currIncome.addtlWHDueFH

      // set max if finalpayheck is greater than tempWages
      currentIncomes[index].finalPaycheck = tempWages < currentIncomes[index].finalPaycheck ? tempWages : currentIncomes[index].finalPaycheck
      currentIncomes[index].standardWithholding = getStandardWH(index, currentIncomes, currIncome.totalPPEmployer)
    }
  })
  // Step 5 find max salary shutdown value
  // console.log('shutdown rules', remainingTotalSalary, taxLiability, totalTaxWithheld)
  let tempSalary = wagesTaxLiability - totalTaxWithheld < 0 ? 0 : wagesTaxLiability - totalTaxWithheld

  // console.log('tax', _taxToDate, tempSalary, remainingTotalSalary)

  shutDownSalary = remainingTotalSalary - tempSalary

  // console.log('finalW4Suggestion', currentIncomes, shutDownWithholding, shutDownSalary)

  return { currentIncomes, shutDownWithholding, shutDownSalary }
}

export default getFinalW4Recom
