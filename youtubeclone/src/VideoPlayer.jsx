import React from 'react';
import qs from 'query-string';

import './components/VideoPlayer/VideoPlayer.css';

const VideoPlayer = props => {
  // const selectedVideo = props.videos.filter(
  //   video => video.id.videoId === props.videoId,
  // );

  // REST API
  const { id } = props.match.params;
  // QUERY STRING
  const { v } = qs.parse(props.location.search);
  const _id = id || v;
  if (!_id) return null;
  const url = `https://www.youtube.com/embed/${_id}`;
  console.log(url);
  return (
    <div className='video-player'>
      <iframe
        src={url}
        title={_id}
        width='1100'
        height='619'
        frameBorder='0'
      ></iframe>
      <div className='selected-video'>
        {/* <span>{selectedVideo[0].snippet.title}</span> */}
      </div>
      <div className='selected-video-channel'>
        {/* <span>{selectedVideo[0].snippet.channelTitle}</span> */}
      </div>
    </div>
  );
};

export default VideoPlayer;
