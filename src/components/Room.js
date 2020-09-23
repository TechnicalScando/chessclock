import React, { useState, useEffect } from 'react'
// import { StyleSheet, css } from 'aphrodite'

import queryString from 'query-string'
import io from 'socket.io-client'

import Header from './Header'
import Footer from './Footer'
import PlayArea from './PlayArea'
import ChatBox from './ChatBox'
import CreateNewRoom from './CreateNewRoom'

let socket
let timerStarted = false

const Room = () => {
  const [timer, setTimer] = useState('')

  const ENDPOINT = 'localhost:5000'

  useEffect(() => {
    socket = io(ENDPOINT)
    socket.emit('join')
  }, [ENDPOINT])

  useEffect(() => {
    socket.on('timer', (data) => {
      setTimer(data.timer)
    })
  })
  const startTimer = () => {
    if (!timerStarted) {
      setTimer('00:00:00')
      console.log('Timer has started on front end')
      socket.emit('timerStart')
      timerStarted = true
    } else {
      console.log('Timer is already started!')
    }
  }

  const clearTimer = () => {
    setTimer('')
    console.log('Timer has been cleared')
    timerStarted = false
  }

  return (
    <div>
      <Header />
      <PlayArea
        timer={timer}
        startTimer={startTimer}
        clearTimer={clearTimer}
      />
      <CreateNewRoom />
      <ChatBox />
      <Footer />
    </div>

  )
}

export default Room
