import React, { useContext } from 'react'
import Footer from './Footer'
import FooterTop from './FooterTop'
import FooterContext from '../../context/Footer/FooterContext'

const IRSFooter = ({ ...rest }) => {
  const { footer } = useContext(FooterContext)

  return (
    <Footer footerLinks={footer.footerLinks} {...rest}>
      <FooterTop sitemap={footer.sitemap} socialLinks={footer.socialLinks} />
    </Footer>
  )
}

export default IRSFooter
