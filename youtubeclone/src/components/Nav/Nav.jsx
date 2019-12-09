import React from 'react';
import youtubeLogo from './images/youtubeLogo.png'
const Nav = props => {
  return (
    <div>
      <h1>
        <img src={youtubeLogo} alt='youtube logo'/>
      </h1>
        {props.children}
    </div>
  )
}

export default Nav;