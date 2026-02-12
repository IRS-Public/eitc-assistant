import { scroller } from 'react-scroll'

const scrollTo = (element, duration = 400, delay = 0, offset = 0) => {
    scroller.scrollTo(element, {
        duration,
        delay,
        offset,
        smooth: 'easeInOutQuart'
    })
}

export default scrollTo
