import { useEffect, useContext } from 'react'
import { useFormikContext } from 'formik'
import SiteContext from '../../../context/Site/SiteContext'
import fsCalc from './helpers/fsCalc'

const AutoSubmit = ({ isCompleted }) => {
  const { values } = useFormikContext()
  const { site, siteDispatch } = useContext(SiteContext)

  useEffect(() => {
    const newForms = {
      generalInfo: site.forms.generalInfo,
      filingStatus: {
        ...site.forms.filingStatus,
        fsCalc: fsCalc(values),
        values: {
          ...site.forms.filingStatus.values,
          ...values,
        },
        completed: isCompleted,
      },
      agi: site.forms.agi,
      qualifyingChildren: site.forms.qualifyingChildren,
      results: site.forms.results,
    }

    siteDispatch({
      type: 'UPDATE_FORMS',
      payload: newForms,
    })
  }, [values])

  return null
}

export default AutoSubmit
