import PropTypes from 'prop-types'
import React, { useContext, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { useSwipeable } from 'react-swipeable'
import CarouselItem from './CarouselItem'
import SiteContext from '../../context/Site/SiteContext'
import { CONTAINER_SM } from '../../helpers/constants'

const Carousel = ({ slides }) => {
  const { length } = slides
  const { site, width, siteDispatch } = useContext(SiteContext)

  const handlePrev = () => {
    if (site.carousel.active >= 1 && site.carousel.active !== 0) {
      siteDispatch({ type: 'jump', payload: site.carousel.active - 1 })
    }
  }

  let fixNum = 1

  if (width >= 1050) {
    fixNum = 3
  } else if (width < 1050 && width > 750) {
    fixNum = 2
  }

  const handleNext = () => {
    if (site.carousel.active > length - (fixNum + 1)) {
      siteDispatch({ type: 'jump', payload: 0 })
    } else if (site.carousel.active !== (length - fixNum)) {
      siteDispatch({ type: 'jump', payload: site.carousel.active + 1 })
    }
  }

  const handlers = useSwipeable({
    onSwiping(e) {
      siteDispatch({ type: 'drag', payload: -e.deltaX })
    },
    onSwipedLeft(e) {
      swiped(e, length, 1)
    },
    onSwipedRight(e) {
      swiped(e, length, -1)
    },
    trackMouse: true,
    trackTouch: true,
  })

  const prevClass = () => ((site.carousel.active === 0) ? 'text-gray-500 cursor-not-allowed' : 'active:text-blue-800 hover:text-blue-600 text-blue-500 cursor-pointer')

  const nextClass = () => ((site.carousel.active >= (length - fixNum)) ? 'text-gray-500 cursor-not-allowed' : 'active:text-blue-800 hover:text-blue-600 text-blue-500 cursor-pointer')

  const transitionTime = 400,
    elastic = `transform ${transitionTime}ms cubic-bezier(0.68, -0.55, 0.265, 1.55)`,
    smooth = `transform ${transitionTime}ms ease`

  const swiped = (e, length, dir) => {
    const t = threshold(e.event.target),
      d = dir * e.deltaX

    if (d >= t) {
      dir > 0
        ? handleNext()
        : handlePrev()
    } else {
      siteDispatch({ type: 'drag', payload: 0 })
    }
  }

  const threshold = (target) => {
    const width = target.clientWidth
    return width / 3
  }

  useEffect(() => {
    const id = setTimeout(() => siteDispatch({ type: 'done' }), transitionTime)
    return () => clearTimeout(id)
  }, [site.carousel.desired])

  const maxItemWidth = width > CONTAINER_SM ? 294 : 284

  const style = {
    transform: 'translateX(0)',
    width: `${length * maxItemWidth}px`,
    left: `-${(site.carousel.active) * maxItemWidth}px`,
  }

  if (site.carousel.desired !== site.carousel.active) {
    const dist = Math.abs(site.carousel.active - site.carousel.desired)
    const pref = Math.sign(site.carousel.offset || 0)
    const dir = (dist > length / 2 ? 1 : -1) * Math.sign(site.carousel.desired - site.carousel.active)
    const shift = (100 * (pref || dir)) / (length + 2)
    style.transition = smooth
    style.transform = `translateX(${shift}%)`
  } else if (!isNaN(site.carousel.offset)) {
    if (site.carousel.offset !== 0) {
      style.transform = `translateX(${site.carousel.offset}px)`
    } else {
      style.transition = elastic
    }
  }

  return (
    length > 0 && (
      <div className="grid-container">

        <button aria-label="Advance left" tabIndex={site.carousel.active === 0 ? -1 : 1} className="prev text-center sm:self-center" onClick={handlePrev}>
          <FontAwesomeIcon
            icon={faAngleLeft}
            size={(width < CONTAINER_SM) ? '3x' : '6x'}
            className={prevClass()}
          />
        </button>

        <div className="carousel">
          <div className="carousel-content" {...handlers} style={style}>
            {slides.map((slide, index) => (
              slide.listed && <CarouselItem slide={slide} index={index} key={slide.id} />
            ))}
          </div>
        </div>

        <button
          tabIndex={site.carousel.active === (length - fixNum) ? -1 : 1}
          className="next text-center sm:ml-2 sm:self-center"
          onClick={handleNext}
          disabled={site.carousel.active === (length - fixNum)}
          aria-label="Advance right"
        >
          <FontAwesomeIcon
            icon={faAngleRight}
            size={(width < CONTAINER_SM) ? '3x' : '6x'}
            className={nextClass()}
          />
        </button>

      </div>
    )
  )
}

Carousel.propTypes = {
  slides: PropTypes.any,
}

export default Carousel
