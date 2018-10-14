import React from "react";

const FloatingButton = ({ handleClick, tooltip, icon }) => (
  <button
    className="btn btn-float animated flipInX"
    data-toggle="tooltip"
    data-placement="top"
    data-offset="0, 5"
    title={tooltip}
    type="button"
    onClick={handleClick}
  >
    <i className="material-icons">{icon}</i>
  </button>
);

export default FloatingButton;
