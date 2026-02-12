import { memo } from 'react'
import PropTypes from 'prop-types'
import { Field } from 'formik'
import clsx from 'clsx'
import { camelize } from '../../helpers'
import Replacement from '../HtmlBuilder/Replacement'

const Radio = (props) => {
  const {
    className,
    horizontal = false,
    name,
    onClick,
    onFocus,
    options,
    onChange,
    dataTestId,
    ...rest
  } = props

  const styles = {
    svg: {
      width: '24',
      height: '24',
      viewBox: '0 0 26 26',
    },
    focus: { cx: '10', cy: '10', r: '11', sw: '3' },
    outline: { cx: '10', cy: '10', r: '9', sw: '1' },
    dot: { cx: '10', cy: '10', r: '6' },
  }

  return (
    <Field name={name}>
      {({ field }) => options.map((option, index) => (
        <div
          key={index}
          className={clsx(
            'radio-button mt-3',
            className,
            horizontal ? 'inline-block mr-5' : 'flex w-auto',
          )}
        >
          <input
            type="radio"
            name={field.name}
            value={option.value}
            aria-label={option.ariaLabel ? option.ariaLabel : `${option.label}, ${props.questionLabel}`}
            checked={field.value === option.value}
            onBlur={field.onBlur}
            disabled={option.disabled}
            onChange={(e) => {
              field.onChange(e)
              onChange && onChange(e)
            }}
            onClick={() => onClick && onClick()}
            onFocus={onFocus}
            data-testid={`${dataTestId}-input-${camelize(option.value)}`}
            className={clsx(
              'input w-5 h-5',
              option.disabled ? 'cursor-not-allowed' : ''
            )}
            // aria-labelledby={`${option.id}-span`}
            // aria-describedby={`${name}-error-message`}
            {...rest}
            id={option.id}
          />

          <label data-testid={`${dataTestId}-${camelize(option.value)}`} className="label" htmlFor={option.id} id={`${option.id}-label`} aria-hidden >
            <svg
              className="svg"
              fill="currentColor"
              preserveAspectRatio="xMidYMid meet"
              height={styles.svg.height}
              width={styles.svg.width}
              viewBox={styles.svg.viewBox}
              focusable={false}
            >
              <circle
                className="radioFocus"
                cx={styles.focus.cx}
                cy={styles.focus.cy}
                r={styles.focus.r}
                fill="none"
                stroke="#fff"
                strokeWidth={styles.focus.sw}
              />
              <circle
                className="radioOutline"
                cx={styles.outline.cx}
                cy={styles.outline.cy}
                r={styles.outline.r}
                fill={option.disabled ? '#D6D7D9' : 'none'}
                stroke={option.disabled ? '#D6D7D9' : '#000'}
                strokeWidth={styles.outline.sw}
              />
              {!option.disabled && (
                <circle
                  className="radioDot"
                  cx={styles.dot.cx}
                  cy={styles.dot.cy}
                  r={styles.dot.r}
                  fill={option.disabled ? '#000' : '#fff'}
                />
              )}
            </svg>
            <span
              id={`${option.id}-span`}
              className={clsx('text',
                option.disabled ? 'text-gray-600' : '')}
            ><Replacement text={option.label} replace={option.replacements ? option.replacements : []} /></span>
          </label>
        </div>
      )
      )}
    </Field>
  )
}

Radio.propTypes = {
  className: PropTypes.string,
  horizontal: PropTypes.bool,
  name: PropTypes.string,
  dataTestId: PropTypes.string,
  onClick: PropTypes.func,
  onChange: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string,
  })).isRequired,
}

const memoizedComp = memo(Radio)

export default memoizedComp
