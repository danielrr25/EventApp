import React from 'react';

function CodePopup({ onSubmit, code, setCode, message }) {
  return (
    <div className="popup-overlay1">
      <div className="popup1">
        <h3>Enter Code</h3>
        <input
          type="text"
          id="enterCode"
          className="rounded-input-email"
          placeholder="Check email for code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <button type="button" onClick={onSubmit}>
          Submit
        </button>
        {message && <p className="popup-message">{message}</p>}
      </div>
    </div>
  );
}

export default CodePopup;
