import PropTypes from 'prop-types'
import React from 'react'
import { buildClassList } from '../../helpers'
import Replacement from './Replacement'

const Paragraph = ({ text, replace, bold, className, dataTestID, ...rest }) => (
  <p
    className={buildClassList([className, bold ? 'font-bold ' : ''])}
    data-testid={dataTestID}
    {...rest}
  >
    <Replacement text={text} replace={replace} />
  </p>
)

Paragraph.propTypes = {
  text: PropTypes.any,
  replace: PropTypes.any,
  bold: PropTypes.any,
  className: PropTypes.any,
  dataTestID: PropTypes.string,
}

export default Paragraph
