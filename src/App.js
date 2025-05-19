import React, { useState } from 'react';
import Login from './components/Login';
import ContentCreation from './components/ContentCreation';
import './index.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const handleLogin = (credentials) => {
    // Simulate a successful login
    setUser(credentials);
    setIsLoggedIn(true);
  };

  return (
    <div className="App">
      {!isLoggedIn ? (
        <Login onLogin={handleLogin} />
      ) : (
        <ContentCreation user={user} />
      )}
    </div>
  );
}

export default App;