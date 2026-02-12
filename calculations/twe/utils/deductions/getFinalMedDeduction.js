const finalMedDeduction = (medicalTotal, agi, medLimit) => (medicalTotal - Math.round(agi * medLimit) <= 0
  ? 0
  : medicalTotal - Math.round(agi * medLimit))

export default finalMedDeduction
