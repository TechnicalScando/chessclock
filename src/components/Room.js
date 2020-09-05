import React from 'react'
// import { StyleSheet, css } from 'aphrodite'

import queryString from 'query-string'
import io from 'socket.io-client'

import Header from './Header'
import Footer from './Footer'
import PlayArea from './PlayArea'
import ChatBox from './ChatBox'
import CreateNewRoom from './CreateNewRoom'

let socket

const Room = () => {
  const ENDPOINT = 'localhost:5000'

  socket = io(ENDPOINT)

  return (
    <div>
      <Header />
      <PlayArea />
      <CreateNewRoom />
      <ChatBox />
      <Footer />
    </div>

  )
}

export default Room
