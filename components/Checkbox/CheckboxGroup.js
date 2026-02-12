import React from 'react'
import { useFormikContext, getIn } from 'formik'
import clsx from 'clsx'
import HelpTipButton from '../HelpTip/HelpTipButton'
import HelpTipBody from '../HelpTip/HelpTipBody'
import Checkbox from './Checkbox'
import TextError from '../TextError'

const CheckboxGroup = (props) => {
  const { className, id, flex = 'false', label, name, required = false, helpTip, dataTestId, hintText, options, boldLabel = false, show = true, labelClass, ...rest } = props

  const { errors, touched } = useFormikContext()

  return (
    <div
      className={clsx(
        'fade-in w-full',
        className,
        show ? 'block' : 'hidden'
      )}
    >

      <fieldset id={id} className={clsx(flex === 'true' ? 'flex flex-wrap' : '')}>
        {label && (
          <><legend className={labelClass} data-testid={dataTestId}>
            {boldLabel ? <span className="font-bold">{label}</span> : label} {required
              && <span className="text-red-500 ml-1">*</span>}

            {helpTip && (
              <HelpTipButton
                page={helpTip.page}
                expanded={helpTip.expanded}
                dataTestID={`${name}HelpTip`}
                name={name}
                aria-label={helpTip.ariaLabel}
                gaLabel={helpTip.gaLabel ? helpTip.gaLabel : helpTip.ariaLabel}
              />
            )}
          </legend>

            {helpTip && (
              <HelpTipBody
                id={`${name}-helpTip`}
                tabIndex="0"
                expanded={helpTip.expanded}
                elements={helpTip.elements()}
              />
            )}
          </>
        )
        }

        {hintText && (
          <span className="block text-gray-600 mt-1 text-sm">{hintText}</span>
        )}
        <Checkbox
          name={name}
          flex={flex}
          options={options}
          {...rest}
        />
      </fieldset>

      {getIn(errors, name) && getIn(touched, name) && (
        <TextError
          id={`${name}-error-message`}
          data-testid={`${name}-error`}
        >
          {getIn(errors, name)}
        </TextError>
      )}
    </div>
  )
}

export default CheckboxGroup
