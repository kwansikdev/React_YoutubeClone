import React from 'react';
import qs from 'query-string';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import './components/VideoPlayer/VideoPlayer.css';
import Nav from './components/Nav/Nav';
import SearchBar from './components/SearchBar/SearchBar';

import { likeCount } from './actions/action';

const VideoPlayer = props => {
  const { v } = qs.parse(props.location.search);
  const { id } = props.match.params;

  const videoId = v || id;
  if (!videoId) return null;

  const url = `https://youtube.com/embed/${videoId}`;
  return (
    <>
      <Nav>
        <SearchBar />
      </Nav>
      <div className='video-player'>
        <iframe
          src={url}
          title={videoId}
          width='1100'
          height='619'
          frameBorder='0'
        />
        <div className='selected-video'>
          {/* <span>{selectedVideo[0].snippet.title}</span> */}
          <button onClick={() => props.likeCount(videoId)}>
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
          </button>
          {/* {props.data[videoId] && props.data[videoId].count
            ? props.data[videoId].count
            : 0} */}
        </div>

        <div className='selected-video-channel'>
          {/* <span>{selectedVideo[0].snippet.channelTitle}</span> */}
        </div>
      </div>
    </>
  );
};

function mapStateToProps(state) {
  return {
    data: state.updateStore.data,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      likeCount,
    },
    dispatch,
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(VideoPlayer);
