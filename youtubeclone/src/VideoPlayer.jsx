import React from 'react';

import './components/VideoPlayer/VideoPlayer.css';
import Nav from './components/Nav/Nav';
import SearchBar from './components/SearchBar/SearchBar';

const VideoPlayer = props => {
  return (
    <>
      <Nav>
        <SearchBar />
      </Nav>
      <div className='video-player'>
        {/* <iframe src={} title={} width='1100' height='619' frameBorder='0' /> */}
        <div className='selected-video'>
          {/* <span>{selectedVideo[0].snippet.title}</span> */}
        </div>

        <div className='selected-video-channel'>
          {/* <span>{selectedVideo[0].snippet.channelTitle}</span> */}
        </div>
      </div>
    </>
  );
};

export default VideoPlayer;
