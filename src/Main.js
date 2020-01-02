import React from 'react';
import axios from 'axios';
import qs from 'query-string';
import InfiniteScroller from 'react-infinite-scroller';
import uuid from 'uuid';
// import { debounce } from 'lodash';

import './App.css';

import Nav from './components/Nav/Nav';
import SearchBar from './components/SearchBar/SearchBar';
import VideoList from './components/VideoList/VideoList';

import { spinner } from './components/images/spinner.gif';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateQuery } from './actions/action';

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      videos: [],
      nextPageToken: null,
    };

    this.defaultState = this.state;
    Object.getOwnPropertyNames(Main.prototype).forEach(
      key => (this[key] = this[key].bind(this)),
    );
  }

  _getYoutubeData = async (query, isChanged) => {
    try {
      if (isChanged) {
        this.setState(this.defaultState);
      }
      if (!query) return;

      const params = {
        key: process.env.REACT_APP_KEY,
        part: 'snippet',
        q: query,
        maxResults: 10,
        pageToken: this.state.nextPageToken,
      };

      const { data } = await axios.get(
        'https://www.googleapis.com/youtube/v3/search',
        {
          params,
        },
      );

      this.setState({
        videos: [...this.state.videos, ...data.items],
        nextPageToken: data.nextPageToken,
      });
    } catch (e) {}
  };

  getYoutubeData(query) {
    let isChanged;
    if (this.props.query !== query) {
      isChanged = true;
      this.props.updateQuery(query);
    }
    this._getYoutubeData(query, isChanged);
  }

  // async getYoutubeChannelData(channelId) {
  //   const params = {
  //     key: process.env.REACT_APP_KEY,
  //     part: 'snippet',
  //     id: channelId,
  //   };

  //   const { data } = await axios.get(
  //     'https://www.googleapis.com/youtube/v3/channels',
  //     {
  //       params,
  //     },
  //   );

  //   console.log(data.items[0]);
  // }

  componentDidMount() {
    // this.getYoutubeData('강지');
    const { props } = this;
    if (props.location) {
      const { search_query } = qs.parse(props.location.search);

      if (search_query) this.getYoutubeData(search_query);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { props } = this;
    if (props.location) {
      const { search_query } = qs.parse(props.location.search);
      const { search_query: prev } = qs.parse(prevProps.location.search);

      if (search_query !== prev) {
        this.getYoutubeData(search_query);
      }
    }
  }

  render() {
    return (
      <div>
        <Nav>
          <SearchBar
            onSearchVideos={query =>
              this.props.history.push(`/results?search_query=${query}`)
            }
          />
        </Nav>
        <InfiniteScroller
          // loadMore={() => this.getYoutubeData(this.props.qeury)}
          hasMore={!!this.state.nextPageToken}
          loader={
            <div key={uuid.v4()} className='loader'>
              <img src={spinner} alt='loading' />
            </div>
          }
        >
          <VideoList
            {...this.state}
            onSelectedVideo={id => this.props.history.push(`watch?v=${id}`)}
            // onSelectedChannel={channelId =>
            //   this.getYoutubeChannelData(channelId)
            // }
          />
        </InfiniteScroller>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    query: state.updateStore.query,
    data: state.updateStore.data,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      updateQuery,
    },
    dispatch,
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
