import React from 'react';
import './VideoList.css';

const VideoListItems = props => {
  return (
    <li className='video-list'>
      <div className='img'>
        <img src='' alt='' />
      </div>
      <div className='video-info'></div>
    </li>
  );
};

export default VideoListItems;
