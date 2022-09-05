import React from "react";
import { OverlayTrigger, Tooltip as BSTooltip } from "react-bootstrap";

const Tooltip = ({ text = "tooltip", placement = "right", children }) => {
  const renderTooltip = (props) => <BSTooltip {...props}>{text}</BSTooltip>;
  return (
    <OverlayTrigger
      placement={placement}
      delay={{ show: 250, hide: 400 }}
      overlay={renderTooltip}
    >
      {children}
    </OverlayTrigger>
  );
};

export default Tooltip;
