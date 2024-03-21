import React, { useState } from 'react';
import Cookies from 'js-cookie';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [tokenStatus, setTokenStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Please provide both email and password.');
      return;
    }

    const userData = {
      email,
      password,
    };

    const apiUrl = 'https://tmserver.govindsr.me/api/v2/loginAdmin';

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        setError('Invalid email or password.');
        return;
      }

      const data = await response.json();

      // Store token in Cookies
      Cookies.set('token', data.token);

      setIsLoggedIn(true);
      setTokenStatus('Cookie is alive');

      alert('Logged in successfully!');

    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred while logging in. Please try again later.');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>

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
    </div>
  );
};

export default LoginPage;
