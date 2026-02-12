import PropTypes from 'prop-types';
import React from 'react'

const Spinner = ({ color = 'white', size = '80px' }) => {
  const barStyle = color ? { background: color, boxShadow: 'none' } : null
  const containerStyle = size ? { width: size, height: size } : null

  return (
    <div className="spinner" style={containerStyle}>
      <div className="bar1" style={barStyle} />
      <div className="bar2" style={barStyle} />
      <div className="bar3" style={barStyle} />
      <div className="bar4" style={barStyle} />
      <div className="bar5" style={barStyle} />
      <div className="bar6" style={barStyle} />
      <div className="bar7" style={barStyle} />
      <div className="bar8" style={barStyle} />
      <div className="bar9" style={barStyle} />
      <div className="bar10" style={barStyle} />
      <div className="bar11" style={barStyle} />
      <div className="bar12" style={barStyle} />
    </div>
  )
}

Spinner.propTypes = {
  color: PropTypes.string,
  size: PropTypes.string
}

export default Spinner
