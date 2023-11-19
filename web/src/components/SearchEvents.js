import React, { useState } from 'react';
import SearchIcon from './Search.png'; // Adjust the path to the actual location of the icon
import './SearchEvents.css';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <div>
      <form className="SearchBar" onSubmit={handleSearch}>
        <input
          className="SearchInput"
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="SearchButton" type="submit">
          <img src={SearchIcon} alt="Search" />
        </button>
      </form>
      <div className="GreyLine"></div>
    </div>
  );
};

export default SearchBar;
