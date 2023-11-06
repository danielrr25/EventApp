import React, { useState } from 'react';
import './AddEvent.css';
import LogoGradient from './PopOut.png';
import IconSelection from './IconSelection';

function AddEvent() {
  var eventName = '';
  var eventDescription = '';
  var eventLocation = '';
  var eventDate = '';
  var eventCategory = '';
  var selectedIcon = '';

  const [message, setMessage] = useState('');
  const handleIconSelection = (icon) => {
    selectedIcon = icon;
  };

  const addEvent = async (event) => {
    event.preventDefault();

    var obj = {
      eventName: eventName,
      eventDescription: eventDescription,
      eventLocation: eventLocation,
      eventDate: eventDate,
      eventCategory: eventCategory,
      eventIcon: selectedIcon,
    };

    var js = JSON.stringify(obj);

    try {
      const response = await fetch('http://localhost:5000/api/addevent', {
        method: 'POST',
        body: js,
        headers: { 'Content-Type': 'application/json' },
      });

      var txt = await response.text();
      var res = JSON.parse(txt);

      if (res.error.length > 0) {
        setMessage('API Error: ' + res.error);
      } else {
        setMessage('Event has been added');
      }
    } catch (e) {
      setMessage(e.toString());
    }
  }

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
            onChange={(e) => (eventName = e.target.value)}
          />
        </div>
        <div className="input-subgroup">
    <div className="title_input">
      <h1>Event Date</h1>
    </div>
    <input
      type="date" // Use type="date" for date input
      id="eventDate"
      onChange={(e) => (eventDate = e.target.value)}
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
            onChange={(e) => (eventLocation = e.target.value)}
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
            onChange={(e) => (eventCategory = e.target.value)}
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
    onChange={(e) => (eventDescription = e.target.value)}
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