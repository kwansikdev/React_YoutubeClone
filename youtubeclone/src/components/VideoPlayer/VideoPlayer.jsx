import React from 'react';
import './VideoPlayer.css';

const VideoPlayer = props => {
  const url = `https://www.youtube.com/embed/${props.videoId}`
  console.log(props.videoId)

    return (
      <div className="video-player">
        <iframe src={url} title={props.videoId} width="1100" height="619" frameborder="0"></iframe>
      </div>
    )
}

export default VideoPlayer;