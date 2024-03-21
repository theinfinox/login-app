
import React, { useEffect, useState } from 'react';

const Dashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [tokenStatus, setTokenStatus] = useState('');

  useEffect(() => {
    // Check if the token exists in localStorage
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsLoggedIn(true);
      setTokenStatus('Cookie is alive');
    } else {
      setIsLoggedIn(false);
      setTokenStatus('Cookie is expired or not set');
    }
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      {isLoggedIn ? (
        <div>
          <p>Welcome to the dashboard!</p>
          <p>Status of Authentication Token: {tokenStatus}</p>
        </div>
      ) : (
        <p>Please login to access the dashboard.</p>
      )}
    </div>
  );
};

export default Dashboard;
