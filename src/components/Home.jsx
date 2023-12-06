import '../style/Home.css'; 
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
   
  return (
    <div>
    <div className="LoginDiv">
    <div className='title'>JustToDoIt!</div>
    <Link to="/login"> 
    <button className="plogin-button">
      Login
    </button> </Link>
    <Link to="/signup"> 
    <button className="plogin-button">
      Sign Up
    </button>
    </Link>
    </div>
    </div>
  );
};

export default Home;