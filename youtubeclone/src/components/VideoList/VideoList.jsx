import React from 'react';
import uuid from 'uuid';
import VideoListItems from '../VideoList/VideoListItems';
import './VideoList.css'

const VideoList = props => {
  const videos = props.videos.map(video =>
    <VideoListItems
      {...video}
      key={uuid.v4()}
      onSelectedVideo={props.onSelectedVideo}
    />
  );

  return (
    // 나중에 채널과 영상을 구분해서 UI를 따로 구현!!
    <ul className="video-lists">
      {videos}
    </ul>
  )
}

export default VideoList;