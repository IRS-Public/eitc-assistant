import PropTypes from 'prop-types'
import React, { useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestionCircle, faTimesCircle } from '@fortawesome/free-regular-svg-icons'
import { buildClassList, gaEvent } from '../../helpers'
import SiteContext from '../../context/Site/SiteContext'

const HelpTipButton = ({ page, expanded, dataTestID, name, className, gaLabel, ...otherProps }) => {
  const { site, siteDispatch } = useContext(SiteContext)

  const handleHelp = (event, question) => {
    event.preventDefault()
    const helpTipId = `${question}-helpTip`
    const newForms = {
      ...site.forms,
      [page]: {
        ...site.forms[page],
        helpTips: {
          ...site.forms[page].helpTips,
          [question]: {
            ...site.forms[page].helpTips[question],
            open: !site.forms[page].helpTips[question].open,
          },
        },
      },
    }

    siteDispatch({
      type: 'UPDATE_FORMS',
      payload: newForms,
    })

    if (!site.forms[page].helpTips[question].open) {
      gaEvent('pup_helptip', 'pup_helptip', 'Click', gaLabel || helpTipId)
    }

    // const element = document.getElementById(helpTipId)
    // setTimeout(() => {
    //   element.focus()
    // }, 100)
  }

  return (
    <button
      type="button"
      aria-expanded={expanded}
      id={dataTestID}
      data-testid={dataTestID}
      title={otherProps['aria-label']}
      className={buildClassList([
        className,
        'help-link text-blue-500 inline',
        'hover:text-blue-600 focus:text-blue-700 active:text-blue-800 text-xl'
      ])}
      onClick={(e) => handleHelp(e, name)}
      {...otherProps}
    >
      <FontAwesomeIcon 
        size="1x" 
        className="fill-current mx-1" 
        icon={expanded ? faTimesCircle : faQuestionCircle} 
        style={{
          width: '1em',
          height: '1em'
        }} 
      />
    </button>
  )
}

HelpTipButton.propTypes = {
  expanded: PropTypes.bool,
  name: PropTypes.string,
  page: PropTypes.string,
  dataTestID: PropTypes.string,
  className: PropTypes.any,
}

export default HelpTipButton
