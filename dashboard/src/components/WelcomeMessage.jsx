import React, { useState } from 'react';
import './WelcomeMessage.css';

const WelcomeMessage = () => {
  const [name, setName] = useState('User');

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  return (
    <div className="welcome-message-container">
      <h2>Welcome, {name}!</h2>
      <p>This is your dashboard.</p>
      <div className="input-container">
        <label htmlFor="name-input">Change Name:</label>
        <input
          type="text"
          id="name-input"
          value={name}
          onChange={handleNameChange}
        />
      </div>
    </div>
  );
};

export default WelcomeMessage;
