import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Join from './components/Join'
import Room from './components/Room'
import Chat from './components/Chat'

const App = () => (
  <Router>
    <Route path='/' exact component={Join} />
    <Route path='/Room' exact component={Room} />
    <Route path='/Chat' exact component={Chat} />
  </Router>
)

export default App
