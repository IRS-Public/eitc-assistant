import moment from "moment";
import { DATE_DISPLAY_FORMAT } from "../constants";


/**
 * Tests a string to see if it's a date formatted as MM-DD-YYYY
 * Ignores punctuation and spaces.
 *
 *  Returns an object with these properties:
 *  isValid : Bool -- true if is valid
 *  originalValue: the input as the user supplied it
 *  moment: The input as a moment object
 *  formattedValue: the value as MMMM D, YYYY
 *  errorMessage: the error message to display to the user
 *  shouldUseFormattedValue: Bool -- if true, indicates the original field value should be replaced with parsed.formattedValue
 *
 * @param  {string} input the value to test. Usually the value of an input
 * @param  {string} upperLimit Date the input must be before
 * @param  {string} lowerLimit Date the input must be after
 * @param  {boolean} shouldUseFormattedValue if the value should be reformatted (used by TextField)
 * @param {array} disabledDates disabled dates for date field
 * @returns {object}       returns an object
 */
export default function DateValidator(
  input,
  upperLimit,
  lowerLimit = moment("1900-01-01"),
  shouldUseFormattedValue = true,
  disabledDates,
) {
  const parsed = {
    isValid: false,
    originalValue: input,
    moment: null,
    formattedValue: null,
    errorMessage: "",
    shouldUseFormattedValue
  };

  const validUpperLimit = moment.isMoment(upperLimit) && upperLimit.isValid();
  // Make sure lowerLimit is a valid moment object and reset to default if not
  if (!moment.isMoment(lowerLimit) && !lowerLimit.isValid()) {
    lowerLimit = moment("1900-01-01");
  }

  // Check if input is a string and not empty
  if (typeof input === "string" && input.length > 0) {
    parsed.moment = moment(input, [
      DATE_DISPLAY_FORMAT
    ], true);
 
    // Check if it's a date
    if (parsed.moment.isValid()) {
      // check if there are any disabled dates
      if (disabledDates.length > 0) {

        // format valid moment object
        parsed.formattedValue = parsed.moment.format(DATE_DISPLAY_FORMAT);
        // iterate through disabled dates and return if invalid date set in field
        for (const disabledDate of disabledDates) {
          const convertedDateString = _convertDateToFormatString(disabledDate);
          if (parsed.formattedValue === convertedDateString) {
            parsed.errorMessage = "Error: Date can not be set because it is not available";
            parsed.isValid = false;
            return parsed;
          }
        }
      }

      // Check if date is in range
      if (parsed.moment.isAfter(lowerLimit)) {
        if (validUpperLimit && parsed.moment.isBefore(upperLimit)
        ) {
          // Date is less than the supplied upper limit
          parsed.isValid = true;
        } else if (validUpperLimit && !parsed.moment.isBefore(upperLimit)) {
          // Upper limit and date is not before upper limit, so not valid
          parsed.isValid = false;
          parsed.formattedValue = parsed.moment.format(DATE_DISPLAY_FORMAT);
          parsed.errorMessage = `Error: Date must be between ${lowerLimit.format(
            DATE_DISPLAY_FORMAT
          )} and ${upperLimit.format(DATE_DISPLAY_FORMAT)}`;
        } else {
          // No upper limit and date is after lower limit, so is valid
          parsed.isValid = true;
        }
        parsed.formattedValue = parsed.moment.format(DATE_DISPLAY_FORMAT);

      } else {
        // Date is out of range
        parsed.isValid = false;

        parsed.formattedValue = parsed.moment.format(DATE_DISPLAY_FORMAT);
        
        if (validUpperLimit) {
          parsed.errorMessage = `Error: Date must be between ${lowerLimit.format(
            DATE_DISPLAY_FORMAT
          )} and ${upperLimit.format(DATE_DISPLAY_FORMAT)}`;
        } else {
          parsed.errorMessage = `Error: Date must be after ${lowerLimit.format(
            DATE_DISPLAY_FORMAT
          )}`;
        }
      }
    } else {
      // const invalidMomentUnits = [ 'years', 'months', 'days' ]; used to determine which part of parsed date parts has been used
      const invalidIndex = parsed.moment.invalidAt();
      const parsedDateParts = parsed.moment.parsingFlags().parsedDateParts;
      let monthNumberValue;
      
      // if length of input is less than 
      if (input.length < DATE_DISPLAY_FORMAT.length) {
        switch (invalidIndex) {
          case 0: {
            const yearValue = parsedDateParts[0];
            parsed.errorMessage = `Error: ${yearValue} is not a valid year`;
            break;
          }
          case 1: {
            monthNumberValue = parsedDateParts[1] + 1;
            parsed.errorMessage = `Error: ${monthNumberValue} is not a valid month`;
            break;
          }
          case 2: {
            monthNumberValue = parsedDateParts[1];
            const monthStringValue = moment.months()[monthNumberValue];
            const day = parsedDateParts[2];
            parsed.errorMessage = `Error: ${day} is not a valid day in ${monthStringValue}`;
            break;
          }
          default: 
            parsed.errorMessage = `Error: Date must follow ${DATE_DISPLAY_FORMAT} format`;
            break;
        }
      } else {
        const invalidIndex = parsed.moment.invalidAt();
        const parsedDateParts = parsed.moment.parsingFlags().parsedDateParts;
        let monthNumberValue;

        switch (invalidIndex) {
          case 0: {
            const yearValue = parsedDateParts[0];
            parsed.errorMessage = `Error: ${yearValue} is not a valid year`;
            break;
          }
          case 1: {
            monthNumberValue = parsedDateParts[1] + 1;
            parsed.errorMessage = `Error: ${monthNumberValue} is not a valid month`;
            break;
          }
          case 2: {
            monthNumberValue = parsedDateParts[1];
            const monthStringValue = moment.months()[monthNumberValue];
            const day = parsedDateParts[2];
            parsed.errorMessage = `Error: ${day} is not a valid day in ${monthStringValue}`;
            break;
          }
          default: 
            parsed.errorMessage = `Error: ${input} is not a valid date`;
            break;
        }
      }
    }
  } else {
    parsed.errorMessage = "Enter a date";
  }

  return parsed;
}

/**
 * Converts date string to specified format
 * @param {string} date - date string 
 * @param {string} format - format to be converted to
 * @returns {string} formatted date string
 */
const _convertDateToFormatString = (date, format = DATE_DISPLAY_FORMAT) => moment(date).format(format);
