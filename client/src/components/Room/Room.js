import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import queryString from 'query-string'
import io from 'socket.io-client'

import './Room.css'

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

  const [name, setName] = useState('')

  const [users, setUsers] = useState([])
  const [userCheck, setUserCheck] = useState(true)

  // This useEffect run when the endpoint, location.search, or usercheck changes
  useEffect(() => {
    // Get name and room from url
    const { name, room } = queryString.parse(location.search)

    setName(name)
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
    // Recieve roomData event and update users state
    socket.on('roomData', ({ users }) => {
      setUsers(users)
    })
  }, [])

  // if there is a user render the main webpage, otherwise render the error page
  if (userCheck) {
    return (
      <div className='maindiv'>
        <Header />
        <PlayArea socket={socket} name={name} />
        <CreateNewRoom users={users} />
        <ChatBox socket={socket} />
        <Settings socket={socket} />
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
