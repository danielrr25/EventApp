import React, { useState } from 'react';
import Event from '../components/Event';
import LoadEvents from '../components/LoadEvents';
import SearchEvents from '../components/SearchEvents';
import SearchCategory from '../components/SearchCategory';

const EventPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchCategory, setSearchCategory] = useState('');

  const handleNameSearch = (newSearchTerm) => {
    setSearchTerm(newSearchTerm);
    setSearchCategory(null); // Set category to null when searching by name
  };

  const handleCategorySearch = (newSearchCategory) => {
    setSearchTerm('');
    setSearchCategory(newSearchCategory);
  };

  return (
    <div>
      <Event />
      <SearchEvents onSearch={handleNameSearch} />
      <SearchCategory onCategorySearch={handleCategorySearch} />
      <LoadEvents searchTerm={searchTerm} searchCategory={searchCategory} />
    </div>
  );
};

export default EventPage;
