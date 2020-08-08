import React, { useState, useEffect } from 'react'
import queryString from 'query-string'
import io from 'socket.io-client'

let socket

const Chat = ({ location }) => {
  const [name, setName] = useState('')
  const [room, setRoom] = useState('')
  const ENDPOINT = 'localhost:5000'

  // called on render and every time list changes
  useEffect(() => {
    const { name, room } = queryString.parse(location.search)

    socket = io(ENDPOINT)

    setName(name)
    setRoom(room)

    // emits every time useEffect is called, sends a 'join' event and passes 'name' and 'room' as an object
    socket.emit('join', { name, room })

    // useEffect only called if array changes
  }, [ENDPOINT, location.search])

  return (
    <h1>Chat</h1>
  )
}

export default Chat
