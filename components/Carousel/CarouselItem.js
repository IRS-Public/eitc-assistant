import PropTypes from 'prop-types'
import React, { useContext } from 'react'
import ReactHtmlParser from 'react-html-parser'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons'
import SiteContext from '../../context/Site/SiteContext'
import Link from '../Link'
import { gaEvent } from '../../helpers'

// TODO: Crousel Items should be more of a template instead of forcing the user to use the same markup within an item

const CarouselItem = ({ slide, index }) => {
  const { site, siteDispatch, lang } = useContext(SiteContext)

  const handleFocus = (e) => {
    e.preventDefault()
    if (site.carousel.active !== index) {
      siteDispatch({ type: 'jump', payload: index })
    }
  }

  return (
    <div className="carousel-item flex flex-col" data-testid={slide.display.dataTestId} key={index} tabIndex="0">
      <div className="mb-4 h-12">
        <img alt={slide.id} src={slide.display.image} className="h-full" />
      </div>
      <div>
        <p className="text-sm">IRS Free File Program delivered by</p>
      </div>
      <div className="flex">
        <h2 className="font-bold text-lg mb-2 overflow-hidden">
          {ReactHtmlParser(slide.display.name, { decodeEntities: true })}
        </h2>
      </div>
      <div className="flex-grow">
        <div className="flex justify-start">
          <span className="w-2/5 font-bold">AGI</span>
          <span className="w-3/5">{slide.display.agi}</span>
        </div>
        <div className="flex justify-start">
          <span className="w-2/5 font-bold">Age</span>
          <span className="w-3/5">{slide.display.age}</span>
        </div>
        <div className="flex justify-start">
          <span className="w-2/5 font-bold">EITC</span>
          <span className="w-3/5">{slide.display.eitc}</span>
        </div>
        <div className="flex justify-start">
          <span className="w-2/5 font-bold">Military</span>
          <span className="w-3/5">{slide.display.military}</span>
        </div>
        <div className="flex justify-start">
          <span className="w-2/5 font-bold">Fed Filing</span>
          <span className="w-3/5">{slide.display.fedFiling}</span>
        </div>
        <div className="flex justify-start">
          <span className="w-2/5 font-bold">State Filing</span>
          <span className="w-3/5">{slide.display.stateFiling}</span>
        </div>
      </div>

      {slide.display.foreignAddress && <h2 className="text-center mt-2">{lang('global.h2.foreignAddress')}</h2>}

      <Link
        external
        href={slide.display.url}
        className="button mt-2"
        onFocus={(e) => {
          handleFocus(e)
        }}
        ariaLabel={`View ${slide.id} Offers`}
        icon="externalLink"
        iconPosition="right"
        onClick={() => gaEvent('Outbound Links', 'Outbound Links', 'Click', slide.display.url)}
      >
        View this Offer
        <FontAwesomeIcon className="fill-current ml-2 text-xs" icon={faExternalLinkAlt} />
      </Link>
    </div>
  )
}

CarouselItem.propTypes = {
  slide: PropTypes.any,
  dataTestId: PropTypes.any,
  index: PropTypes.any,
}

export default CarouselItem
