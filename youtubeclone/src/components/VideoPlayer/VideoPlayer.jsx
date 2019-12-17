import React from 'react';
import './VideoPlayer.css';

const VideoPlayer = props => {
  const selectedVideo = props.videos.filter(video =>
    video.id.videoId === props.videoId
  );

  console.log(props.channelInfo)
  const url = `https://www.youtube.com/embed/${props.videoId}`

    return (
      <div className="video-player">
        <iframe src={url} title={props.videoId} width="1100" height="619" frameBorder="0"></iframe>
        <div className="selected-video">
          <span>{selectedVideo[0].snippet.title}</span>
        </div>
        <div className="selected-video-channel">
          <img />
          <span>{selectedVideo[0].snippet.channelTitle}</span>
        </div>
      </div>
    )
}

export default VideoPlayer;