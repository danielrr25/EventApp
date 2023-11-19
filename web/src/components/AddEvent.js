import React, { useState, useEffect } from 'react';
import './AddEvent.css';
import LogoGradient from './PopOut.png';
import IconSelection from './IconSelection';
import { useUser } from './UserContext';
import { useNavigate } from 'react-router-dom';
import { getCookie } from './cookieUtils';

function AddEvent() {
  const { setUserID } = useUser();
  const [eventname, setEventName] = useState('');
  const [eventdescription, setEventDescription] = useState('');
  const [eventlocation, setEventLocation] = useState('');
  const [eventdate, setEventDate] = useState('');
  const [eventcategory, setEventCategory] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('');

  const [message, setMessage] = useState('');
  const [selectedCategoryColor, setSelectedCategoryColor] = useState('grey');
  const navigate = useNavigate();

  const handleIconSelection = (icon) => {
    setSelectedIcon(icon);
  };

  const handleCategoryChange = (e) => {
    setEventCategory(e.target.value);
    setSelectedCategoryColor('black');
  };

  const storedUserID = getCookie('userID');

  useEffect(() => {
    if (storedUserID) {
      setUserID(storedUserID);
    }
  }, [setUserID, storedUserID]);

  const addEvent = async (event) => {
  event.preventDefault();

  console.log(selectedIcon);
  
  var obj = {
    creatorID: storedUserID, 
    eventName: eventname,
    eventCategory: eventcategory,
    eventDescription: eventdescription,
    eventDate: eventdate,
    eventLocation: eventlocation,
    eventIcon: selectedIcon,
  };

  var js = JSON.stringify(obj);

  try {
    const storedToken = getCookie('token'); 

    const response = await fetch('http://167.172.230.181:5000/events/create-event', {
      method: 'POST',
      body: js,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': storedToken,
      },
    });

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

  const categories = ["Sports", "Music", "Education", "Parties", "Art", "Social", "Other"];

  useEffect(() => {
    setSelectedCategoryColor('grey');
  }, [eventcategory]);

  return (
    <div id="eventUIDiv">
      <div className="header-container">
        <div className="logo-container2">
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
            onChange={(e) => setEventName(e.target.value)}
          />
        </div>
        <div className="input-subgroup">
          <div className="title_input">
            <h1>Event Date</h1>
          </div>
          <input
            type="date"
            id="eventDate"
            onChange={(e) => setEventDate(e.target.value)}
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
            onChange={(e) => setEventLocation(e.target.value)}
          />
        </div>

        <div className="input-subgroup">
          <div className="title_input">
            <h1>Event Category</h1>
          </div>
          <select
            id="eventCategory"
            onChange={handleCategoryChange}
            style={{
              height: '70px',
              padding: '8px',
              fontSize: '16px',
              color: selectedCategoryColor,
            }}
          >
            <option value="" disabled selected hidden>
              Select One
            </option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="input-group description">
        <div className="title">
          <h1>Event Description</h1>
        </div>
        <textarea
          id="eventDescription"
          placeholder="Event Description"
          onChange={(e) => setEventDescription(e.target.value)}
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
