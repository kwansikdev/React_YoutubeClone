import React from 'react';
import uuid from 'uuid';
import './VideoList.css';
import VideoListItems from './VideoListItems';

const VideoList = props => {
  const video = props.videos.map(video => (
    <VideoListItems
      {...video}
      key={uuid.v4()}
      onSelectedVideo={props.onSelectedVideo}
      // onSelectedChannel={props.onSelectedChannel}
    />
  ));
  return <ul className='video-lists'>{video}</ul>;
};

export default VideoList;
