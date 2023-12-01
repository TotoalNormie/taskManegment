import '../style/Login.css'; 
import username_Logo from '../assets/username_Logo.PNG';
import password_Logo from '../assets/password_Logo.PNG';
import confirm_Logo from '../assets/confirm_Logo.PNG';
import React from 'react';

const Signup = () => {

  return (
    <div>
      <form>
        <div className="LoginDiv">
          <div className="inputContainer">
            <img src={username_Logo} alt="username_Logo" className="logo2" />
            <input type="text" id="usernameField" className="border-bottom-input" placeholder="Username" />
          </div>
          <div className="inputContainer">
            <img src={password_Logo} alt="password_Logo" className="logo2" />
            <input type="password" id="passwordField" className="border-bottom-input" placeholder="Password" />
          </div>
          <div className="inputContainer">
            <img src={confirm_Logo} alt="confirm_Logo" className="logo2" />
            <input type="password" id="confirmPasswordField" className="border-bottom-input" placeholder="Confirm Password" />
          </div>
          <button type="submit" className="login-button">
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;




