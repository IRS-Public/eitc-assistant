import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import styles from './DateField.module.scss';

const propTypes = {
  isFocused: PropTypes.bool.isRequired,
  day: PropTypes.object,
  onDayClick: PropTypes.func,
  tabIndex: PropTypes.string,
  isDisabled: PropTypes.bool
};

const defaultProps = {
  day: moment(),
  onDayClick: () => { },
  tabIndex: '-1',
  isDisabled: false
};

/**
 * Called by Calendar.js. Renders a table cell containing a button representing
 * one day in the calendar grid.
 * @returns {Node} Rendered DOM node
 */
export default class CalendarDay extends React.Component {
  /**
   * Sets focus to the day if isFocused. setTimeout is used to prevent focus
   * being set too quickly and lost back to the open/close calendar button.
   * Calendar.js determines focus because it contains the keyboard shortcut events.
   */
  componentDidMount() {
    const { isFocused } = this.props;
    if (isFocused) {
      // setTimeout is added here to prevent the focus being called too early —
      // without it the focus usually remains on the calendar open/close button
      setTimeout(() => {
        this.buttonRef.focus();
      }, 0);
    }
  }

  /**
   * Same as componentDidMount. setTimeout is not needed once the calendar is open
   */
  componentDidUpdate() {
    const { isFocused } = this.props;
    if (isFocused) {
      this.buttonRef.focus();
    }
  }

  /**
   * [onDayClick description]
   * @param  {object} day - moment object
   * @param  {event} e  - click event
   */
  onDayClick(day, e) {
    const { onDayClick } = this.props;
    onDayClick(day, e);
  }

  /**
   * Render
   * @returns {Node} Rendered DOM node
   */
  render() {
    const { day, tabIndex, isDisabled } = this.props;

    return (
      <td>
        {day ? (
          <button
            ref={(ref) => {
              this.buttonRef = ref;
            }}
            className={styles.calendarDayButton}
            type="button"
            tabIndex={tabIndex}
            aria-label={isDisabled ? `Not Available. ${day.format('dddd, MMMM D, YYYY')}` : day.format('dddd, MMMM D, YYYY')}
            onClick={(e) => {
              if (!isDisabled) this.onDayClick(day, e);
            }}
            aria-disabled={isDisabled}
          >
            {day.date()}
          </button>
        ) : null}
      </td>
    );
  }
}

CalendarDay.propTypes = propTypes;
CalendarDay.defaultProps = defaultProps;
