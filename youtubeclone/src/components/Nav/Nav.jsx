import React from 'react';
import youtubeLogo from './images/youtubeLogo.png';
import './Nav.css';

const Nav = props => {
  return (
    <div className='navigation'>
      <h1 className='logo'>
        <a href='/'>
          <img src={youtubeLogo} alt='youtube logo' />
        </a>
      </h1>
      {props.children}
    </div>
  );
};

export default Nav;
