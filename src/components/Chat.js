import React, { useState, useEffect } from 'react'
import queryString from 'query-string'
import io from 'socket.io-client'

let socket

const Chat = ({ location }) => {
  const [name, setName] = useState('')
  const [room, setRoom] = useState('')
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  const ENDPOINT = 'localhost:5000'

  // called on render and every time list changes
  useEffect(() => {
    const { name, room } = queryString.parse(location.search)

    socket = io(ENDPOINT)

    setName(name)
    setRoom(room)

    // emits every time useEffect is called, sends a 'join' event
    // and passes 'name' and 'room' as an object
    // arrow function used for error handling
    socket.emit('join', { name, room }, () => {

    })

    // return used for unmounting
    return () => {
      socket.emit('disconnect')

      socket.off()
    }

    // useEffect only called if array changes
  }, [ENDPOINT, location.search])

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages([...messages, message])
    })
  }, [messages])

  return (
    <div className='outerContainer'>
      <div className='container'>
        <input value={message} onChange={(event) => setMessage(event.target.value)} />
      </div>
    </div>
  )
}

export default Chat
