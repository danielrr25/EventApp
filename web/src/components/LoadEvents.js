import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const getIconPath = (iconName) => {
  try {
    const icon = require(`./${iconName}.png`);
    return icon;
  } catch (error) {
    console.error(`Error loading icon "${iconName}":`, error.message);
    return './icon1.png';
  }
};

function LoadEvents({ searchTerm }) {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`http://167.172.230.181:5000/events/search-events?name=${searchTerm}`);
        const eventsData = await response.json();
        setEvents(eventsData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchEvents();
  }, [searchTerm]);

  return (
    <div id="eventUIDiv">
      <div className="header-container">
        <div className="title">
          <h1>Event List</h1>
        </div>
      </div>

      <div id="events-container" className="input-group">
        {events.map((event) => (
          <div key={event._id} className="event">
            <strong>Name:</strong> {event.eventName}<br />
            <strong>ID:</strong> {event._id}<br />
            <strong>Date:</strong> {event.eventDate}<br />
            <strong>Category:</strong> {event.eventCategory}<br />
            <strong>Location:</strong> {event.eventLocation}<br />
            {event.eventIcon && (
              <div>
                <strong>Icon:</strong>
                {/* Use Link to make the icon clickable and pass the event ID as a parameter */}
                <Link to={`/eventinfo/${event._id}`}>
                  <img src={getIconPath(event.eventIcon)} alt="Event Icon" />
                </Link>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default LoadEvents;
