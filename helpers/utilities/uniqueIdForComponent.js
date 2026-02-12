let index = 0;

/**
 * Returns a unique identifier for the supplied component instance.
 *
 * This method should only be called from `componentDidMount`.
 *
 * @returns {String} A unique identifier for the supplied component.
 */
export default function uniqueIdForComponent() {
  return `component-unique-id-${index++}`;
}
