import { useEffect, useContext } from 'react'
import { useFormikContext } from 'formik'
import SiteContext from '../../../context/Site/SiteContext'

const AutoSubmit = ({ isCompleted }) => {
  const { values } = useFormikContext()
  const { site, siteDispatch } = useContext(SiteContext)

  useEffect(() => {
    const newForms = {
      generalInfo: site.forms.generalInfo,
      filingStatus: site.forms.filingStatus,
      agi: {
        ...site.forms.agi,
        values: {
          ...site.forms.agi.values,
          ...values,
        },
        completed: isCompleted(values),
      },
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
