import React from 'react';
import username_Logo from '../assets/username_Logo.PNG';
import password_Logo from '../assets/password_Logo.PNG';
import './style/Login.css';

const Login = () => {
  return (
    <div>
      <form>
        <div className="LoginDiv">
          <div className="inputContainer">
            <img src={username_Logo} alt="username_Logo" className="logo2" />
            <input type="text" id="usernameInput" className="border-bottom-input" placeholder="Username" />
          </div>
          <div className="inputContainer">
            <img src={password_Logo} alt="password_Logo" className="logo2" />
            <input type="password" id="passwordInput" className="border-bottom-input" placeholder="Password" />
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;