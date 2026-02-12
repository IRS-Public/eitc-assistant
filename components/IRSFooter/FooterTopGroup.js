import PropTypes from 'prop-types'
import React, { useState, useContext } from 'react'
import { buildClassList } from '../../helpers'
import { PlusIcon, MinusIcon } from '../Icons'
import FooterContext from '../../context/Footer/FooterContext'
import SiteContext from '../../context/Site/SiteContext'
import { CONTAINER_MD } from '../../helpers/constants'

const FooterTopGroup = ({ text, children, dataTestId }) => {
  const [open, setOpen] = useState(false)
  const { lang } = useContext(FooterContext)
  const { width } = useContext(SiteContext)

  const handle = (e) => {
    e.preventDefault()
    setOpen(!open)
  }

  const id = text.replace(/\s+/g, '-').toLowerCase()

  if (React.Children.count(children) === 0) return null
  const opts = {}
  if (width <= CONTAINER_MD) {
    opts['aria-controls'] = id
    opts['aria-expanded'] = open ? 'true' : 'false'
  } else {
    opts.role = 'heading'
    opts.focusable = false
    opts.tabIndex = '-1'
  }
  return (
    <div className="footerTopGroup md:flex-1 md:pr-3 lg:pr-6">
      <h3 data-testid={text} className="groupLabel inline-block uppercase mb-3 leading-none">
        {width < CONTAINER_MD && (
          <button
            {...opts}
            onClick={handle}
            aria-label={`${text} section`}
            className="groupButton text-blue-500 text-left"
          >
            <div className="py-1 pr-1">
              {!open && <PlusIcon className="groupButtonIcon md:hidden inline-block mr-2 top-1-25" focusable={false} />}
              {open && <MinusIcon className="groupButtonIcon md:hidden inline-block mr-2 top-1-25" focusable={false} />}
              <span className="groupLabelSpan text-black uppercase font-bold inline-block">{lang(text)}</span>
            </div>
          </button>
        )}

        {width > CONTAINER_MD && (
          <>
            <span className="groupLabelSpan text-black uppercase font-bold inline-block">{lang(text)}</span>
          </>
        )}
      </h3>
      <ul id={id} className={buildClassList('groupList ml-6 md:ml-0 md:block', open ? 'block' : 'hidden')}>
        {lang(children)}
      </ul>
    </div>
  )
}

FooterTopGroup.propTypes = {
  children: PropTypes.any,
  dataTestId: PropTypes.any,
  text: PropTypes.string,
}

export default FooterTopGroup
