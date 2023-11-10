// AddEvent.js

import React, { useState } from 'react';
import './AddEvent.css';
import LogoGradient from './PopOut.png';
import IconSelection from './IconSelection';
import { useUser } from './UserContext';
import {useNavigate } from 'react-router-dom';

function AddEvent() {
  const { userID } = useUser();
  var eventname = '';
  var eventdescription = '';
  var eventlocation = '';
  var eventdate = '';
  var eventcategory = '';
  var selectedIcon = '';

  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleIconSelection = (icon) => {
    selectedIcon = icon;
  };

  console.log('ICON:', selectedIcon);
  const addEvent = async (event) => {
    event.preventDefault();

    var obj = {
      creatorID: userID,
      eventName: eventname,
      eventCategory: eventcategory,
      eventDescription: eventdescription,
      eventDate: eventdate,
      eventLocation: eventlocation,
      eventIcon: selectedIcon,
    };

    var js = JSON.stringify(obj);
    console.log('Data sent to server:', obj);
    try {
      const response = await fetch('http://167.172.230.181:5000/events/create-event', {
        method: 'POST',
        body: js,
        headers: { 'Content-Type': 'application/json' },
      });

      var txt = await response.text();
      var res = JSON.parse(txt);
      console.log(res);

      if (response.status === 200) {
        setMessage('Event created successfully.');
        navigate('/event');
      } else {
        setMessage('Event already exists.');
      }
    } catch (e) {
      setMessage(e.toString());
    }
  };

  return (
    <div id="eventUIDiv">
      <div className="header-container">
        <div className="logo-container">
          <img src={LogoGradient} alt="Your Logo" className="logogradient" />
        </div>
        <div className="title">
          <h1>Create your event</h1>
        </div>
      </div>
      <div className="input-group">
        <div className="input-subgroup">
          <div className="title_input">
            <h1>Event Name</h1>
          </div>
          <input
            type="text"
            id="eventName"
            placeholder="Event Name"
            onChange={(e) => (eventname = e.target.value)}
          />
        </div>
        <div className="input-subgroup">
          <div className="title_input">
            <h1>Event Date</h1>
          </div>
          <input
            type="date"
            id="eventDate"
            onChange={(e) => (eventdate = e.target.value)}
          />
        </div>
      </div>

      <div className="input-group">
        <div className="input-subgroup">
          <div className="title_input">
            <h1>Event Location</h1>
          </div>
          <input
            type="text"
            id="eventLocation"
            placeholder="Event Location"
            onChange={(e) => (eventlocation = e.target.value)}
          />
        </div>

        <div className="input-subgroup">
          <div className="title_input">
            <h1>Event Category</h1>
          </div>
          <input
            type="text"
            id="eventCategory"
            placeholder="Event Category"
            onChange={(e) => (eventcategory = e.target.value)}
          />
        </div>
      </div>

      <div className="input-group description">
        <div className="title">
          <h1>Event Description</h1>
        </div>
        <textarea
          id="eventDescription"
          placeholder="Event Description"
          onChange={(e) => (eventdescription = e.target.value)}
        />
      </div>

      <button
        type="button"
        id="addEventButton"
        className="buttons"
        onClick={addEvent}
        style={{ fontSize: '22px' }}
      >
        Add Event
      </button>

      <span id="eventAddResult">{message}</span>
      <IconSelection onIconSelect={handleIconSelection} />
    </div>
  );
}

export default AddEvent;
