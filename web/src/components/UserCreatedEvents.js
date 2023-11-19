import React, { useEffect, useState } from 'react';
import { useUser } from './UserContext';
import { Link } from 'react-router-dom';
import './UserCreatedEvents.css';
import { getCookie } from './cookieUtils';
import LogoGradient from './PopOut.png';

const getIconPath = (iconName) => {
  try {
    const icon = require(`./${iconName}.png`);
    return icon;
  } catch (error) {
    console.error(`Error loading icon "${iconName}":`, error.message);
    return './icon1.png';
  }
};

const UserCreatedEvents = () => {
  const [createdEvents, setCreatedEvents] = useState([]);
  const [attendingEvents, setAttendingEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userID, setUserID } = useUser();
  const storedToken = getCookie('token');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedUserID = getCookie('userID');

        if (storedUserID) {
          setUserID(storedUserID);
          const userId = storedUserID;

          const createdEventsResponse = await fetch(`http://167.172.230.181:5000/events/get-created-events/${userId}`, {
            headers: {
              'Authorization': storedToken,
            },
          });
          const attendingEventsResponse = await fetch(`http://167.172.230.181:5000/events/get-attending-events/${userId}`, {
            headers: {
              'Authorization': storedToken,
            },
          });

          if (!createdEventsResponse.ok || !attendingEventsResponse.ok) {
            throw new Error('Failed to fetch events');
          }

          const createdEventsData = await createdEventsResponse.json();
          const attendingEventsData = await attendingEventsResponse.json();

          setCreatedEvents(createdEventsData);
          setAttendingEvents(attendingEventsData);
        } else {
          setError('User ID not found in cookie');
        }
      } catch (error) {
        console.error(error);
        setError('Error fetching events');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [setUserID, storedToken]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = new Date(dateString).toLocaleDateString('en-US', options);
    return formattedDate;
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div id="userCreatedEventsDiv">
      <div className="header-container">
        <div className="logo-container2">
          <img src={LogoGradient} alt="Your Logo" className="logogradient" />
        </div>
        <div className="title">
          <h1>My Events</h1>
        </div>
      </div>

      <Link to="/addevent">
        <button className="add-button">Create Event</button>
      </Link>

      {/* Attending Events Container */}
      {attendingEvents.length > 0 && (
        <div id="attending-events-container" className="input-group">
          <div className="title_events2">
            <h1>Attending Events</h1>
          </div>
          <div className="attending-events-wrapper">
            {attendingEvents.map((attendingEvent) => (
              <div key={attendingEvent._id} className="attending-event">
                <div className="event-container">
                  {attendingEvent.eventIcon && (
                    <div className="event-icon">
                      <Link to={`/eventinfo/${attendingEvent._id}`}>
                        <img src={getIconPath(attendingEvent.eventIcon)} alt="Event Icon" />
                      </Link>
                    </div>
                  )}
                  <div className="event-details">
                    <div className="event-name">
                      <strong></strong> {attendingEvent.eventName}
                    </div>
                    <div className="event-date">
                      <strong></strong> {formatDate(attendingEvent.eventDate)}
                    </div>
                    <div className="event-category">
                      <strong></strong> {attendingEvent.eventCategory}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Created Events Container */}
      <div id="created-events-container" className="input-group">
        <div className="title_events">
          <h1>Created Events</h1>
        </div>
        <div className="created-events-wrapper">
          {createdEvents.map((createdEvent) => (
            <div key={createdEvent._id} className="created-event">
              <div className="event-container">
                {createdEvent.eventIcon && (
                  <div className="event-icon">
                    <Link to={`/eventinfo/${createdEvent._id}`}>
                      <img src={getIconPath(createdEvent.eventIcon)} alt="Event Icon" />
                    </Link>
                  </div>
                )}
                <div className="event-details">
                  <div className="event-name">
                    <strong></strong> {createdEvent.eventName}
                  </div>
                  <div className="event-date">
                    <strong></strong> {formatDate(createdEvent.eventDate)}
                  </div>
                  <div className="event-category">
                    <strong></strong> {createdEvent.eventCategory}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserCreatedEvents;
