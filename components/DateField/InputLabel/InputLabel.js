import React from 'react';
import PropTypes from 'prop-types';
import buildClassList from '../../../helpers/utilities/buildClassList';
import styles from './InputLabel.module.scss';
import HelpTipButton from '../../HelpTip/HelpTipButton'

const propTypes = {
  label: PropTypes.node.isRequired,
  htmlFor: PropTypes.string.isRequired,
  className: PropTypes.string,
  isRequired: PropTypes.bool,
  disabled: PropTypes.bool,
  children: PropTypes.node,
  helpTip: PropTypes.any,
  name: PropTypes.string,
};

const defaultProps = {
  isRequired: false,
  disabled: false,
};

/**
 * Label for form fields
 * @returns {node} the rendered DOM node
 * @param {object} props - the props
 * @param {string} label required - text for the input's label
 * @param {string} htmlFor required - sets the <label for... attribute
 * @param {bool} isRequired defaults to false. Adds required label
 */
export default function InputLabel(props) {
  const { label, htmlFor, className, isRequired, disabled, children, helpTip, name } = props;
  const style = buildClassList({
    [styles.label]: true,
    [styles.required]: isRequired,
    [styles.disabled]: disabled
  });

  let requiredNode = null;
  if (isRequired) {
    requiredNode = (
      <span className="text-red-500 ml-1">*</span>
    );
  }

  return (
    /* eslint-disable jsx-a11y/label-has-for */
    <label
      id={`${htmlFor}-label`}
      className={buildClassList([style, className])}
      htmlFor={htmlFor}
      data-component="InputLabel"
    >
      {children}
      {label}
      {requiredNode}
      {helpTip && (
        <HelpTipButton
          page={helpTip.page}
          expanded={helpTip.expanded}
          dataTestID={`${name}HelpTip`}
          name={name}
          aria-label={helpTip.ariaLabel}
        />
      )}
    </label>
  );
}

InputLabel.propTypes = propTypes;
InputLabel.defaultProps = defaultProps;
