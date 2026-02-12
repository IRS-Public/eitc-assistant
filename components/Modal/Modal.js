import PropTypes from 'prop-types';
import React, { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons"
import Heading from '../Heading'

function Modal({ title, close, children }) {
  useEffect(() => {
    document.getElementById('modal-close').focus()
  }, [])

  return (
    <div
      className="flex fixed h-screen w-screen top-0 left-0 items-center justify-center z-50 bg-black bg-opacity-50 fade-in"
      onClick={() => close()}
      role="alertdialog"
    >
      <div
        className="p-4 md:p-8 w-3/4 lg:w-2/5 bg-white relative"
        data-testid="modal"
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          aria-label="Close Modal Button"
          className="absolute -top-4 -right-4"
          type="button"
          onClick={() => close()}
          id="modal-close"
        >
          <FontAwesomeIcon
            className="text-blue-500 bg-white rounded-full"
            icon={faCircleXmark}
            size="2x"
          />
        </button>
        <Heading level="1" className="text-2xl font-bold mb-2">{title}</Heading>
        {children}
      </div>
    </div>
  )
}

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  close: PropTypes.func.isRequired,
  children: PropTypes.any,
}

export default Modal
