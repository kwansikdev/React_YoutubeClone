import React from 'react';
import './VideoList.css';

const VideoListItems = props => {
  const videoData = {
    title: props.snippet.title,
    channelTitle: props.snippet.channelTitle,
    thumnail: props.snippet.thumbnails.medium.url,
    discription: props.snippet.description,
    id: props.id.videoId,
  }

  return (
    <li className="video-list" onclick={() => props.onSelectedVideo(videoData.id)}>
      <div className="img">
        <img src={videoData.thumnail} alt="video-thumnail"/>
      </div>
      <div className="video-info">
        <span>{videoData.title}</span>
        <small className="">{videoData.channelTitle}</small>
        <small className="">{videoData.discription}</small>
      </div>
    </li>
  )
}

export default VideoListItems;