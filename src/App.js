import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import Join from './components/Join';
import Room from './components/Room';

const App = () => (
  <Router>
    <Route path="/" exact component={Join} />
    <Route path="/Room" exact component={Room} />
  </Router>
);

export default App;
