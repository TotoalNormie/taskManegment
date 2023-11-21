import './style/Login.css'; // Import your stylesheet
import Header from './components/Header.jsx';
import React, { useState } from 'react';

const Login = () => {
   
  return (
    <div>
    <Header />
    <div className="LoginDiv">
      <input type="text" id="inputField" className="border-bottom-input" placeholder="Username"/>
      <input type="text" id="inputField" className="border-bottom-input" placeholder="Password"/>
      <input type="text" id="inputField" className="border-bottom-input" placeholder="Confirm Password"/>
      <button className="login-button">
      Login
    </button>
    </div>
    </div>
  );
};

export default Login;