import '../style/Home.css'; 
import React from 'react';

const Home = () => {
   
  return (
    <div>
    <div className="LoginDiv">
    <div className='title'>JustToDoIt!</div>
      <button className="login-button">
      Login
    </button>
    <button className="login-button">
      Sign Up
    </button>
    </div>
    </div>
  );
};

export default Home;