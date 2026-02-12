/**
 * Tests a string to see if it's an 9-digit number
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
 * @returns {object}       returns an object
 */
export default function SSNValidator(input) {
  const parsed = {
    isValid: false,
    errorMessage: '',
    shouldUseFormattedValue: true,
    formattedValue: null,
    originalValue: input,
    value: '',
    cleanedValue: '',
    codepart1: null,
    codepart2: null,
    codepart3: null,
    invalidChar: false
  };

  const codeFormat = /^([0-9]{3})[- ]?([0-9]{2})[- ]?([0-9]{4})$/;
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

    if (parsed.value.length === 9 && !parsed.invalidChar) {
      parsed.isValid = true;
      parsed.formattedValue = parsed.value.replace(codeFormat, '$1-$2-$3');
      parsed.codepart1 = parsed.value.replace(codeFormat, '$1');
      parsed.codepart2 = parsed.value.replace(codeFormat, '$2');
      parsed.codepart3 = parsed.value.replace(codeFormat, '$3');
    }
  }

  if (parsed.invalidChar) {
    parsed.errorMessage = 'Your Social Security Number should only contain numbers';
  } else if (parsed.value.length !== 9) {
    parsed.errorMessage = 'Your Social Security Number should be 9 numbers';
  } else {
    parsed.errorMessage = 'Invalid Social Security Number';
  }

  return parsed;
}
