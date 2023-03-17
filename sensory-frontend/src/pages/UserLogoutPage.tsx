import React from 'react';
import './styles//logout.css';
import { Link } from 'react-router-dom';

const Logout = () => {
  return (
    <div className='container-logout'>
      <img
        src='images/brain.jpg'
        alt='img'
        style={{
          // display: 'inline-block',
          height: '86.7vh',
          width: '100vh',
          marginLeft: '-10vh',
        }}
      />
      <div className='landing-text'>
        <h1 style={{fontSize: "45px"}}>Welcome to SensAware</h1>&nbsp;
        <h5 style={{marginTop: "1px"}}>
          Spreading awareness and improving understanding of Sensory Processing
          Disorder
        </h5>
        <Link to={'/register'}>
          <button className='landing-btn'> Register </button>
        </Link>
        <p>
          Already using SensAware? &nbsp;
          <Link to={'/login'} style={{ color: '#8eb572' }}>
            Sign In.
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Logout;
