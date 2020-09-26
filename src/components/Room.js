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
  const [messages, setMessages] = useState([])
  const [timers, setTimers] = useState([])
  const [url, setUrl] = useState('')
  const [users, setUsers] = useState([])
  const [userCheck, setUserCheck] = useState(true)

  // This useEffect run when the endpoint, location.search, or usercheck changes
  useEffect(() => {
    // Get name and room from url
    const { name, room } = queryString.parse(location.search)
    setName(name)
    setRoom(room)
    // Get current url
    setUrl(window.location.href)

    // create client side socket at current endpoint
    socket = io(ENDPOINT)

    // Send 'join' event with an object payload containing name and room
    // If a user name is already taken run callbuck function with the error
    // If the username is already taken set the usercheck to false and return error page
    socket.emit('join', { name, room }, (error) => {
      if (error) {
        setUserCheck(false)
      }
    })
  }, [ENDPOINT, location.search, setUserCheck])

  // Thos useEffect runs on any change
  useEffect(() => {
    // Recieve timer event and update timers state
    socket.on('timer', (data) => {
      setTimers(data.timers)
    })

    // Recieve message event and update messages state
    socket.on('message', message => {
      setMessages(messages => [...messages, message])
    })

    // Recieve roomData event and update users state
    socket.on('roomData', ({ users }) => {
      setUsers(users)
    })
  }, [])

  // Linked to button in PlayArea, starts the currently selected timer
  const startTimer = () => {
    socket.emit('timerStart')
  }

  // Linked to button in PlayArea, clears the currently selected timer
  const clearTimer = () => {
    socket.emit('clearTimer')
  }

  // Linked to button in PlayArea, switches between players timers
  const switchYield = () => {
    socket.emit('switchYield')
  }

  // Linked to input event in Chatbox
  // if there is a value a message is emmited to the server
  const sendMessage = (event) => {
    // need to prevent default event behaviour
    event.preventDefault()

    if (message) {
      socket.emit('sendMessage', message)
      setMessage('')
    }
  }

  // if there is a user render the main webpage, otherwise render the error page
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
        <CreateNewRoom
          url={url}
          users={users}
        />
        <ChatBox
          sendMessage={sendMessage}
          setMessage={setMessage}
          message={message}
          messages={messages}
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
