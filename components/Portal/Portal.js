import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

/**
 * Portal component that is just a wrapper for the react implementation that uses the app root as the
 * root component
 * @extends Component
 */
export default class Portal extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    root: PropTypes.string,
    tag: PropTypes.string
  };

  static defaultProps = {
    root: "__next",
    tag: "div"
  };

  /**
   * [constructor description]
   * @param {[type]} props [description]
   */
  constructor(props) {
    super(props);
    this.appRoot = document.getElementById(props.root);
    this.el = document.createElement(props.tag);
  }


  /**
   * [componentDidMount description]
   */
  componentDidMount() {
    this.appRoot.appendChild(this.el);
  }

  /**
   * [componentDidMount description]
   */
  componentWillUnmount() {
    this.appRoot.removeChild(this.el);
  }

  /**
   * [render description]
   * @returns {[type]} [description]
   */
  render() {
    const DOMPurify = require('dompurify');
    const props = DOMPurify.sanitize(this.props);

    return ReactDOM.createPortal(
      props.children,
      this.el,
    );
  }
}
