import React, { useState, useEffect } from 'react';
import { useUser } from './UserContext';
import { Link } from 'react-router-dom';
import './LoadEvents.css';
import { getCookie } from './cookieUtils';
import userevents from './Passport.png';
import defaultIcon from './artIcon.png';

const getIconPath = (iconName) => {
  try {
    const icon = require(`./${iconName}.png`);
    return icon;
  } catch (error) {
    console.error(`Error loading icon "${iconName}":`, error.message);
    return defaultIcon;
  }
};

const LoadEvents = ({ searchTerm, searchCategory }) => {
  const [events, setEvents] = useState([]);
  const { userID, setUserID } = useUser();

  useEffect(() => {
    // Get userID and token from cookies
    const storedUserID = getCookie('userID');
    const storedToken = getCookie('token');

    if (storedUserID) {
      setUserID(storedUserID);
    }


    const fetchEvents = async () => {
      try {
        const response = await fetch(`http://167.172.230.181:5000/events/search-events?name=${searchTerm}`, {
          headers: {
            'Authorization': storedToken, 
          },
        });
        const eventsData = await response.json();

        // Filter events based on category (client-side filtering)
        const filteredEvents = eventsData.filter((event) => {
          return !searchCategory || new RegExp(searchCategory, 'i').test(event.eventCategory);
        });

        setEvents(filteredEvents);
      } catch (error) {
        console.error(error);
      }
    };

    fetchEvents();
  }, [searchTerm, searchCategory, setUserID]);


  // Function to format the date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = new Date(dateString).toLocaleDateString('en-US', options);
    return formattedDate;
  };
  

  return (
    <div id="eventUIDiv">
    <Link to="/addevent">
        <button className="add-button">Create Event</button>
      </Link>
    
      <Link to={`/userevents/${userID}`} className="userevents-link">
        <img src={userevents} alt="My Events Icon" className="userevents-icon" />
      </Link>
      
      <div id="events-container" className="input-group">
        <div className="events-wrapper">
          {events.map((event) => (
            <div key={event._id} className="event">
              <div className="event-container">
                {event.eventIcon && (
                  <div className="event-icon">
                    <Link to={`/eventinfo/${event._id}`}>
                      <img src={getIconPath(event.eventIcon)} alt="Event Icon" />
                    </Link>
                  </div>
                )}
                <div className="event-details">
                  <div className="event-name">
                    <strong></strong> {event.eventName}
                  </div>
                  <div className="event-date">
                    <strong></strong> {formatDate(event.eventDate)}
                  </div>
                  <div className="event-category">
                    <strong></strong> {event.eventCategory}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
    </div>
  );
}

export default LoadEvents;
