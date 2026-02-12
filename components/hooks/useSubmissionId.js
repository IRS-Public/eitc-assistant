import { useContext } from 'react'
import { v4 as uuid } from 'uuid'
import SiteContext from '../../context/Site/SiteContext'

function useSubmissionId() {
  const { site, siteDispatch } = useContext(SiteContext)

  if (site.submissionId === null) {
    const id = uuid()
    siteDispatch({
      type: 'UPDATE_SUBMISSION_ID',
      payload: id
    })
  }

  return null
}

export default useSubmissionId
