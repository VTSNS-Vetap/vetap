
import React, { useState } from 'react';
import './Header.css';

const Header = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [showSettings, setShowSettings] = useState(false); 

  const handleLoginClick = () => {
   
    setLoggedIn(true);
  };

  const handleLogoutClick = () => {
    
    setLoggedIn(false);
  };

  const handleSettingsClick = () => {
    
    setShowSettings(!showSettings);
  };

  return (
    <header className="header">
      <div className="left">
        <img src={`${process.env.PUBLIC_URL}/favicon-32x32.png`} alt="Logo" className="logo" />
        <span className="appName">Vetap</span>
      </div>
      <div className="right">
        {loggedIn ? (
          <div className="userPanel">
            <button className="userButton" onClick={handleSettingsClick}>
              <img src={`${process.env.PUBLIC_URL}/user.png`} alt="User Icon" className="userIcon" />
              <span>Ime Korisnika</span>
            </button>
            {showSettings && (
              <div className="settings">
                {/* Opcije za podešavanje */}
                <button onClick={handleLogoutClick}>Odjavi se</button>
              </div>
            )}
          </div>
        ) : (
          <button className="loginButton" onClick={handleLoginClick}>Prijavi se</button>
        )}
      </div>
    </header>
  );
}

export default Header;

