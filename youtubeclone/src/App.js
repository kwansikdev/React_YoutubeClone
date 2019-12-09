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

    };

    Object.getOwnPropertyNames(App.prototype).forEach(key => this[key] = this[key.bind(this)]);
   }



  async YoutubeData(query) {

    const params = {
      key: 'AIzaSyBVkcJm7e-M4B3kiiWeG-pepm78MGRiXXA',
      q: query,
      part: 'snippet',
    }

    const { data } = await axios.get('https://www.googleapis.com/youtube/v3/search', { params });
    this.setState({
      video: [...this.state, ...data.items]
    }, console.log(data.items));
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
