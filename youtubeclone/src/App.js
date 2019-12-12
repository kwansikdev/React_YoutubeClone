import React from 'react';
import axios from 'axios';
// import debounce from 'lodash';
import InfiniteScroller from 'react-infinite-scroller';

import './App.css';
import spinner from './components/images/spinner.gif';

import Nav from './components/Nav/Nav';
import SearchBar from './components/SearchBar/SearchBar';
import VideoList from './components/VideoList/VideoList';
import VideoPlayer from './components/VideoPlayer/VideoPlayer';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      videos: [],
      selectedVideoId: null,
      query: '',
      nextPageToken: null,
      title: '',
    };
    this.defaultState = this.state;
    Object.getOwnPropertyNames(App.prototype).forEach(key => this[key] = this[key].bind(this));
   }



  async YoutubeData(query) {
    if(!query) return;
    if(this.state.query !== query) {
      this.setState(this.defaultState);
    }

    const { nextPageToken } = this.state;
    const params = {
      key: '',
      q: query,
      part: 'snippet',
      maxResults: 10,
      pageToken: nextPageToken,
    };

    const { data } = await axios.get('https://www.googleapis.com/youtube/v3/search', { params });
    this.setState({
      videos: [...this.state.videos, ...data.items],
      query,
      nextPageToken: data.nextPageToken,
    }, () => {console.log(this.state.videos)});

  }

  componentWillMount() {
    this.YoutubeData('강지');
  }

  setInput(input) {
    this.setState({ input });
  }

  setVideoId(id) {
    this.setState({selectedVideoId: id})
  }

  render () {
    const { selectedVideoId } = this.state;
    return (
      <div>
        <Nav>
          <SearchBar setInput={this.setInput} onSearchData={this.YoutubeData}/>
        </Nav>
        {
          selectedVideoId
          ? <VideoPlayer videoId={selectedVideoId}/>
          : <InfiniteScroller
              // loadMore={() => this.YoutubeData(this.state.query)}
              // hasMore={!!this.state.nextPageToken && !this.state.selectedVideo}
              loader={
                <div className="spinner">
                  <img src={spinner} alt="loading" />
                </div>
              }
            >
              <VideoList
                {...this.state}
                onSelectedVideo={this.setVideoId}
              />
          </InfiniteScroller>
        }
      </div>
    );
  }
}

export default App;
