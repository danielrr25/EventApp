import React, { useState } from 'react';
import './IconSelection.css';
import icon1 from './Select.png';

function IconSelection({ onIconSelect }) {
  const [selectedIcon, setSelectedIcon] = useState(null);

  const handleIconClick = (icon) => {
    setSelectedIcon(icon);
    if (onIconSelect) {
      onIconSelect(icon);
    }
  };

  const icons = [icon1];

  return (
    <div className="icon-selection">
      <h2 className="icon_title">Event Icon</h2>
      {!selectedIcon && (
        <div className="grey-box">
          <p>No icon chosen</p>
        </div>
      )}

      {selectedIcon && (
        <div className="selected-icon">
          <img src={selectedIcon} alt="Selected Icon" />
        </div>
      )}

<h2 className="icon_title">Select an icon:</h2>


      <div className="icon-options">
        {icons.map((icon, index) => (
          <img
            key={index}
            src={icon}
            alt={`Icon ${index}`}
            onClick={() => handleIconClick(icon)}
          />
        ))}
      </div>
    </div>
  );
}

export default IconSelection;