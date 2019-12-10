import React from 'react';
import axios from 'axios';
import './App.css';
import Nav from './components/Nav/Nav';
import SearchBar from './components/SearchBar/SearchBar';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      video: [],
      query: '',
    };

    Object.getOwnPropertyNames(App.prototype).forEach(key => this[key] = this[key].bind(this));
   }



  async YoutubeData() {
    const params = {
      key: '',
      q: '여행',
      part: 'snippet',
      maxResults: 10,
    }

    const { data } = await axios.get('https://www.googleapis.com/youtube/v3/search', { params });
    this.setState({
      video: [this.state.video, ...data.items],
      query: '여행'
    }, console.log(this.state, data.items));
  }

  componentDidMount() {
    this.YoutubeData()
  }

  render () {
    return (
      <div>
        <Nav>
          <SearchBar />
        </Nav>
      </div>
    );
  }
}

export default App;
