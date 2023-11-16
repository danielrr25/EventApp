import React, { useState } from 'react';
import Event from '../components/Event';
import LoadEvents from '../components/LoadEvents';
import SearchEvents from '../components/SearchEvents';
import Chat from '../components/Chat';

const EventPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (newSearchTerm) => {
    setSearchTerm(newSearchTerm);
  };

  return (
    <div>
      <Event />
      <SearchEvents onSearch={handleSearch} />
      <LoadEvents searchTerm={searchTerm} />
      <Chat/>
    </div>
  );
};

export default EventPage;