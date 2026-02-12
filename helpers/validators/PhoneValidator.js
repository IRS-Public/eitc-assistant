
/*
* Returns TRUE/FALSE and an error message.
*
* This method should only be passed in to the `validator` prop.
*
* This method passes in the field value, and requires that the passed in value
* contains ONLY numbers, and using the regex pattern, verifies that the value
* meets the various Phone Number formats:
*   1. Simple TEN (10) digits
*   2. or THREE (3) + THREE (3) + FOUR (4) digits, verifies that the leading
*      digit is not equal to `0` (optional, set `shouldUseFormattedValue` to `true`)
*   3. or 11 digits, and verifying that the leading digit equals `1`
*
*
* EXAMPLE USAGE:
* <code>
*  <TextField
*   label={label}
*   id={id}
*   validator={PhoneValidator}
*   type="tel"
*   />
* </code>
*
* @returns {Bool} True/False
* @returns {String} Returns the `error message`
*
*
*
* parsed = {
*   isValid: false,
*   error: 'Invalid area code',
*   formatted: '(100) 223-2321'
* }
*/

/**
 * [PhoneValidator description]
 * @param {string} input - input value
 * @param {boolean} shouldUseFormattedValue - for TextField
 * @constructor
 */
export default function PhoneValidator(input, shouldUseFormattedValue = true) {
  const parsed = {
    shouldUseFormattedValue,
    originalValue: input,
    isValid: false,
    formattedValue: null,
    value: '',
    cleanedValue: '',
    areaCode: null,
    part1: null,
    part2: null,
    invalidChar: false,
    isBlank: false,
    badAreaCode: null,
    badExchangeCode: null,
    wrongCount: false,
    errorMessage: ''
  };
  const number = /[0-9]/;
  const separator = /[.,/#!$%^&*;:{}=\-–—_`~()\s+]/;
  const phoneFormat = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

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

    // 11 digits must be 1 + area code + 3 + 4
    // leading 1 is stripped out
    if (parsed.value.length === 11 && parsed.value[0] === '1') {
      parsed.value = parsed.value.substring(1);
    }

    if (parsed.value.length !== 10) {
      parsed.wrongCount = true;
    }

    // 10 digits must be area code + 3 + 4
    // Area code can't start with a 0 or 1
    if (parsed.value.length === 10 && parseInt(parsed.value[0], 10) > 1) {
      parsed.badAreaCode = false;
    } else if (parsed.value.length === 10) {
      parsed.badAreaCode = true;
    }

    // Change code can't start with a 0 or 1
    if (parsed.value.length === 10 && parseInt(parsed.value[3], 10) > 1) {
      parsed.badExchangeCode = false;
    } else {
      parsed.badExchangeCode = true;
    }
  } else {
    parsed.isBlank = true;
  }

  if (!parsed.isBlank && !parsed.wrongCount && !parsed.badAreaCode && !parsed.badExchangeCode) {
    parsed.isValid = true;
  }

  if (parsed.isValid || parsed.badAreaCode || parsed.badExchangeCode) {
    parsed.formattedValue = parsed.value.replace(phoneFormat, '($1) $2-$3');
    parsed.areaCode = parsed.value.replace(phoneFormat, '$1');
    parsed.part1 = parsed.value.replace(phoneFormat, '$2');
    parsed.part2 = parsed.value.replace(phoneFormat, '$3');
  }

  if (parsed.invalidChar) {
    parsed.errorMessage = 'Phone numbers should be only numbers';
  } else if (parsed.badAreaCode && !parsed.wrongCount) {
    parsed.errorMessage = 'Invalid U.S. area code';
  } else if (parsed.badExchangeCode && !parsed.wrongCount) {
    parsed.errorMessage = 'Invalid U.S. exchange code';
  } else {
    parsed.errorMessage = 'Invalid U.S. phone number';
  }

  return parsed;
}
