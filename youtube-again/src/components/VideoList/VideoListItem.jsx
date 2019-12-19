import React from 'react';
import './VideoList.css';

const VideoListItem = props => {
  const videoInfo = {
    title: props.snippet.title,
    channelTitle: props.snippet.channelTitle,
    thumbnail: props.snippet.thumbnails.high.url,
    description: props.snippet.description,
    id: props.id.videoId
  };

  return (
    <li className="video-list" onClick={() => props.onSelectedVideoId(videoInfo.id)}>
      <div className="img">
        <img src={videoInfo.thumbnail} alt="thumbnail" />
      </div>
      <div className="video-info">
        <span>{videoInfo.channelTitle}</span>
        <small>{videoInfo.description}</small>
      </div>
    </li>
  );
};

export default VideoListItem;
