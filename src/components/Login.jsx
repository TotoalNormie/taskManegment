import React from 'react';
import Header from './Header.jsx';
import username_Logo from '../assets/username_Logo.png';
import password_Logo from '../assets/password_Logo.png';
import '../style/Login.css';

const Login = () => {
  return (
    <div>
      <Header />
      <div className="LoginDiv">
        <div className="inputContainer">
          <img src={username_Logo} alt="username_Logo" className="logo2" />
          <input type="text" id="usernameInput" className="border-bottom-input" placeholder="Username" />
        </div>
        <div className="inputContainer">
          <img src={password_Logo} alt="password_Logo" className="logo2" />
          <input type="text" id="passwordInput" className="border-bottom-input" placeholder="Password" />
        </div>
        <button className="login-button">
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;