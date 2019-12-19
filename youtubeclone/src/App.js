import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import Main from './Main';
import VideoPlayer from './VideoPlayer';
import reducers from './reducers';

function App() {
  return (
    <Provider store={createStore(reducers, composeWithDevTools())}>
      <Router>
        <Switch>
          <Route path='/watch/:id' component={VideoPlayer} />
          <Route path='/watch' component={VideoPlayer} />
          <Route path='/results' component={Main} />
          <Route path='/' component={Main} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
