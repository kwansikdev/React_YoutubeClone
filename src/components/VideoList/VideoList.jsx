import React from 'react';
import uuid from 'uuid';
import './VideoList.css';
import VideoListItems from './VideoListItems';

const VideoList = props => {
  // API로 요청한 비디오 데이터를 map으로 하나하나 컴포넌트를 생성
  const video = props.videos.map(video => (
    <VideoListItems
      {...video}
      key={uuid.v4()}
      onSelectedVideo={props.onSelectedVideo}
    />
  ));
  return <ul className="video-lists">{video}</ul>;
};

export default VideoList;
