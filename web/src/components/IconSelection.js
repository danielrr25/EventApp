// IconSelection.js
import React, { useState } from 'react';
import './IconSelection.css';
import socialIcon from './socialIcon.png';
import sportsIcon from './sportsIcon.png';
import partiesIcon from './partiesIcon.png';
import musicIcon from './musicIcon.png';
import educationIcon from './educationIcon.png';
import artIcon from './artIcon.png';

function IconSelection({ onIconSelect }) {
  const [selectedIcon, setSelectedIcon] = useState(null);

  const handleIconClick = (icon) => {
    const iconName = icon.replace(/^.*[\\/]/, '').split('.')[0];
    setSelectedIcon(icon);

    if (onIconSelect) {
      onIconSelect(iconName);
    }
  };

  const icons = [socialIcon, sportsIcon, partiesIcon, musicIcon, educationIcon, artIcon];

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
