import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import queryString from 'query-string'
import io from 'socket.io-client'

import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import PlayArea from '../PlayArea/PlayArea'
import ChatBox from '../ChatBox/ChatBox'
import CreateNewRoom from '../CreateNewRoom/CreateNewRoom'
import Settings from '../Settings/Settings'

let socket

const Room = ({ location }) => {
  // const ENDPOINT = 'https://ultimate-chess-clock.herokuapp.com/'
  const ENDPOINT = 'localhost:5000'

  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  const [timers, setTimers] = useState([])
  const [users, setUsers] = useState([])
  const [userCheck, setUserCheck] = useState(true)
  const [showSettings, setShowSettings] = useState(false)
  const [timerCount, setTimerCount] = useState(2)
  const [timerCountdown, setTimerCountdown] = useState(1000)

  // This useEffect run when the endpoint, location.search, or usercheck changes
  useEffect(() => {
    // Get name and room from url
    const { name, room } = queryString.parse(location.search)

    // create client side socket at current endpoint
    socket = io(ENDPOINT)

    // Send 'join' event with an object payload containing name and room
    // If a user name is already taken run callbuck function with the error
    // If the username is already taken set the usercheck to false and return error page
    socket.emit('join', { name, room }, (error) => {
      if (error) {
        setUserCheck(false)
      }

      socket.emit('settings', { timerCount, timerCountdown })
    })
  }, [ENDPOINT, location.search, setUserCheck])

  // Thos useEffect runs on any change
  useEffect(() => {
    // Recieve timer event and update timers state
    socket.on('timer', ({ timers }) => {
      setTimers(timers)
      console.log(timers)
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

  // Associate a timer with a user
  const joinTimer = (event) => {
    const timerIndex = event.target.value
    event.preventDefault()

    socket.emit('joinTimer', timerIndex)
  }

  const leaveTimer = (event) => {
    const timerIndex = event.target.value
    event.preventDefault()

    socket.emit('leaveTimer', timerIndex)
  }

  // Linked to button in PlayArea, switches between players timers
  const switchYield = () => {
    socket.emit('switchYield')
  }

  const settingsToggle = () => {
    setShowSettings(!showSettings)
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

  const sendSettings = (event) => {
    // need to prevent default event behaviour
    event.preventDefault()

    socket.emit('settings', { timerCount, timerCountdown })
    settingsToggle()
  }

  const debug = (event) => {
    console.log(event.target.value)
  }

  // if there is a user render the main webpage, otherwise render the error page
  if (userCheck) {
    return (
      <div className='maindiv'>
        <Header />
        <PlayArea
          timers={timers}
          startTimer={startTimer}
          switchYield={switchYield}
          clearTimer={clearTimer}
          settingsToggle={settingsToggle}
          joinTimer={joinTimer}
          leaveTimer={leaveTimer}

        />
        <CreateNewRoom
          users={users}
        />
        <ChatBox
          sendMessage={sendMessage}
          setMessage={setMessage}
          message={message}
          messages={messages}
        />
        {showSettings &&
          <Settings
            timerCount={timerCount}
            timerCountdown={timerCountdown}
            setTimerCount={setTimerCount}
            setTimerCountdown={setTimerCountdown}
            settingsToggle={settingsToggle}
            sendSettings={sendSettings}
            debug={debug}
          />}

        <Footer />
      </div>

    )
  } else {
    return (
      <div>
        <p>uhoh username taken</p>
        <Link to='/'>
          <button className='SubmitButton' type='go back'>Submit</button>
        </Link>
      </div>
    )
  }
}

export default Room
