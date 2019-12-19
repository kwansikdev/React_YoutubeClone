import React, { Component } from 'react';
import axios from 'axios';
import InfiniteScroller from 'react-infinite-scroller';
import { withRouter } from 'react-router-dom';
import qs from 'query-string';

import './App.css';
import Nav from './components/Nav/Nav';
import SearchBar from './components/SearchBar/SearchBar';
import VideoList from './components/VideoList/VideoList';
import spinner from './components/images/spinner.gif';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      videos: [],
      query: '',
      nextPageToken: null,
      selectedVideoId: null
    };

    this.defaultState = this.state;

    Object.getOwnPropertyNames(App.prototype).forEach(key => (this[key] = this[key].bind(this)));
  }

  async getYoutubeData(query) {
    if (!query) {
      this.setState(this.defaultState);
      this.props.history.push(`/results?search_query=${query}`);
    }

    if (this.state.query !== query) {
      this.setState(this.defaultState);
      this.props.history.push(`/results?search_query=${query}`);
    }
    const params = {
      key: process.env.REACT_APP_KEY,
      part: 'snippet',
      q: query,
      maxResults: 10,
      pageToken: this.state.nextPageToken
    };

    const { data } = await axios.get('https://www.googleapis.com/youtube/v3/search', { params });
    this.setState(
      {
        videos: [...this.state.videos, ...data.items],
        query,
        nextPageToken: data.nextPageToken
      },
      () => {
        console.log(this.state);
      }
    );
  }
  selectedVideoId(id) {
    this.setState({ selectedVideoId: id }, () => {
      console.log(this.state);
    });
  }

  componentDidMount() {
    const { props } = this;
    if (props.location) {
      const { search_query } = qs.parse(props.location.search);
      if (search_query) this.getYoutubeData(search_query);
    }
  }

  render() {
    return (
      <div>
        <Nav>
          <SearchBar onSearchData={this.getYoutubeData} />
        </Nav>
        <InfiniteScroller
          // loadMore={() => this.getYoutubeData(this.state.query)}
          hasMore={!!this.nextPageToken}
          loader={
            <div className="spinner">
              <img src={spinner} alt="spinner" />
            </div>
          }
        >
          <VideoList
            {...this.state}
            onSelectedVideoId={selectedVideoId =>
              this.props.history.push(`/watch?v=${selectedVideoId}`)
            }
          />
        </InfiniteScroller>
      </div>
    );
  }
}

export default withRouter(App);
