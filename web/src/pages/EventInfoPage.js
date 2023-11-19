import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import EventInfo from '../components/EventInfo';
import Attend from '../components/Attend';
import Chat from '../components/Chat';

function EventInfoPage({ setUserID }) {
  const { eventId } = useParams();
  const [attendees, setAttendees] = useState([]);

  // Function to update attendees in real-time
  const updateAttendees = (newAttendees) => {
    setAttendees(newAttendees);
  };

  return (
    <div>
      <EventInfo eventId={eventId} attendees={attendees} />
      <Attend setUserID={setUserID} eventId={eventId} onAttendeesUpdate={updateAttendees} />
      <Chat setUserID={setUserID} eventId={eventId}/>
    </div>
  );
}

export default EventInfoPage;
