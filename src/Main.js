import React from 'react';
import axios from 'axios';
import qs from 'query-string';
import InfiniteScroller from 'react-infinite-scroller';
import uuid from 'uuid';
// import { debounce } from 'lodash';

// css & img
import './App.css';
import { spinner } from './components/images/spinner.gif';

// Component
import Nav from './components/Nav/Nav';
import SearchBar from './components/SearchBar/SearchBar';
import VideoList from './components/VideoList/VideoList';

// redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateQuery } from './actions/action';

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      videos: [],
      nextPageToken: null
    };

    // default State 설정
    this.defaultState = this.state;

    // class내에 정의된 함수들을 전부 this로 binding
    Object.getOwnPropertyNames(Main.prototype).forEach(
      key => (this[key] = this[key].bind(this))
    );
  }

  // query값을 받아서 Youtube data API로 요청
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
        pageToken: this.state.nextPageToken
      };

      const { data } = await axios.get(
        'https://www.googleapis.com/youtube/v3/search',
        {
          params
        }
      );

      this.setState({
        videos: [...this.state.videos, ...data.items],
        nextPageToken: data.nextPageToken
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

  // rendering 이후 url에 search_query값이 있을 경우
  componentDidMount() {
    // this.getYoutubeData('강지');
    const { props } = this;
    if (props.location) {
      const { search_query } = qs.parse(props.location.search);

      if (search_query) this.getYoutubeData(search_query);
    }
  }

  // 직접 url에서 search_query 값을 변경했을 경우
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
            // router
            onSearchVideos={query =>
              this.props.history.push(`/results?search_query=${query}`)
            }
          />
        </Nav>
        <InfiniteScroller
        // 무한로딩
        // loadMore={() => this.getYoutubeData(this.props.qeury)}
        // hasMore={!!this.state.nextPageToken}
        // loader={
        //   <div key={uuid.v4()} className="loader">
        //     <img src={spinner} alt="loading" />
        //   </div>
        // }
        >
          <VideoList
            {...this.state}
            // router, 비디오리스트를 선택할 시 url 변경
            onSelectedVideo={id => this.props.history.push(`watch?v=${id}`)}
          />
        </InfiniteScroller>
      </div>
    );
  }
}

// redux의 변수를 props로 연결
function mapStateToProps(state) {
  return {
    query: state.updateStore.query,
    data: state.updateStore.data
  };
}

// action 생성자함수와 reducer를 dispatch
function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      updateQuery
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
