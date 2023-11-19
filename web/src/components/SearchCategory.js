import React, { useState } from 'react';
import Art from './Art.png';
import Sports from './Ball.png';
import Education from './Education.png';
import Parties from './party.png';
import Music from './Headphones.png';
import Social from './Social.png';
import Other from './Ask.png';
import './SearchCategory.css';

const SearchCategoryIcons = ({ onCategorySearch }) => {
  const categories = ['Sports', 'Music', 'Education', 'Parties', 'Art', 'Social', 'Other'];
  const [clickedCategory, setClickedCategory] = useState('');

  const handleCategorySearch = (category) => {
    if (clickedCategory === category) {
      // Reset the category filter if the clicked category is the same as the currently selected category
      setClickedCategory('');
      onCategorySearch(''); // You might want to adjust this based on how your onCategorySearch function handles blank categories
    } else {
      // Set the clicked category and invoke the onCategorySearch function
      setClickedCategory(category);
      onCategorySearch(category);
    }
  };

  return (
    <div className="SearchCategoryIcons">
      {categories.map((category) => (
        <div
          key={category}
          className={`CategoryIcon ${clickedCategory === category ? 'clicked' : ''}`}
          onClick={() => handleCategorySearch(category)}
        >
          {category === 'Art' ? (
            <>
              <img src={Art} alt={category} />
              <div>{category}</div>
            </>
          ) : category === 'Sports' ? (
            <>
              <img src={Sports} alt={category} />
              <div>{category}</div>
            </>
          ) : category === 'Education' ? (
            <>
              <img src={Education} alt={category} />
              <div>{category}</div>
            </>
          ) : category === 'Parties' ? (
            <>
              <img src={Parties} alt={category} />
              <div>{category}</div>
            </>
          ) : category === 'Music' ? (
            <>
              <img src={Music} alt={category} />
              <div>{category}</div>
            </>
          ) : category === 'Social' ? (
            <>
              <img src={Social} alt={category} />
              <div>{category}</div>
            </>
          ) : category === 'Other' ? (
            <>
              <img src={Other} alt={category} />
              <div>{category}</div>
            </>
          ) : (
            <>
              <img src={`path-to-${category.toLowerCase()}-icon.png`} alt={category} />
              <div>{category}</div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default SearchCategoryIcons;
