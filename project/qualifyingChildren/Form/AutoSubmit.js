import { useEffect, useContext } from 'react'
import { useFormikContext } from 'formik'
import SiteContext from '../../../context/Site/SiteContext'

const AutoSubmit = ({ isCompleted, isQualifyingDependent, setQualifyingChildren }) => {
  const { values, errors } = useFormikContext()
  const { site, siteDispatch } = useContext(SiteContext)

  useEffect(() => {
    const qcArr = []
    let num = 0
    values.children.forEach((child, index) => {
      qcArr.push(isQualifyingDependent(values, index))

      if (isQualifyingDependent(values, index)) {
        num++
      }
    })

    setQualifyingChildren(qcArr)

    const newResults = {
      generalInfo: site.forms.generalInfo,
      filingStatus: site.forms.filingStatus,
      agi: site.forms.agi,
      qualifyingChildren: {
        ...site.forms.qualifyingChildren,
        completed: isCompleted(values, errors),
        values: {
          ...values,
          numOfDependents: num
        }
      },
      results: site.forms.results,
    }

    siteDispatch({
      type: 'UPDATE_FORMS',
      payload: newResults,
    })
  }, [values])

  return null
}

export default AutoSubmit
