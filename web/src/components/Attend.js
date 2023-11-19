import React, { useState, useEffect } from 'react';
import { useAttendance } from './AttendanceContext';
import './Attend.css';
import { getCookie } from './cookieUtils';

function Attend({ eventId }) {
  const storedUserID = getCookie('userID');
  const userID = storedUserID || '';

  const storedToken = getCookie('token');
  
  const { attendees, updateAttendees } = useAttendance();
  const [isAttending, setIsAttending] = useState(false);

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
          const isUserAttending = eventData.listAttendees.includes(userID);
          setIsAttending(isUserAttending);
          updateAttendees(eventData.listAttendees);
        } else {
          console.error('Failed to fetch event information');
        }
      } catch (error) {
        console.error('Error fetching event information', error);
      }
    };

    fetchEventInfo();
  }, [eventId, userID, updateAttendees, storedToken]);

  const handleAttend = async () => {
    try {
      const response = await fetch('http://167.172.230.181:5000/events/attendevent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': storedToken,
        },
        body: JSON.stringify({ eventid: eventId, userid: userID }),
      });

      if (response.status === 201) {
        setIsAttending(true);
        console.log('User is attending event');
        updateAttendees([...attendees, userID]);
        window.location.reload();
      } else if (response.status === 409) {
        console.error('User already attending event');
      } else {
        console.error('Failed to attend event');
      }
    } catch (error) {
      console.error('Error attending event:', error);
    }
  };

  const handleUnattend = async () => {
    try {
      const response = await fetch('http://167.172.230.181:5000/events/unattendevent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': storedToken,
        },
        body: JSON.stringify({ eventid: eventId, userid: userID }),
      });

      if (response.status === 201) {
        setIsAttending(false);
        console.log('User unattended event');
        updateAttendees(attendees.filter(id => id !== userID));
        window.location.reload();
      } else if (response.status === 409) {
        console.error('User not attending event');
      } else {
        console.error('Failed to unattend event');
      }
    } catch (error) {
      console.error('Error unattending event:', error);
    }
  };

  return (
    <div className="attend-container">
      {!isAttending ? (
        <button className="attend-button attend" onClick={handleAttend}>
          Attend Event
        </button>
      ) : (
        <button className="attend-button unattend" onClick={handleUnattend}>
          Unattend Event
        </button>
      )}
    </div>
  );
}

export default Attend;