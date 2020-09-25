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

  const [name, setName] = useState('')
  const [room, setRoom] = useState('')
  const [message, setMessage] = useState('')
  const [timers, setTimers] = useState([])
  const [url, setUrl] = useState('')
  const [userCheck, setUserCheck] = useState(true)

  useEffect(() => {
    const { name, room } = queryString.parse(location.search)
    setName(name)
    setRoom(room)
    setUrl(window.location.href)

    socket = io(ENDPOINT)
    socket.emit('join', { name, room }, (error) => {
      if (error) {
        setUserCheck(false)
      }
    })

    socket.emit('timersRequest')

    socket.on('timers', timer => {
      setTimers(timers => [...timers, timer])
    })
  }, [ENDPOINT, location.search, setUserCheck])

  useEffect(() => {
    socket.on('timer', (data) => {
      setTimers(data.timers)
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

  if (userCheck) {
    return (
      <div className={css(styles.MainDiv)}>
        <Header room={room} name={name} />
        <PlayArea
          timers={timers}
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
  } else {
    return (
      <div>
        <p>uhoh username taken</p>
      </div>
    )
  }
}

const styles = StyleSheet.create({
  MainDiv: {

  }
})

export default Room
