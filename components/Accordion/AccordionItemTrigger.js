import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { gaEvent } from '../../helpers'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp } from "@fortawesome/free-solid-svg-icons"
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'

import Heading from '../Heading'

const AccordionItemTrigger = ({
  id,
  level,
  multiItem,
  isExpanded,
  setIsExpanded,
  disabled,
  activeIndex,
  setActiveIndex,
  index,
  children,
  accordionOpenArr,
  setAccordionOpenArr,
  isOpen,
  dataTestId,
  title,
  subtitle,
  site,
  siteDispatch,
  lang,
  bgColor = '#fff',
  className,
  accordionSmall,
  sendGAEvent = false,
  buttonAriaLabel
}) => {
  const iconClass = clsx('fill-current inline-block', disabled ? 'text-gray-600' : 'text-blue-500  md:content-start', accordionSmall ? 'text-lg' : 'text-1.5xl')
  const icon = isExpanded ? (
    <FontAwesomeIcon
      className={iconClass}
      icon={faChevronDown}
      style={{
        width: '1em',
        height: '1em'
      }}
    />
  ) : (
    <FontAwesomeIcon
      className={iconClass}
      icon={faChevronUp}
      style={{
        width: '1em',
        height: '1em'
      }}
    />
  )

  const handleClick = () => {
    // if (disabled) {
    //   setIsExpanded(false)
    // } else {
    if (multiItem) {
      setIsExpanded(!isExpanded)

      const newAccordionOpenArr = [...accordionOpenArr]
      newAccordionOpenArr[index] = !isExpanded
      setAccordionOpenArr(newAccordionOpenArr)
    } else {
      if (multiItem) {
        setIsExpanded(!isExpanded)
      } else {
        setActiveIndex(index)

        if (activeIndex === index) {
          setIsExpanded(!isExpanded)
        }
      }
    }
  }

  useEffect(() => {
    if (!multiItem) {
      if (activeIndex === index) {
        setIsExpanded(true)
      } else {
        setIsExpanded(false)
      }
    }
  }, [activeIndex])

  useEffect(() => {
    if (multiItem) {
      if (isOpen) {
        setIsExpanded(true)
      } else {
        setIsExpanded(false)
      }
    }
  }, [isOpen])

  return (
    <div
      style={{ backgroundColor: bgColor }}
      className={
        clsx(
          'w-full m-0 flex items-start font-bold border-gray-500 border-t md:items-center',
          accordionSmall ? 'p-2 text-md' : 'p-4 text-xl',
          className
        )
      }
    >
      <button
        type="button"
        style={{ top: '3px' }}
        onClick={() => handleClick()}
        aria-expanded={isExpanded}
        className={clsx(
          'Accordion-trigger Accordion-icon mr-2',
          disabled && 'cursor-not-allowed text-gray-600'
        )}
        aria-controls={id}
        aria-label={buttonAriaLabel}
        id={`${id}-trigger`}
        data-testid={`${dataTestId}-trigger`}
        disabled={disabled}
      >
        {icon}
      </button>

      <div className='flex flex-col align-left  md:flex-row md:items-center'>
        <Heading
          level={level}
          id={`accordionHeading${index}`}
          className={clsx('Accordion-title inline-block')}
          dataTestId={`${dataTestId}-title`}
          onBlur={(e) => {
            if (e.target.textContent.length === 0) {
              e.target.innerText = lang('incomeWithholding.h2.accordionTitle', { ':number': lang(`global.span.number${index + 1}`) })
            }
          }}
        >
          {title}
        </Heading>

        {subtitle &&
          <p
            id={`accordionSubtitle${index}`}
            className={'whitespace-nowrap text-gray-600 text-base font-normal italic  md:mx-2'}
            dataTestId={`${dataTestId}-subtitle`}
          >
            {subtitle}
          </p>
        }
      </div>

      {children}
    </div>
  )
}

AccordionItemTrigger.propTypes = {
  id: PropTypes.string,
  level: PropTypes.string,
  multiItem: PropTypes.bool,
  gaLabel: PropTypes.string,
  isExpanded: PropTypes.bool,
  setIsExpanded: PropTypes.func,
  disabled: PropTypes.bool,
  activeIndex: PropTypes.number,
  setActiveIndex: PropTypes.func,
  index: PropTypes.number,
  children: PropTypes.any,
  accordionOpenArr: PropTypes.any,
  setAccordionOpenArr: PropTypes.any,
  isOpen: PropTypes.bool,
}

export default AccordionItemTrigger
