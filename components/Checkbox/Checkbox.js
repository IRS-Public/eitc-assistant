import PropTypes from 'prop-types'
import clsx from 'clsx'
import { Field } from 'formik'
import { Checkbox as UICheckbox } from 'formik-material-ui'
import { makeStyles } from '@material-ui/core/styles'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import HelpTipBody from '../HelpTip/HelpTipBody'
import HelpTipButton from '../HelpTip/HelpTipButton'

const useStyles = makeStyles({
  root: {
    padding: 0,
    position: 'relative',
    '&:hover': {
      backgroundColor: 'transparent',
    },
    marginRight: 0,
  },
  icon: {
    borderRadius: 3,
    width: 20,
    height: 20,
    boxShadow: 'inset 0 0 0 1px rgba(91,97,107,1), inset 0 -1px 0 rgba(91,97,107,1)',
    backgroundColor: '#fff',
    borderColor: '#5b616b',
    '$root.Mui-focusVisible &': {
      outline: '2px auto rgba(173, 212, 254)',
      outlineOffset: 2,
    },
    'input:disabled ~ &': {
      boxShadow: 'none',
      background: 'rgb(214,215,217)',
    },
  },
  checkedIcon: {
    backgroundColor: '#00599c',
    backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
    boxShadow: 'inset 0 0 0 1px #00599C, inset 0 -1px 0 #00599C',
    '&:before': {
      display: 'block',
      width: 20,
      height: 20,
      backgroundImage:
        "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath"
        + " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 "
        + "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
      content: '""',
    },
    'input:hover ~ &': {
      backgroundColor: '#00599c',
    },
  },
  label: {
    marginLeft: '.75rem',
    lineHeight: '1.5',
    marginRight: 0,
    fontFamily: 'Source Sans Pro',
  }
})

const Checkbox = ({ name, options }) => {
  const classes = useStyles()
  const checkboxes = options.map(({ label, checkedValue, helpTip, required, show = true, value, id, disabled, handleChange, ariaLabel, dataTestId, className = 'mt-3' }, index) => (
    <div className={clsx('ml-3', className, show ? 'block' : 'hidden')} key={index}>
      <div className="flex flex-row items-center">
        <FormControlLabel
          classes={{ label: classes.label, root: classes.root }}
          control={
            (
              <Field>
                {(props) => (
                  <>
                    <UICheckbox
                      type="checkbox"
                      name={name}
                      value={value}
                      id={id}
                      checked={checkedValue}
                      disabled={disabled}
                      onChange={(e) => {
                        props.field.onChange(e)

                        if (handleChange) {
                          handleChange()
                        }
                      }}
                      color="default"
                      className={classes.root}
                      checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
                      icon={<span className={classes.icon} />}
                      inputProps={{ 'aria-label': ariaLabel || label }}
                      disableRipple
                      {...props}
                    />

                    <span className="ml-4">{label}{required && <span className="text-red-500 ml-1">*</span>}

                      {helpTip && (
                        <HelpTipButton
                          page={helpTip.page}
                          expanded={helpTip.expanded}
                          dataTestID={`${dataTestId}HelpTip`}
                          name={value}
                          aria-label={helpTip.ariaLabel}
                          gaLabel={helpTip.gaLabel ? helpTip.gaLabel : helpTip.ariaLabel}
                          className="top-1"
                        />
                      )}
                    </span>
                  </>
                )
                }
              </Field>
            )
          }
          data-testid={value}
        />
      </div>

      {helpTip && (
        <HelpTipBody
          id={`${name}-helpTip`}
          tabIndex="0"
          expanded={helpTip.expanded}
          elements={helpTip.elements()}
        />
      )}
    </div>
  ))

  return checkboxes
}

Checkbox.propTypes = {
  input: PropTypes.any,
  label: PropTypes.string,
  onClick: PropTypes.any,
  disabled: PropTypes.any,
  ariaLabel: PropTypes.string,
}

export default Checkbox
