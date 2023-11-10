// IconSelection.js
import React, { useState } from 'react';
import './IconSelection.css';
import icon1 from './icon1.png';
import icon2 from './icon2.png';
import icon3 from './icon3.png';
import icon4 from './icon4.png';
import icon5 from './icon5.png';
import icon6 from './icon6.png';

function IconSelection({ onIconSelect }) {
  const [selectedIcon, setSelectedIcon] = useState(null);

  const handleIconClick = (icon) => {
    const iconName = icon.replace(/^.*[\\/]/, '').split('.')[0];
    setSelectedIcon(icon);

    if (onIconSelect) {
      onIconSelect(iconName);
    }
  };

  const icons = [icon1, icon2, icon3, icon4, icon5, icon6];

  const iconsTop = icons.slice(0, 3);
  const iconsBottom = icons.slice(3);

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

      <div className="icon-row">
        <div className="icon-options">
          {iconsTop.map((icon, index) => (
            <img
              key={index}
              src={icon}
              alt={`Icon ${index}`}
              onClick={() => handleIconClick(icon)}
            />
          ))}
        </div>
        <div className="icon-options">
          {iconsBottom.map((icon, index) => (
            <img
              key={index}
              src={icon}
              alt={`Icon ${index + 3}`}
              onClick={() => handleIconClick(icon)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default IconSelection;
