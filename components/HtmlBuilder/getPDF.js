import { PDFDocument } from 'pdf-lib'

const getPDF = async (fileType, suggestedAllowances, addtlWHDueFH, filingStatus, finalAnnualAmtFH, env, pdfParams) => {
  const download = (arrayBuffer, type) => {
    const blob = new Blob([arrayBuffer], { type })
    const dlLink = document.createElement('a')
    dlLink.href = URL.createObjectURL(blob)
    dlLink.setAttribute('download', `${fileType}.pdf`)
    dlLink.click()
    // window.open(dlLink)
  }

  const formUrl = fileType === 'fw4' ? env.w4Link : env.w4pLink
  const formPdfBytes = await fetch(formUrl).then((res) => res.arrayBuffer())
  const pdfDoc = await PDFDocument.load(formPdfBytes)

  const form = pdfDoc.getForm()

  // const fields = form.getFields()
  // fields.forEach((field) => {
  //   const type = field.constructor.name
  //   const name = field.getName()
  // })

  if (fileType === 'fw4') {
    const singleCheckbox = form.getCheckBox(pdfParams.fw4.singleCheckbox)
    const marriedCheckbox = form.getCheckBox(pdfParams.fw4.marriedCheckbox)
    const HeadOfHouseholdCheckbox = form.getCheckBox(pdfParams.fw4.HeadOfHouseholdCheckbox)
    const withheldW4 = form.getTextField(pdfParams.fw4.withheldW4)
    const creditLine3 = form.getTextField(pdfParams.fw4.creditLine3)

    if (filingStatus === 'head-of-household') {
      HeadOfHouseholdCheckbox.check()
    }

    if (['single', 'married-separate'].includes(filingStatus)) {
      singleCheckbox.check()
    }

    if (['married', 'widow'].includes(filingStatus)) {
      marriedCheckbox.check()
    }
    addtlWHDueFH > 0
      ? withheldW4.setText(Math.round(addtlWHDueFH).toString())
      : creditLine3.setText(Math.round(finalAnnualAmtFH).toString())
  }

  if (fileType === 'fw4p') {
    const singleCheckbox = form.getCheckBox(pdfParams.fw4p.singleCheckbox)
    const marriedCheckbox = form.getCheckBox(pdfParams.fw4p.marriedCheckbox)
    const HeadOfHouseholdCheckbox = form.getCheckBox(pdfParams.fw4p.HeadOfHouseholdCheckbox)
    const allowancesW4p = form.getTextField(pdfParams.fw4p.allowancesW4p)
    const withheldW4p = form.getTextField(pdfParams.fw4p.withheldW4p)

    if (filingStatus === 'head-of-household') {
      HeadOfHouseholdCheckbox.check()
    }

    if (['single', 'married-separate'].includes(filingStatus)) {
      singleCheckbox.check()
    }

    if (['married', 'widow'].includes(filingStatus)) {
      marriedCheckbox.check()
    }
    withheldW4p.setText(Math.round(addtlWHDueFH).toString())
    allowancesW4p.setText(suggestedAllowances.toString())
  }

  const pdfBytes = await pdfDoc.save()

  download(pdfBytes, 'application/pdf')
}

export default getPDF
