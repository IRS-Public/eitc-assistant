import PropTypes from 'prop-types'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import clsx from 'clsx'

const SearchField = ({ id, formID, buttonId, label, btnLabel, placeholder, action, external, className, dataTestId, style }) => {
  const buttonContents = (
    <button
      id={buttonId}
      type="submit"
      title="Search"
      name="search"
      aria-label="Search IRS.gov"
      className="pt-1 pb-1 px-2"
      data-testid={`${dataTestId}Button`}
    >
      <FontAwesomeIcon
        icon={faSearch}
        height="1.2em"
        width="1.2em"
        className="fill-current text-blue-500"
        data-testid={`${dataTestId}SearchIcon`}
        focusable="false"
      />
      <span className="sr-only">{btnLabel}</span>
    </button>
  )

  return (
    <div className={clsx('search relative lg:block', className)}>
      <form
        id={formID}
        method="GET"
        action={action}
        target={external ? '_blank' : '_self'}
        className="m-0 mt-4 lg:mt-0"
      >
        <label htmlFor={id}>
          <span className="sr-only">{label}</span>
        </label>
        <input
          id={id}
          type="text"
          name="search"
          style={style}
          data-testid={dataTestId}
          className="rounded-sm border-0 p-1 pl-2 float-right w-full right-0 pr-8 text-black placeholder-gray-600"
          placeholder={placeholder}
        />
        <div className="absolute top-0 right-0">{buttonContents}</div>
      </form>
    </div>
  )
}

SearchField.propTypes = {
  action: PropTypes.string.isRequired,
  btnLabel: PropTypes.string.isRequired,
  buttonId: PropTypes.string.isRequired,
  className: PropTypes.any,
  external: PropTypes.bool,
  formID: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  style: PropTypes.any,
}

export default SearchField
