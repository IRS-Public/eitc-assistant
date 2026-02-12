import React from 'react'
import clsx from 'clsx'
import Heading from '../Heading'

const ContentBox = ({ heading = null, subheading, image, secondary = false, className, dataTestId, children }) => (
  <div
    className={clsx(
      className
    )}
    data-testid={dataTestId}
  >
    {
      image && (
        <img src={image.path} alt={image.altText} className="w-full h-auto"></img>
      )
    }
    <div
      data-testid={`${dataTestId}-inner-wrapper`}
      className={clsx(
        'border border-gray-500 px-4 py-6',
        !secondary && 'border-t-3 border-t-gold-500'
      )}
    >
      {heading && (
        <Heading level="2" dataTestId={`${dataTestId}-heading`} className="text-2xl mb-4 font-bold fade-in">
          {heading}
        </Heading>
      )}

      {subheading && (
        <Heading
          level="3"
          dataTestId={`${dataTestId}-sub-heading`}
          className="mb-9 italic fade-in"
        >
          {subheading}
        </Heading>
      )}

      {children}
    </div>
  </div>
)

export default ContentBox
