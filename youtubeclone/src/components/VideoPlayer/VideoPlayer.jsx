import React from 'react';
import './VideoPlayer.css';

const VideoPlayer = props => {
  const url = `https://www.youtube.com/embed/${props.videoId}`;

  return (
    <iframe src={url} title={props.videoId} />
  )
}

export default VideoPlayer;