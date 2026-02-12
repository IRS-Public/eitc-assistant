import React, { Component } from "react";
import PropTypes from "prop-types";
import clsx from 'clsx'
import moment from "moment";
import styles from "./DateFieldRange.module.scss";
import DateField from '../DateField/DateField'
import HelpTipBody from '../HelpTip/HelpTipBody'
import HelpTipButton from '../HelpTip/HelpTipButton'

const propTypes = {
  id: PropTypes.string,
  toLabel: PropTypes.string,
  fromLabel: PropTypes.string,
  isValid: PropTypes.bool,
  required: PropTypes.bool,
  toHintText: PropTypes.string,
  fromHintText: PropTypes.string,
  toValue: PropTypes.string,
  fromValue: PropTypes.string,
  toPlaceholder: PropTypes.string,
  fromPlaceholder: PropTypes.string,
  minFromDate: PropTypes.object,
  maxFromDate: PropTypes.object,
  minToDate: PropTypes.object,
  maxToDate: PropTypes.object,
  disabledDates: PropTypes.array,
  fromErrorMessage: PropTypes.string,
  toErrorMessage: PropTypes.string,
  show: PropTypes.bool
};

const defaultProps = {
  id: "date",
  toLabel: "End Date",
  fromLabel: "Start Date",
  isValid: false,
  required: false,
  toHintText: "MM/DD/YYYY",
  fromHintText: "MM/DD/YYYY",
  toValue: "",
  fromValue: "",
  toPlaceholder: "",
  fromPlaceholder: "",
  minFromDate: moment("1900-01-01"),
  maxFromDate: moment("3000-01-01"),
  minToDate: moment("1900-01-01"),
  maxToDate: moment("3000-01-01"),
  disabledDates: [],
  fromErrorMessage: "",
  toErrorMessage: "",
  show: true
};

/**
 * DateFieldRange component consists of two DateField components that work in tangent to allow choosing
 * dates from the calendar picker based on min and max dates set.
 * @returns {node} rendered DOM node
 */
export default class DateFieldRange extends Component {
  /**
   * constructor
   * @param {object} props The props that will be applied to this component.
   */
  constructor(props) {
    super(props);

    this.state = {
      isValid: props.isValid,
      fromValue: "",
      toValue: "",
      fromErrorMessage: props.fromErrorMessage ? props.fromErrorMessage : "",
      toErrorMessage: props.toErrorMessage ? props.toErrorMessage : "",
      isOpen: false
    };

    this.toInput = React.createRef();
    this.fromInput = React.createRef();

  }

  // TODO: Clean up function and refactor duplicate code
  /**
   * Handles date change for each respective date field
   * @param {object} day - moment object - the day that was clicked
   * @param {string}  inputName -  input field  - unique name of input
   */
  handleDayChange = (day, inputName) => {
    const lowerCaseInputName = inputName.toLowerCase();

    // // input name should be either the to or from field name
    if (lowerCaseInputName.includes('from')) {
      this.setState({ fromValue: day }, () => {
        if (this.state.toValue !== "" && day.isBefore(this.state.toValue)) {
          if (this.state.fromErrorMessage) {
            this.setState({ fromErrorMessage: "" });
          }
          return;
        }
      });

      if (this.state.toValue !== "") {
        this.setState({ fromErrorMessage: "Error: The date must be before end date" });
      }
    } else if (lowerCaseInputName.includes('to')) {

      this.setState({ toValue: day }, () => {
        if (this.state.fromValue !== "" && day.isAfter(this.state.fromValue)) {
          if (this.state.toErrorMessage) {
            this.setState({ toErrorMessage: "" });
          }
          return;
        }
      });

      if (this.state.fromValue !== "") {
        this.setState({ toErrorMessage: "Error: The date must be after start date" });
      }

    }

  }

  /**
   * @returns {node}
   */
  render() {
    const {
      name,
      label,
      required,
      fromId,
      toId,
      toPlaceholder,
      fromPlaceholder,
      disabledDates,
      toLabel,
      fromLabel,
      dataTestId,
      helpTip,
    } = this.props;

    const DOMPurify = require('dompurify');
    const props = DOMPurify.sanitize(this.props);

    return (
      <div
        data-component="DateFieldRange"
        className={clsx(
          'mt-5',
          props.show ? 'block' : 'hidden'
        )}
      >
        <fieldset>
          <label data-testid={`${dataTestId}-label`} htmlFor={name} className="block">
            {label}{required && <span className="text-red-500 ml-1">*</span>}

            {helpTip && (
              <HelpTipButton
                page={helpTip.page}
                expanded={helpTip.expanded}
                dataTestID={`${dataTestId}-helpTip-button`}
                name={name}
                aria-label={helpTip.ariaLabel}
              />
            )}
          </label>

          {helpTip && (
            <HelpTipBody
              id={`${name}-helpTip`}
              tabIndex="0"
              expanded={helpTip.expanded}
              elements={helpTip.elements()}
              testID={`${dataTestId}-helpTip-body`}
            />
          )}

          <div>
            <div className={styles.DateFieldRangeContainer}>
              <DateField
                index={props.index}
                id={fromId}
                dateType="startDate"
                name={props.startDateName}
                placeholder={fromPlaceholder}
                label={fromLabel}
                disabledDates={disabledDates}
                lowerLimit={props.minFromDate}
                upperLimit={props.maxFromDate}
                handleDayChange={this.handleDayChange}
                onChange={this.handleInputChange}
                errorMessage={this.state.fromErrorMessage}
                ref={this.applyRef}
                required={props.required}
                range
                touchedfield={props.startDateTouched}
                focusedDate={props.focusedDate}
                langCode={props.langCode}
                hintText={props.fromHintText}
              />
            </div>

            <div className={styles.DateFieldRangeContainer}>
              <DateField
                index={props.index}
                id={toId}
                dateType="endDate"
                name={props.endDateName}
                placeholder={toPlaceholder}
                label={toLabel}
                disabledDates={disabledDates}
                lowerLimit={props.minToDate}
                upperLimit={props.maxToDate}
                onChange={this.handleInputChange}
                handleDayChange={this.handleDayChange}
                errorMessage={this.state.toErrorMessage}
                ref={this.toInput}
                required={props.required}
                range
                touchedfield={props.endDateTouched}
                focusedDate={props.focusedDate}
                langCode={props.langCode}
                hintText={props.toHintText}
              />
            </div>
          </div>
        </fieldset>
      </div>
    );
  }
}

DateFieldRange.propTypes = propTypes;
DateFieldRange.defaultProps = defaultProps;
