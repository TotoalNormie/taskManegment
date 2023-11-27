import './style/Login.css'; // Import your stylesheet
import Header from './components/Header.jsx';
import username_Logo from './assets/username_Logo.PNG';
import password_Logo from './assets/password_Logo.PNG';
import confirm_Logo from './assets/confirm_Logo.PNG';
import React from 'react';

const Signup = () => {
   
  return (
    <div>
    <Header />
    <div className="LoginDiv">
    <div className="inputContainer">
          <img src={username_Logo} alt="username_Logo" className="logo2" />
      <input type="text" id="inputField" className="border-bottom-input" placeholder="Username"/>
    </div>
    <div className="inputContainer">
          <img src={password_Logo} alt="password_Logo" className="logo2" />
      <input type="text" id="inputField" className="border-bottom-input" placeholder="Password"/>
    </div>
    <div className="inputContainer">
          <img src={confirm_Logo} alt="confirm_Logo" className="logo2" />
      <input type="text" id="inputField" className="border-bottom-input" placeholder="Confirm Password"/>
    </div>
      <button className="login-button">
      Login
    </button>
    </div>
    </div>
  );
};

export default Signup;




