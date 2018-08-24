import React from 'react';

const FloatingButton = ({ handleClick, tooltip, icon }) => {
  const animationClasses = ['flipInX', 'flipInY'];
  const randomClass =  animationClasses[Math.floor(Math.random() * animationClasses.length)];

  return (
    <button
      className={`btn btn-float animated ${randomClass}`}
      data-toggle="tooltip"
      data-placement="top"
      data-offset="0, 5"
      title={tooltip}
      onClick={handleClick}
    >
      <i class="material-icons">{icon}</i>
    </button>
  );
};

export default FloatingButton;
