import React from 'react';

const DropDown = ({ list = [], handleClick, parentEle }) => {
  const width = parentEle.getBoundingClientRect().width;

  return (
    <div className="form-dropdown" style={{ width: width + 'px' }}>
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
}
 
export default DropDown;