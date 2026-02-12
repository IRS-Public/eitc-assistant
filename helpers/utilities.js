import announce from "./utilities/announce";
import buildClassList from "./utilities/buildClassList";
import setMaxHeightAndPosition from "./utilities/setMaxHeightAndPosition";
import { EmbedStyles, EmbeddedStylesContext } from "./utilities/embed-styles";
import stripTimeFromDate from "./utilities/stripTimeFromDate";
import formatNumber from "./utilities/formatNumber";
import uniqueIdForComponent from "./utilities/uniqueIdForComponent";

let index = 0;

/**
 * Provides utility functions for components in this library.
 *
 * All the functions on this class should be defined as static functions so this
 * class acts more like a namespace than a class that you create instances of.
 *
 * See each method's documentation for more infomation about what this class
 * provides.
 */
export default class Utilities {
  /**
   * Returns a unique identifier for the supplied component instance.
   *
   * This method should only be called from `componentDidMount`.
   *
   * This method attempts to re-use an existing unique ID (e.g. `data-reactid`)
   * as much as possible.  If no such unique ID exists, it will generate a
   * UUID to use for the component instance.
   *
   * @param {React.Component} component The React component to compute a unique
   *                                    identifier for.
   * @returns {String} A unique identifier for the supplied component.
   */
  static uniqueIdForComponent() {
    return `component-unique-id-${index++}`;
  }

  /**
   * Strips the time component out of dates.
   *
   * @param {Date} date The Date object.
   * @returns {Date} A copy of `date` reset to midnight.
   */
  static stripTimeFromDate(date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }

  /*
   * Copyright (c) 2017 Jed Watson.
   * Licensed under the MIT License (MIT), see
   * http://jedwatson.github.io/classnames
   *
   *
   * Function to conditionally join classNames together,
   * accepts a
   *  @param {String}
   *  @param {Object}
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
   */

  /**
   * [buildClassList description]
   * @param   {[type]} args [description]
   * @returns {[type]}      [description]
   */
  static buildClassList(...args) {
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

}
export {
  announce,
  buildClassList,
  setMaxHeightAndPosition,
  EmbedStyles,
  EmbeddedStylesContext,
  stripTimeFromDate,
  formatNumber,
  uniqueIdForComponent
};
