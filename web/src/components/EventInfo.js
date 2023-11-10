// EventInfo.js
import React, { useEffect, useState } from 'react';

const getIconPath = (iconName) => {
  try {
    const icon = require(`./${iconName}.png`);
    return icon;
  } catch (error) {
    console.error(`Error loading icon "${iconName}":`, error.message);
    return './icon1.png';
  }
};

function EventInfo({ eventId }) {
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error] = useState(null);

  useEffect(() => {
    const fetchEventInfo = async () => {
      try {
        const response = await fetch(`http://167.172.230.181:5000/events/get-event-info/${eventId}`);


        const eventData = await response.json();

        setEvent(eventData);
        setLoading(false); 
      } catch (error) {
        setLoading(false); 
      }
    };

    fetchEventInfo();
  }, [eventId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!event) {
    return <p>No event data available</p>;
  }

  return (
    <div>
      <h3>Event Details</h3>
      <p><strong>Name:</strong> {event.eventName}</p>
      <p><strong>Date:</strong> {event.eventDate}</p>
      <p><strong>Category:</strong> {event.eventCategory}</p>
      <p><strong>Location:</strong> {event.eventLocation}</p>
            {event.eventIcon && (
        <div>
          <strong>Icon:</strong>
          <img src={getIconPath(event.eventIcon)} alt="Event Icon" />
        </div>
      )}
    </div>
  );
}

export default EventInfo;
