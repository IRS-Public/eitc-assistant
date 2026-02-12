import PropTypes from 'prop-types'
import clsx from 'clsx'
import Button from '../Button'

const NavButtons = ({
  backOnclick,
  backClassName,
  nextOnclick,
  nextClassName,
  backOnly = false,
  nextOnly = false,
  backText = 'Back',
  nextText = 'Next',
  backDisable,
  nextDisable,
  children
}) => (
  <div className="buttons mt-10 fade-in">
    {!nextOnly && (
      <Button
        type="button"
        secondary
        onClick={backOnclick}
        data-testid="backButton"
        disabled={backDisable}
        className={clsx(
          'mr-0 sm:mr-4 mb-5 sm:mb-0',
          backClassName
        )}
      >
        {backText}
      </Button>
    )}
    {!backOnly && (
      <Button
        data-testid="nextButton"
        type="submit"
        className={clsx(
          'mt-0 fade-in',
          nextClassName
        )}
        disabled={nextDisable}
        onClick={nextOnclick}
      >
        {nextText}
      </Button>
    )}
    {children}
  </div>
)

NavButtons.propTypes = {
  backOnclick: PropTypes.func,
  nextOnclick: PropTypes.func,
  backOnly: PropTypes.bool,
  nextOnly: PropTypes.bool,
  backText: PropTypes.string,
  nextText: PropTypes.string,
  backDisable: PropTypes.bool,
  nextDisable: PropTypes.bool,
  children: PropTypes.any,
}

export default NavButtons
