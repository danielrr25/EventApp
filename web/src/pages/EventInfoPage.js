// EventInfoPage.js
import React from 'react';
import { useParams } from 'react-router-dom';

import EventInfo from '../components/EventInfo';

function EventInfoPage() {
  const { eventId } = useParams();

  return (
    <div>
      <h2>Event Information Page</h2>
      <p>Event ID: {eventId}</p>
      <EventInfo eventId={eventId} />
    </div>
  );
}

export default EventInfoPage;
