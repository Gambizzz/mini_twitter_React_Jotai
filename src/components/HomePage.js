import React from 'react';
import { Link } from 'react-router-dom';
import Logout from './Auth/Logout';

const HomePage = () => {
  return (
    <div className='home-page'>
      <header>
        <nav className='navbar'>
          <Link to="/login"> LOGIN </Link>
          <Link to="/register"> REGISTER </Link>
          <Link to="/profile"> PROFILE </Link>
          <Link to="/posts"> POSTS </Link>
          <Logout/>
        </nav>
      </header>
      <h1> Welcome to Mini Twitter </h1>
      <p>This website is a training to React, global state handling and tokens</p>
      <p>Here, authentication and routing will be used to create a small social media website</p>
    </div>
  );
};

export default HomePage;