import React from 'react';
import './components/VideoPlayer/VideoPlayer.css';
import qs from 'query-string';

const VideoPlayer = props => {
  const { id } = props.match.params;
  const { v } = qs.parse(props.location.search);

  const videoId = id || v;

  const url = `https://www.youtube.com/embed/${videoId}`;

  // const selectedVideo = props.videos.filter(video => video.id.videoId === props.videoId);

  return (
    <div className="video-player">
      <iframe src={url} title={videoId} width="1100" height="619" frameBorder="0"></iframe>
      <div className="selected-video">{/* <span>{selectedVideo[0].snippet.title}</span> */}</div>
      <div className="selected-video-channel">
        {/* <span>{selectedVideo[0].snippet.channelTitle}</span> */}
      </div>
    </div>
  );
};

export default VideoPlayer;
