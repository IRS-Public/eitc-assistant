/**
 * Tests a string to see if it's an 8-digit number
 * Ignores hyphens and spaces.
 *
 *  Returns an object with these properties:
 *  originalValue: the input as the user supplied it
 *  value: the parsed input (no spaces, hyphens or other chars)
 *  cleanedValue: the input as the user typed it up to the first offending char
 *  formatted: the value with separating hyphen
 *  codepart1: the first 4 digits
 *  codepart2: the last 4 digits
 *  isValid : Bool -- true if is valid
 *  invalidChar: Bool -- true if input contained a non-number, hyphen or space
 *  isBlank: Bool -- true if input was empty or not a string
 *  wrongCount: Bool -- true is more or fewer than 8 numbers were provided
 *
 * @param  {string} input the value to test. Usually the value of an input
 * @param  {boolean} shouldUseFormattedValue if the value should be reformatted (used by TextField)
 * @returns {object}       returns an object
 */
export default function ConfirmationCodeValidator(input, shouldUseFormattedValue = true) {
  const parsed = {
    isValid: false,
    errorMessage: '',
    shouldUseFormattedValue,
    formattedValue: null,
    originalValue: input,
    value: '',
    cleanedValue: '',
    codepart1: null,
    codepart2: null,
    invalidChar: false
  };

  const codeFormat = /^([0-9]{4})[- ]?([0-9]{4})$/;
  const number = /[0-9]/;
  const separator = /[.,/#!$%^&*;:{}=\-–—_`~()\s]/;

  // Check if input is a string and not empty
  if (typeof input === 'string' && input.length) {
    // Loop over input text and check if each char is a digit or separator
    for (let i = 0; i < input.length; i += 1) {
      if (number.test(input[i])) {
        parsed.value += input[i];
        parsed.cleanedValue += input[i];
      } else if (separator.test(input[i])) {
        parsed.cleanedValue += input[i];
      } else {
        // char is an illegal character so stop checking
        parsed.invalidChar = true;
        break;
      }
    }

    if (parsed.value.length === 8 && !parsed.invalidChar) {
      parsed.isValid = true;
      parsed.formattedValue = parsed.value.replace(codeFormat, '$1-$2');
      parsed.codepart1 = parsed.value.replace(codeFormat, '$1');
      parsed.codepart2 = parsed.value.replace(codeFormat, '$2');
    }
  }

  if (parsed.invalidChar) {
    parsed.errorMessage = 'Confirmation code is only numbers';
  } else if (parsed.value.length < 8) {
    parsed.errorMessage = 'Code is too short. Enter 8 numbers';
  } else if (parsed.value.length > 8) {
    parsed.errorMessage = 'Code is too long. Enter 8 numbers';
  } else {
    parsed.errorMessage = 'Invalid confirmation code';
  }

  return parsed;
}
