import React from "react";
import PropTypes from "prop-types";
import clsx from 'clsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import styles from "./DateField.module.scss";
import moment from 'moment';
import 'moment/locale/es'
import buildClassList from "../../helpers/utilities/buildClassList";
import getCalendarMonthWeeks from "./utils/getCalendarMonthWeeks";
import CalendarDay from "./CalendarDay";
import { DATE_DISPLAY_FORMAT } from "../../helpers/constants";
import {
  AngleRightCalendarIcon,
  AngleLeftCalendarIcon
} from "../Icons";

const propTypes = {
  focusedDate: PropTypes.object,
  top: PropTypes.number,
  left: PropTypes.number,
  width: PropTypes.number,
  closeModal: PropTypes.func,
  onDayClick: PropTypes.func,
  incrementMonth: PropTypes.func.isRequired,
  decrementMonth: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func.isRequired,
  isMobile: PropTypes.bool,
  upperLimit: PropTypes.object,
  lowerLimit: PropTypes.object,
  disabledDates: PropTypes.array
};

/**
 * The modal containing the title, control buttons and calendar grid
 */
export default class CalendarGrid extends React.Component {

  state = {
    numberOfWeeks: 0
  };

   DOMPurify = require('dompurify');
   props = DOMPurify.sanitize(propTypes);

  /**
   * Checks to see if the moment object passed is the same day as the moment
   * object stored in state
   * @param  {object}  day - moment object
   * @returns {Boolean} - true if the two moment objects have the same day, month and year
   */
  isFocusedDate(day) {
    if (day) {
      return day.isSame(props.focusedDate, "day");
    } else {
      return false;
    }
  }

  /**
   * Get preceding month from the current month
   * @returns {string} - formatted string with month and year ex. May 2019
   */
  getPreviousMonth = () => {
    const currentMonth = props.focusedDate.clone();
    return currentMonth.subtract(1, 'M').locale(props.langCode).format('MMMM YYYY');
  };

  /**
   * Get the month following the current month
   * @returns {string} - formatted string with month and year ex. May 2019
   */
  getNextMonth = () => {
    const currentMonth = props.focusedDate.clone();
    return currentMonth.add(1, 'M').locale(props.langCode).format('MMMM YYYY');
  };

  /**
   * Get current calendar month and year
   * @returns {string} - formatted string with month and year ex. May 2019
   */
  getCalendarDate = () => {
    const currentMonth = props.focusedDate.clone();

    return currentMonth.locale(props.langCode).format('MMMM YYYY');
  };


  /**
   * Check if current day is disabled
   * @param {moment} currentDay - current day moment object
   * @returns {boolean}
   */
  isDisabled = (currentDay) => {
    const { disabledDates, lowerLimit, upperLimit } = props;
    if (currentDay) {
      const currentDateString = currentDay.format(DATE_DISPLAY_FORMAT).toString();

      if (disabledDates.length > 0) {
        for (const day of disabledDates) {
          if (moment(day).format(DATE_DISPLAY_FORMAT) === currentDateString) {
            return true;
          }
        }
      }

      if (currentDay.isBefore(lowerLimit) || currentDay.isAfter(upperLimit)) {
        return true;
      }
    }
    return false;
  };

  /**
   * Render modal contents
   * @returns {node} - rendered DOM node
   */
  render() {
    const {
      onDayClick,
      top,
      left,
      focusedDate,
      onKeyDown,
      decrementMonth,
      incrementMonth,
      isMobile
    } = props;

    let style = {};
    if (top > 0 || left > 0) {
      style = {
        top: top,
        left: left
      };
    }


    const weeks = getCalendarMonthWeeks(focusedDate);

    const modalStyles = buildClassList({
      [styles.calendarModal]: true,
      [styles.calendarModalLg]: weeks.length > 5 && !isMobile
    });

    /* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
    return (
      <div
        className={clsx(
          'bg-white',
          modalStyles
        )}
        style={style}
        role="dialog"
        onKeyDown={onKeyDown}
        aria-modal="true"
      >
        {isMobile && (
          <button
            aria-label="Close"
            onClick={props.closeModal}
            className={clsx(
              styles.closeButton
            )}
          >
            <FontAwesomeIcon
              icon={faTimes}
              fill={'#000000'}
              className={clsx(
                'text-blue-500',
              )}
            />
          </button>
        )}

        <div className={styles.gridTitle}>
          <button
            className={styles.gridTitlePreviousMonthButton}
            onClick={decrementMonth}
            aria-label={`Previous month, ${this.getPreviousMonth()}`}
            data-testid="backArrow"
          >
            <AngleLeftCalendarIcon
              unstyled
              height="19px"
              width="11px"
              focusable={false}
            />
          </button>

          <h1 className={styles.gridTitleMonth} data-testid="month">
            {this.getCalendarDate()}
          </h1>

          <button
            className={styles.gridTitleNextMonthButton}
            onClick={incrementMonth}
            aria-label={`Next Month, ${this.getNextMonth()}`}
            data-testid="forwardArrow"
          >
            <span className={styles.gridTitleIcon}>
              <AngleRightCalendarIcon
                unstyled
                height="19px"
                width="11px"
                focusable={false}
              />
            </span>
          </button>
        </div>
        <table
          className={styles.calendarMonthGrid}
          aria-label="calendar"
          role="application"
        >
          <thead>
            <tr role="presentation" data-testid="week">
              <th><span aria-hidden="true">S</span></th>
              <th><span aria-hidden="true">M</span></th>
              <th><span aria-hidden="true">T</span></th>
              <th><span aria-hidden="true">W</span></th>
              <th><span aria-hidden="true">T</span></th>
              <th><span aria-hidden="true">F</span></th>
              <th><span aria-hidden="true">S</span></th>
            </tr>
          </thead>
          <tbody data-testid="days">
            {weeks && weeks.length > 0 ? weeks.map((week, i) => (
              <tr key={i} role="presentation">
                {week.map((day, index) => {
                  const isFocused = this.isFocusedDate(day);
                  const isDisabled = this.isDisabled(day);
                  return (
                    <CalendarDay
                      key={index}
                      day={day}
                      isFocused={isFocused}
                      onDayClick={onDayClick}
                      tabIndex={isFocused ? "0" : "-1"}
                      isDisabled={isDisabled}
                    />
                  );
                })}
              </tr>
            )) : null}
          </tbody>
        </table>
      </div>
    );
  }
}

CalendarGrid.propTypes = propTypes;
