import { useEffect, useContext } from 'react'
import { useFormikContext } from 'formik'
import SiteContext from '../../../context/Site/SiteContext'

const AutoSubmit = ({ isCompleted, setPreviousYearValue }) => {
  const { values } = useFormikContext()
  const { site, siteDispatch } = useContext(SiteContext)

  useEffect(() => {
    setPreviousYearValue(site.forms.generalInfo.values.year)
  }, [values.year])

  useEffect(() => {
    const newForms = {
      generalInfo: {
        ...site.forms.generalInfo,
        values: {
          ...site.forms.generalInfo.values,
          ...values,
        },
        completed: isCompleted(values),
      },
      filingStatus: site.forms.filingStatus,
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
