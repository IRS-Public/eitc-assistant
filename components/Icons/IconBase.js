import { default as React } from "react";
import PropTypes from "prop-types";

/**
 * Base element for all other icons.
 * Adapted from react-icon-base by Goran Gajić
 * MIT License
 * https://github.com/gorangajic/react-icon-base
 *
 * @returns {Node} rendered svg element
 * @param {object} theProps - props
 * @param {Object} reactIconBase [description]
 */
const IconBase = (theProps, { reactIconBase = {} }) => {
  const {
    children,
    color,
    size,
    style,
    width,
    height,
    unstyled,
    focusable,
    ...props
  } = theProps;
  const computedSize = size || reactIconBase.size || "1em";
  return (
    <svg
      fill="currentColor"
      preserveAspectRatio="xMidYMid meet"
      focusable={focusable}
      height={height || computedSize}
      width={width || computedSize}
      {...reactIconBase}
      {...props}
      style={
        unstyled
          ? null
          : {
            verticalAlign: "baseline",
            position: "relative",
            // top: "0.2em",
            color: color || reactIconBase.color,
            ...(reactIconBase.style || {}),
            ...style
          }
      }
    >
      {children}
    </svg>
  );
};

IconBase.propTypes = {
  color: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  style: PropTypes.object,
  focusable: PropTypes.bool,
  unstyled: PropTypes.bool
};

IconBase.defaultProps = {
  focusable: true,
  unstyled: false
};

IconBase.contextTypes = {
  reactIconBase: PropTypes.shape(IconBase.propTypes)
};

export default IconBase;
