import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Room from './components/Room'

const App = () => (
  <Router>
    <Route path='/' exact component={Room} />
  </Router>
)

export default App
