// LoginForm.js

import React from 'react';
import './Login.css'; // Import the CSS file

function LoginForm({ username, setUsername, password, setPassword, onLogin }) {
  return (
    <div className="login-container">
      <h2>Login</h2>
      <form className="login-form">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button onClick={onLogin}>Login</button>
      </form>
    </div>
  );
}

export default LoginForm;
