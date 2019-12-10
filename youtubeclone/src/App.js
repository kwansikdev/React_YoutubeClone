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
    this.defaultState = this.state;
    Object.getOwnPropertyNames(App.prototype).forEach(key => this[key] = this[key].bind(this));
   }



  async YoutubeData(query) {
    if(!query) return;
    if(this.state.query !== query) {
      this.setState(this.defaultState);
    }
    const params = {
      key: '',
      q: query,
      part: 'snippet',
      maxResults: 10,
    }

    const { data } = await axios.get('https://www.googleapis.com/youtube/v3/search', { params });
    this.setState({
      video: [...this.state.video, ...data.items],
      query
    }, () => {console.log(this.defaultState, this.state)});

  }

  componentWillMount() {
    this.YoutubeData('여행');
  }

  setInput(input) {
    this.setState({ input });
  }

  render () {
    const { input } = this.state;
    return (
      <div>
        <Nav>
          <SearchBar input={ input } setInput={this.setInput} onSearchData={this.YoutubeData}/>
        </Nav>
      </div>
    );
  }
}

export default App;
