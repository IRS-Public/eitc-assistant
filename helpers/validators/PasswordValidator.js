/**
 * Checks that a password has these qualities
 *   • length is > 8 && < 20
 *   • has at least one uppercase letter
 *   • has at least one lowercase letter
 *   • has at least one number
 *   • has at least one special character
 * @param {string} input the value being tested
 * @returns {object} the validation object
 */
export default function PasswordValidator(input) {
  const parsed = {
    originalValue: input,
    isValid: false,
    errorMessage: '',
    shouldUseFormattedValue: false,
    formattedValue: input
  };
  const uppercaseTest = /[A-Z]/;
  const lowercaseTest = /[a-z]/;
  const numberTest = /[0-9]/;
  const specialCharTest = /[!@#$%^&*]/;

  if (typeof input === 'string' && input.length) {
    if (input.length > 20 || input.length < 8)  {
      parsed.errorMessage = 'Password must be 8 to 20 characters long';
    } else if (!lowercaseTest.test(input)) {
      parsed.errorMessage = 'Password must contain at least one lowercase letter';
    } else if (!uppercaseTest.test(input)) {
      parsed.errorMessage = 'Password must contain at least one uppercase letter';
    } else if (!numberTest.test(input)) {
      parsed.errorMessage = 'Password must contain at least one number';
    } else if (!specialCharTest.test(input)) {
      parsed.errorMessage = 'Password must contain at least one special character';
    } else {
      parsed.isValid = true;
    }
  }

  return parsed;
}
