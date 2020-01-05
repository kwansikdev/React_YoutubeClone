import React from 'react';
import './VideoList.css';

const VideoListItems = props => {
  const videoInfo = {
    title: props.snippet.title,
    description: props.snippet.description,
    thumbnail: props.snippet.thumbnails.medium.url,
    channelTitle: props.snippet.channelTitle,
    videoId: props.id.videoId,
    channelId: props.snippet.channelId
  };

  return (
    <li
      className="video-list"
      onClick={() => {
        props.onSelectedVideo(videoInfo.videoId);
      }}
    >
      <div className="img">
        <img src={videoInfo.thumbnail} alt="video-thumbnails" />
      </div>
      <div className="video-info">
        <span>{videoInfo.channelTitle}</span>
        <small>{videoInfo.description}</small>
      </div>
    </li>
  );
};

export default VideoListItems;
