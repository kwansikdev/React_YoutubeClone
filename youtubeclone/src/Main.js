import React from 'react';
import axios from 'axios';
import InfiniteScroller from 'react-infinite-scroller';
import { withRouter } from 'react-router-dom';
import qs from 'query-string';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import './App.css';
import spinner from './components/images/spinner.gif';

import Nav from './components/Nav/Nav';
import SearchBar from './components/SearchBar/SearchBar';
import VideoList from './components/VideoList/VideoList';
import { updateQuery } from './actions/action';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      videos: [],
      selectedVideoId: null,
      query: this.props.query,
      nextPageToken: null,
      title: '',
      channelInfo: [],
    };
    this.defaultState = this.state;
    Object.getOwnPropertyNames(App.prototype).forEach(
      key => (this[key] = this[key].bind(this)),
    );
  }

  async _YoutubeData(query) {
    // history가 계속 쌓이는 문제가 생겼었음

    // if (!query) {
    //   this.setState(this.defaultState);
    //   this.props.history.push(`/results?search_query=${query}`);
    // }
    // if (this.props.query !== query) {
    //   this.setState(this.defaultState);
    //   this.props.history.push(`/results?search_query=${query}`);
    // }
    this.props.updateQuery(query);

    try {
      const { nextPageToken } = this.state;
      const params = {
        // key 꼭 지우고 커밋하기!!
        key: process.env.REACT_APP_KEY,
        q: query,
        part: 'snippet',
        maxResults: 10,
        pageToken: nextPageToken,
      };

      const { data } = await axios.get(
        'https://www.googleapis.com/youtube/v3/search',
        {
          params,
        },
      );

      this.setState(
        {
          videos: [...this.state.videos, ...data.items],
          query: this.props.query,
          nextPageToken: data.nextPageToken,
        },
        () => {
          console.log(this.state);
        },
      );
    } catch (e) {}
  }

  YoutubeData(query) {
    if (this.props.query !== query) {
      this.setState(this.defaultState);
    }
    this._YoutubeData(query);
  }

  // async getSeletedVideoInfo(channelId) {
  //   const channelParams = {
  //     key: process.env.REACT_APP_KEY,
  //     part: 'snippet',
  //     id: channelId,
  //   };
  //   const { channel } = await axios.get(
  //     'https://www.googleapis.com/youtube/v3/channels',
  //     {
  //       channelParams,
  //     },
  //   );
  //   this.setState({
  //     channelInfo: [...channel],
  //   });
  // }

  componentDidMount() {
    const { props } = this;
    if (props.location) {
      const { search_query } = qs.parse(props.location.search);
      if (search_query) this.YoutubeData(search_query);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { props } = this;

    if (props.location) {
      const { search_query } = qs.parse(props.location.search);
      const { search_query: prev } = qs.parse(prevProps.location.search);

      if (search_query !== prev) this.YoutubeData(search_query || '');
    }
  }

  render() {
    return (
      <div>
        <Nav>
          <SearchBar
            onSearchData={value =>
              this.props.history.push(`/results?search_query=${value}`)
            }
          />
        </Nav>
        <InfiniteScroller
          // loadMore={() => this.YoutubeData(this.props.query)}
          // hasMore={!!this.state.nextPageToken && !this.state.selectedVideo}
          loader={
            <div className='spinner'>
              <img src={spinner} alt='loading' />
            </div>
          }
        >
          <VideoList
            {...this.state}
            onSelectedVideo={selectedVideo =>
              this.props.history.push(`/watch?v=${selectedVideo}`)
            }
          />
        </InfiniteScroller>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    query: state.updateQuery.query,
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
