/**
 * buildClassList description
 * Copyright (c) 2017 Jed Watson.
 * Licensed under the MIT License (MIT), see
 * http://jedwatson.github.io/classnames
 *
 *
 * Function to conditionally join classNames together,
 * accepts a String or Object
 *
 * There are TWO (2) ways to call this function:
 * 1. Define a const
 * 2. Call the function inline
 *
 * USAGE EXAMPLE #1:
 * 'styles' => the imported CSS file
 * 'Utilities' => the imported Utilities helper class
 * <code>
 * const customClassName = buildClassList({
 *   [styles.customClassOne]: true,
 *   [styles.customClassTwo],
 *   [styles["custom-class"]]: computedKey,
 *   [styles.customClassThree]: this.state.sampleState === 'TEST'
 * });
 * </code>
 *
 * Set the key value to TRUE as this is a simple string className
 * <code>
 * [styles.customClassOne]: true
 * </code>
 *
 *
 * Short-hand way of adding a simple string className
 * <code>
 * [styles.customClassOne]
 * </code>
 *
 *
 * 1. If your key has a hyphen, you MUST wrap it in  bracket
 * 2. The value is set to a State or Prop, it will either be TRUE or FALSE, depending on what is returned
 * <code>
 * [styles["custom-class"]]: conditionalState
 * </code>
 *
 *
 * Similar to setting the value to a conditional State or Prop, you can set explicit conditions
 * <code>
 * [styles.customClassThree]: this.state.sampleState === 'TEST'
 * </code>
 *
 *
 * USAGE EXAMPLE #2:
 * In cases where you have a short list of classNames to combine,
 * you can simply call the function inline:
 * <code>
 * <div className={buildClassList([ styles.simpleStringClass, styles["test-string-class"] ])} ></div>
 * </code>
 *
 * @param  {object|array} args - classNames to be merged
 * @returns {string} - combined classNames
 */
export default function buildClassList(...args) {
  const hasOwn = {}.hasOwnProperty;
  const classes = [];
  // Verifies that argument is passed in
  for (let i = 0; i < args.length; i += 1) {
    const arg = args[i];
    if (!arg) {
      continue;
    }

    const argType = typeof arg;
    // Checks if passed in argument is 'string' vs 'number'
    if (argType === 'string' || argType === 'number') {
      classes.push(arg);
    }
    else if (Array.isArray(arg)) { // Checks if passed in argument is an array
      classes.push(...arg);
    }
    else if (argType === 'object') { // Checks if passed in argument is an object
      for (const key in arg) {
        if (hasOwn.call(arg, key) && arg[key]) {
          classes.push(key);
        }
      }
    }
  }
  return classes.join(' ');
}
