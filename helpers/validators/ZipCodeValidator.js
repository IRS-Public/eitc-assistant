
/*
* Returns TRUE/FALSE and an error message.
*
* This method should only be passed in to the `validator` prop.
*
* This method passes in the field value, and verifies the value against
* the regex pattern to meet the ZIP Code formats:
*   1. Simple FIVE (5) digits
*   2. or FIVE (5) + FOUR (4) digits (optional, set `shouldUseFormattedValue` to `true`)
*
* EXAMPLE USAGE:
* <code>
*    <TextField
*      label={label}
*      id={id}
*      validator={ZipCodeValidator}
*    />
*  </code>
*
*/

/**
 * [ZipCodeValidator description]
 * @param {string} value - input value
 * @returns {object} - the parsed object
 */
export default function ZipCodeValidator(value) {
  const parsed = {
    isValid: false,
    errorMessage: 'Invalid ZIP Code',
    shouldUseFormattedValue: false,
    originalValue: value
  };

  const pattern = /^\b\d{5}(-\d{4})?\b$/;

  if (pattern.test(value)) {
    parsed.isValid = true;
  }

  return parsed;
}
