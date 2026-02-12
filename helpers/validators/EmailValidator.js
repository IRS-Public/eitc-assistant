/**
 * Passes if input matches *@*.*
 * @param {string} input User-entered value
 * @returns {object}
 */
export default function EmailValidator(input) {
  const parsed = {
    isValid: false,
    errorMessage: 'Invalid email address',
    shouldUseFormattedValue: false
  };

  const pattern = /.+@.+\../;

  if (pattern.test(input)) {
    parsed.isValid = true;
  }

  return parsed;
}
