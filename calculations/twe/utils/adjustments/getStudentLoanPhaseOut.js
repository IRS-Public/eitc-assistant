import filingStatusKey from '../filingStatusKey'

const getStudentLoanPhaseOut = (totalIncome, sLID, filingStatus, param) => {
    const fsKey = filingStatusKey(filingStatus)

    let sLIDLimit = fsKey === 1 ? param.STUDENTLOAN_LIMIT_MFJ : param.STUDENTLOAN_LIMIT_OTHER,
        sLIDThres = fsKey === 1 ? param.STUDENTLOAN_THRESHOLD_MFJ : param.STUDENTLOAN_THRESHOLD_OTHER,
        finalDed = 0,
        sLIDPhaseOut = 0

    if (totalIncome > sLIDLimit) {
        sLIDPhaseOut = (totalIncome - sLIDLimit) / sLIDThres > 1 ? 1 : (totalIncome - sLIDLimit) / sLIDThres
        finalDed = sLID - (sLID * sLIDPhaseOut)
    } else {
        finalDed = sLID
    }

    return finalDed
}

export default getStudentLoanPhaseOut
