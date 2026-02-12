import React from 'react';
import PropTypes from "prop-types";
import { buildClassList } from '../../helpers/utilities';
import styles from './InputLabel.module.scss';

const propTypes = {
  label: PropTypes.node.isRequired,
  htmlFor: PropTypes.string.isRequired,
  className: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  children: PropTypes.node
};

const defaultProps = {
  required: false,
  disabled: false
};

/**
 * Label for form fields
 * @returns {node} the rendered DOM node
 * @param {object} props - the props
 * @param {string} label required - text for the input's label
 * @param {string} htmlFor required - sets the <label for... attribute
 * @param {bool} required defaults to false. Adds required label
 */
export default function InputLabel(props) {
  const { label, htmlFor, className, required, disabled, children } = props;
  const style = buildClassList({
    [styles.label]: true,
    [styles.required]: required,
    [styles.disabled]: disabled
  });

  let requiredNode = null;
  if (required) {
    requiredNode = (
      <span className={styles.required}>*</span>
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
    </label>
  );
}

InputLabel.propTypes = propTypes;
InputLabel.defaultProps = defaultProps;
