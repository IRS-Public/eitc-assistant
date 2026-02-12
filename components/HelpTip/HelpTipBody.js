import PropTypes from 'prop-types';
import React from 'react'
import clsx from 'clsx'
import HtmlBuilder from '../HtmlBuilder'

const HelpTipBody = ({ id, tabIndex = '0', expanded, elements, dataTestID, widthClass = "w-full lg:w-10/12" }) => (
  <div
    data-testid={dataTestID}
    id={id}
    tabIndex={tabIndex}
    className={clsx(
      'border border-gray-500 p-4 mb-3 flow-root fade-in mt-2',
      expanded ? 'block' : 'hidden',
      widthClass,
    )}
  >
    <HtmlBuilder elements={elements} />
  </div>
)

HelpTipBody.propTypes = {
  elements: PropTypes.any,
  expanded: PropTypes.bool,
  id: PropTypes.string,
  tabIndex: PropTypes.string,
  dataTestID: PropTypes.string
}

export default HelpTipBody
