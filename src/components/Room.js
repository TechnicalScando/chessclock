import React, { useState, useEffect } from 'react'
import { StyleSheet, css } from 'aphrodite'

import queryString from 'query-string'
import io from 'socket.io-client'

import Header from './Header'
import Footer from './Footer'
import PlayArea from './PlayArea'
import ChatBox from './ChatBox'
import CreateNewRoom from './CreateNewRoom'

let socket

const Room = ({ location }) => {
  const ENDPOINT = 'localhost:5000'
  const DEFAULTTIMER = '00:00:00'

  const [name, setName] = useState('')
  const [room, setRoom] = useState('')
  const [message, setMessage] = useState('')
  const [timer, setTimer] = useState(DEFAULTTIMER)
  const [url, setUrl] = useState('')

  useEffect(() => {
    const { name, room } = queryString.parse(location.search)
    setName(name)
    setRoom(room)
    setUrl(window.location.href)

    socket = io(ENDPOINT)
    socket.emit('join', { name, room })
  }, [ENDPOINT, location.search])

  useEffect(() => {
    socket.on('timer', (data) => {
      setTimer(data.timer)
    })
  })

  const startTimer = () => {
    console.log('Timer has started on front end')
    socket.emit('timerStart')
  }

  const clearTimer = () => {
    console.log('Timer has been cleared on front end')
    socket.emit('clearTimer')
  }

  const switchYield = () => {
    console.log('Timer Yielded! TODO')
    socket.emit('switchYield')
  }

  const sendMessage = (event) => {
    event.preventDefault()
    console.log(message)
    socket.emit('sendMessage', message)
    setMessage('')
  }

  return (
    <div className={css(styles.MainDiv)}>
      <Header room={room} name={name} />
      <PlayArea
        timer={timer}
        startTimer={startTimer}
        switchYield={switchYield}
        clearTimer={clearTimer}
      />
      <CreateNewRoom url={url} />
      <ChatBox
        sendMessage={sendMessage}
        setMessage={setMessage}
        message={message}
      />
      <Footer />
    </div>

  )
}

const styles = StyleSheet.create({
  MainDiv: {

  }
})

export default Room
