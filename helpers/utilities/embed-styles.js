
import React from "react";
import PropTypes from "prop-types";
import hoistStatics from "hoist-non-react-statics";
import { canUseDOM } from "fbjs/lib/ExecutionEnvironment";

/**
 * Creates a higher-order-component that automatically inserts any required
 * stylesheets into the DOM at either server-side or client-side render time.
 *
 * This function returns another function that then takes the target component.
 *
 * Usage (Stateful Components):
 * import { EmbedStyles } from "ols-ui/utilities";
 * import styles from "./styles.scss";
 * class MyStatefulComponent extends React.Component { ... }
 * export default EmbedStyles(styles)(MyStatefulComponent);
 *
 * Usage (Stateless Components):
 * import { EmbedStyles } from "ols-ui/utilities";
 * import styles from "./styles.scss";
 * function MyStatelessComponent(props) { ... }
 * export default EmbedStyles(styles)(MyStatelessComponent);
 *
 * @param {object} styles One or more style objects from using `import` on a stylesheet.
 * @returns {React.Component}
 */
export function EmbedStyles(...styles)
{
  return function EmbedStylesInComponent(WrappedComponent)
  {
    /**
     * A class that provides a simple wrapper around the supplied component that
     * hooks into React's lifecycle methods to insert the required styles into
     * the DOM when this component renders.
     *
     * This class assumes that `isomorphic-style-loader` is available and that
     * server-side templates use {@link EmbeddedStylesContext} as the top-most
     * component to capture and insert the styles.
     */
    class ComponentWithEmbeddedStyles extends React.Component
    {
      /**
       * Determines if we're rendering server-side or client-side. If client-side,
       * then we append our styles to the DOM. If server-side, we pass our styles
       * to the function that is watching for critical styles.
       *
       * @param {object} styles The styles to process.
       * @returns {Array}
       */
      processStyles(styles) {
        const referencedStyles = [];
        styles.forEach((style) => {
          if (canUseDOM && typeof style._insertCss === "function") {
            referencedStyles.push(style._insertCss());
          }
          if (this.context && this.context.insertCss) {
            this.context.insertCss(style);
          }
        });
        return referencedStyles;
      }

      /**
       * React lifecycle method that gets called just before a component mounts
       * in the DOM.
       *
       * Since `componentWillMount` gets called during both server-side and
       * client-side render paths, this is the perfect place to capture and handle
       * stylesheet dependencies.
       */
      componentWillMount() {
        this.__styleRemovers = this.processStyles(styles);
      }

      /**
       * React lifecycle method that gets called just before a component unmounts
       * from the DOM.
       *
       * Ideally, we would clean up after ourselves when we unmount, but this was
       * causing bugs where styles would disappear when they shouldn't have so
       * this method remains commented out for now.
       */
      componentWillUnmount() {
        // setTimeout(() => {
        //   this.__styleRemovers.forEach((styleRemover) => {
        //     if (typeof styleRemover === "function") {
        //       styleRemover();
        //     }
        //   });
        // }, 0);
      }

      /**
       * Renders our child component directly with our passed in props.
       * @returns {Node}
       */
      render() {
        return (<WrappedComponent {...this.props} />);
      }
    }

    const displayName = WrappedComponent.displayName || WrappedComponent.name || "Component";
    ComponentWithEmbeddedStyles.displayName = `${displayName}WithEmbeddedStyles`;
    // Enables React's context ability. This is used to give us access to the `insertCss`
    // function without needing it passed down as a prop to each and every component
    // in our hierarchy. The `insertCss` function is defined by `EmbeddedStylesContext`.
    // Setting this value gives us access to it.
    ComponentWithEmbeddedStyles.contextTypes = {
      insertCss: PropTypes.func
    };
    ComponentWithEmbeddedStyles.WrappedComponent = WrappedComponent;
    // Copy any static methods/properties defined on our wrapped component and
    // set them on ourself so they're accessible.
    return hoistStatics(ComponentWithEmbeddedStyles, WrappedComponent);
  };
}

/**
 * A high-order component that captures critical CSS marked as dependencies by
 * wrapping components using {@link EmbedStyles}.
 *
 * This component is designed for use only in server-side rendering and should
 * be used in the context of an Express request handler. See the Usage below
 * for some sample code.
 *
 * This class provides the `insertCss` context value that {@link EmbedStyles}
 * uses to notify us about critical CSS when doing server-side rendering.
 *
 * This class assumes that `isomorphic-style-loader` is available and is added
 * to the webpack loader stack for any stylesheets (css, scss, sass, less, etc.).
 *
 * Usage:
 * <code>
 *   const css = new Set(); // CSS for all rendered React components
 *   // Render the component.
 *   const context = {};
 *   const content = ReactDOMServer.renderToString(
 *     <EmbeddedStylesContext onInsertCss={(style) => { css.add(style); }}>
 *       <Provider store={store}>
 *         <StaticRouter location={request.url} context={context}>
 *           <MyApp/>
 *         </StaticRouter>
 *       </Provider>
 *     </EmbeddedStylesContext>
 *   );
 *   // Collect the rendered styles for insertion into our template.
 *   const styles = [ ...css ].join("");
 *   // Render the template.
 *   const output = renderTemplate(styles, content, ...);
 *   // Send the response.
 *   response.send(output);
 * </code>
 */
export class EmbeddedStylesContext extends React.Component
{
  static propTypes = {
    onInsertCss: PropTypes.func.isRequired,
    children: PropTypes.node
  };

  static childContextTypes = {
    insertCss: PropTypes.func.isRequired
  };

  /**
   * The function that is made available child components using React's context
   * ability.
   *
   * This method will take any styles that we are told about by sub-components
   * and notify our own delegate, passing the raw CSS as an argument.
   *
   * @param {object} styles One or more style objects from using `import` on a stylesheet.
   */
  notifyOnCssInsertion(...styles)
  {
    styles.forEach((style) => {
      this.props.onInsertCss(style._getCss());
    });
  }

  /**
   * React method that sets the context for child components. This is how
   * `EmbedStyles` has access to the `insertCss` function.
   *
   * @returns {object}
   */
  getChildContext()
  {
    return { insertCss: this.notifyOnCssInsertion.bind(this) };
  }

  /**
   * Renders our child element without any additional markup.
   *
   * @returns {Node}
   */
  render()
  {
    return React.Children.only(this.props.children);
  }
}
