import React from 'react';
import uuid from 'uuid';

import './VideoList.css';
import VideoListItem from './VideoListItem';

const VideoList = props => {
  const video = props.videos.map(video => (
    <VideoListItem {...video} key={uuid.v4()} onSelectedVideoId={props.onSelectedVideoId} />
  ));
  return <ul className="video-lists">{video}</ul>;
};

export default VideoList;
