import React from "react";
import { Link } from "react-router-dom"; // Import Link from React Router

function Event() {
  return (
    <div>
      <h1 id="title">Event Page</h1>
      <Link to="/addevent">
        <button>Add Event</button>
      </Link>
      <Link to="/account">
        <button>Account</button>
      </Link>
    </div>
  );
}

export default Event;