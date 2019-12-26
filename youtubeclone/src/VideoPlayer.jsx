import React, { useState, useEffect } from 'react';
import qs from 'query-string';
import axios from 'axios';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import './components/VideoPlayer/VideoPlayer.css';
import Nav from './components/Nav/Nav';
import SearchBar from './components/SearchBar/SearchBar';

import { likeCount, dislikeCount } from './actions/action';

const VideoPlayer = props => {
  const [videoData, setVideoData] = useState({
    channelId: '',
    publishedAt: '',
    title: '',
    description: '',
    tags: null,
    viewCount: 0,
    likeCount: 0,
    dislikeCount: 0,
  });

  const [channelData, setChannelData] = useState({
    title: '',
    description: '',
    thumbnails: '',
    subscriberCount: null,
  });

  const { v } = qs.parse(props.location.search);
  const { id } = props.match.params;

  const videoId = v || id;
  const url = `https://youtube.com/embed/${videoId}`;

  const getYoutubeVideoData = async videoId => {
    console.log('asdas');
    try {
      const params = {
        key: process.env.REACT_APP_KEY,
        part: 'snippet, statistics',
        id: videoId,
      };

      const { data } = await axios.get(
        'https://www.googleapis.com/youtube/v3/videos',
        {
          params,
        },
      );

      setVideoData({
        channelId: data.items[0].snippet.channelId,
        publishedAt: data.items[0].snippet.publishedAt,
        title: data.items[0].snippet.title,
        description: data.items[0].snippet.description,
        tags: data.items[0].snippet.tags,
        viewCount: data.items[0].statistics.viewCount,
        likeCount: data.items[0].statistics.likeCount,
        dislikeCount: data.items[0].statistics.dislikeCount,
      });
    } catch (e) {}
  };

  const getYoutubeChannelData = async channelId => {
    console.log(videoData.channelId);
    if (!videoData.channelId) return;

    const params = {
      key: process.env.REACT_APP_KEY,
      part: 'snippet, statistics',
      id: channelId,
    };

    const { data } = await axios.get(
      'https://www.googleapis.com/youtube/v3/channels',
      {
        params,
      },
    );

    setChannelData({
      title: data.items[0].snippet.title,
      description: data.items[0].snippet.description,
      thumbnails: data.items[0].snippet.thumbnails.high.url,
      subscriberCount: data.items[0].statistics.subscriberCount,
    });
  };

  useEffect(() => {
    getYoutubeVideoData(videoId);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    getYoutubeChannelData(videoData.channelId);
    // eslint-disable-next-line
  }, [videoData.channelId]);

  return (
    <>
      <Nav>
        <SearchBar
          onSearchVideos={query =>
            props.history.push(`/results?search_query=${query}`)
          }
        />
      </Nav>
      <div className='video-player'>
        <iframe
          src={url}
          title={videoId}
          width='1100'
          height='619'
          frameBorder='0'
          allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
          allowfullscreen
        />
        <div className='selected-video'>
          <div className='video-title'>
            <p>{videoData.title}</p>
          </div>
          <div className='info'>
            <div>
              <small>
                조회수{' '}
                {videoData.viewCount
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                회
              </small>
              &#183;&nbsp;
              <small>
                {videoData.publishedAt
                  .slice(0, 10)
                  .split('-')
                  .reduce((pre, cur) => pre + cur + '. ', '')}
              </small>
            </div>
            <div className='btn'>
              <div className='like'>
                <button
                  className='like-btn'
                  onClick={() => props.likeCount(videoId)}
                >
                  <svg
                    viewBox='0 0 24 24'
                    preserveAspectRatio='xMidYMid meet'
                    focusable='false'
                    className='style-scope yt-icon'
                    style={{
                      pointerEvents: 'none',
                      display: 'block',
                      width: '100%',
                      height: '100%',
                    }}
                  >
                    <g className='style-scope yt-icon'>
                      <path
                        d='M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-1.91l-.01-.01L23 10z'
                        className='style-scope yt-icon'
                      />
                    </g>
                  </svg>
                  <span>
                    {props.data[videoId] && props.data[videoId].likeCount
                      ? props.data[videoId].likeCount + +videoData.likeCount
                      : videoData.likeCount}
                  </span>
                </button>
              </div>
              <div className='dislike'>
                <button
                  className='dislike-btn'
                  onClick={() => props.dislikeCount(videoId)}
                >
                  <svg
                    viewBox='0 0 24 24'
                    preserveAspectRatio='xMidYMid meet'
                    focusable='false'
                    className='style-scope yt-icon'
                    style={{
                      pointerEvents: 'none',
                      display: 'block',
                      width: '100%',
                      height: '100%',
                    }}
                  >
                    <g className='style-scope yt-icon'>
                      <path
                        d='M15 3H6c-.83 0-1.54.5-1.84 1.22l-3.02 7.05c-.09.23-.14.47-.14.73v1.91l.01.01L1 14c0 1.1.9 2 2 2h6.31l-.95 4.57-.03.32c0 .41.17.79.44 1.06L9.83 23l6.59-6.59c.36-.36.58-.86.58-1.41V5c0-1.1-.9-2-2-2zm4 0v12h4V3h-4z'
                        className='style-scope yt-icon'
                      />
                    </g>
                  </svg>
                  <span>
                    {props.data[videoId] && props.data[videoId].dislikeCount
                      ? props.data[videoId].dislikeCount +
                        +videoData.dislikeCount
                      : videoData.dislikeCount}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className='selected-video-channel'>
          <div className='channel-info'>
            <img src={channelData.thumbnails} alt='channel-logo' />
            <div className='channel-info-1'>
              <p>{channelData.title}</p>
              <small>{channelData.subscriberCount} 명</small>
            </div>
          </div>
          <div className='channel-info-2'>{videoData.description}</div>
        </div>
      </div>
    </>
  );
};

function mapStateToProps(state) {
  return {
    query: state.updateStore.query,
    data: state.updateStore.data,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      likeCount,
      dislikeCount,
    },
    dispatch,
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(VideoPlayer);
