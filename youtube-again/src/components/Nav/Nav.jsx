import React from 'react';

import './Nav.css';
import youtubeLogo from './images/youtubeLogo.png';

const Nav = props => {
  return (
    <div className="navigation">
      <h1 className="logo">
        <img src={youtubeLogo} alt="Logo" />
      </h1>
      {props.children}
    </div>
  );
};

export default Nav;
