import React from 'react';
import PropTypes from 'prop-types';

const DropDown = ({ list, handleClick, width }) => {
  return (
    <div className="form-dropdown" style={{ width: `${width}px` }}>
      <ul>
        {list.map((item, index) => (
          <li key={index} onClick={() => handleClick(item)}>
            <span>{item.header}</span>
            <span>{item.subheader}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

DropDown.defaultProps = {
  width: '100px',
  handleClick: () => {},
  list: [],
};

DropDown.propTypes = {
  width: PropTypes.string,
  handleClick: PropTypes.func,
  list: PropTypes.array,
};

export default DropDown;
