#Validator format

Validators should take in a string (input) and return an object that contains these keys:

* `isValid`: bool -   if the input value passed validation or not
* `errorMessage`: string - if validation fails, the error message to be displayed to the user.
* `shouldUseFormattedValue`: bool —   if true, input should be replaced with the `formatted` value
* `formattedValue`: string – the input value reformatted in a preferred way. i.e. user value
                    of 202.650.2600 might have a formatted value (202) 650-2600
* `showSuccess`: bool - if set to true, the input will get the success state (green border) onBlur if isValid is true

Example:

function AValidator(input) {
  const parsed = {};

  if (input === 'a' || input === 'A') {
    parsed.isValid = true;
    parsed.shouldUseFormattedValue = true;
    parsed.formattedValue = input.toUppercase();
  } else {
    parsed.isValid = false;
    parsed.errorMessage: 'That is not an A',
  }

  return parsed;
}
