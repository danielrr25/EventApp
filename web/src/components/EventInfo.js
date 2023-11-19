import React, { useEffect, useState } from 'react';
import './EventInfo.css';
import LogoGradient from './PopOut.png';
import { useNavigate } from 'react-router-dom';
import { getCookie } from './cookieUtils';

const getIconPath = (iconName) => {
  try {
    const icon = require(`./${iconName}.png`);
    return icon;
  } catch (error) {
    console.error(`Error loading icon "${iconName}":`, error.message);
    return './icon1.png';
  }
};

function EventInfo({ eventId, attendees }) {
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [creatorUsername, setCreatorUsername] = useState(null);
  const [attendeeInfo, setAttendeeInfo] = useState([]); // Add state for attendeeInfo
  const storedUserID = getCookie('userID');
  const userID = storedUserID || '';
  const storedToken = getCookie('token');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEventInfo = async () => {
      try {
        const response = await fetch(`http://167.172.230.181:5000/events/get-event-info/${eventId}`, {
          headers: {
            'Authorization': storedToken,
          },
        });
        const eventData = await response.json();

        if (response.status === 200) {
          setEvent(eventData);

          const creatorId = eventData.creatorID;
          const userResponse = await fetch(`http://167.172.230.181:5000/users/user-info/${creatorId}`, {
          headers: {
            'Authorization': storedToken,
          },
        });
          const userData = await userResponse.json();
          

          if (userResponse.status === 200) {
            setCreatorUsername(userData.username);
            
          } else {
            console.error(`Failed to fetch creator information for user ID: ${creatorId}`);
          }

          await fetchAttendeeInfo(eventData.listAttendees);
        } else {
          setError('Failed to fetch event information');
        }

        setLoading(false);
      } catch (error) {
        setError('Error fetching event information');
        setLoading(false);
      }
    };

    const fetchAttendeeInfo = async (attendeeIds) => {
      const attendeeInfoPromises = attendeeIds.map(async (attendeeId) => {
        try {
          const response = await fetch(`http://167.172.230.181:5000/users/user-info/${attendeeId}`, {
            headers: {
              'Authorization': storedToken,
            },
          });
          const attendeeData = await response.json();

          if (response.status === 200) {
            return attendeeData;
          } else {
            console.error(`Failed to fetch user information for user ID: ${attendeeId}`);
            return null;
          }
        } catch (error) {
          console.error(`Error fetching user information for user ID: ${attendeeId}`, error);
          return null;
        }
      });

      const attendeeInfoResults = await Promise.all(attendeeInfoPromises);
      setAttendeeInfo(attendeeInfoResults.filter((info) => info !== null));
    };

    fetchEventInfo();
  }, [eventId, storedToken]);

  const handleDeleteEvent = async () => {
    const userConfirmed = window.confirm('Are you sure you want to delete this event?');

    if (userConfirmed) {
      const id = eventId;
      console.log(id);
      try {
        const response = await fetch(`http://167.172.230.181:5000/events/delete-event/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': storedToken,
          },
        });

        if (response.status === 200) {
          console.log('Event deleted successfully');
          navigate('/event');
        } else {
          console.error('Failed to delete event');
        }
      } catch (error) {
        console.error('Error deleting event:', error);
      }
    }
  };

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

  if (!event) {
    return <p>No event data available</p>;
  }

  const isCreator = event.creatorID === userID;
  const iconClass = event.eventIcon ? `icon-${event.eventIcon}` : '';

  return (
    <div className="event-info-container">
      <div id="eventUIDiv2" className={iconClass}>
        <div className="header-container5">
          <div className="logo-container10">
            <img src={LogoGradient} alt="Your Logo" className="logogradient10" />
          </div>
          <div className="title_for_event">
            <h1>{creatorUsername}'s Event</h1>
          </div>
        </div>
        <div className="input-group2">
          <div className="input-subgroup2">
            <div className="title_input2">
              <h1>Name</h1>
            </div>
            <div className="rounded-box2">
              {event.eventName}
            </div>
          </div>
          <div className="input-subgroup2">
            <div className="title_input2">
              <h1>Date</h1>
            </div>
            <div className="rounded-box2">
              {formatDate(event.eventDate)}
            </div>
          </div>
        </div>

        <div className="input-group2">
          <div className="input-subgroup2">
            <div className="title_input2">
              <h1>Location</h1>
            </div>
            <div className="rounded-box2">
              {event.eventLocation}
            </div>
          </div>

          <div className="input-subgroup2">
            <div className="title_input2">
              <h1>Category</h1>
            </div>
            <div className="rounded-box2">
              {event.eventCategory}
            </div>
          </div>
        </div>

        {event.eventIcon && (
          <div className="input-group3">
            <div className="rounded-box3">
              <img src={getIconPath(event.eventIcon)} alt="Event Icon" />
            </div>
          </div>
        )}

        <div className="description-container">
          <div className="title_input2">
            <h1>Description</h1>
          </div>
          <div className="rounded-box-description">
            {event.eventDescription}
          </div>
        </div>

        <div className="attendees-container">
          <div className="title_input3">
            <h1>Attendees</h1>
          </div>
          <div className="rounded-box-attendees">
            <ul className="attendees-list">
              {attendeeInfo.map((attendee, index) => (
                <li key={index}>{attendee.username}</li>
              ))}
            </ul>
          </div>
        </div>

        {isCreator && (
          <button className="delete-button" onClick={handleDeleteEvent}>Delete Event</button>
        )}
      </div>
    </div>
  );
}

export default EventInfo;