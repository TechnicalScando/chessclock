import React, { useState, useEffect } from 'react'
import queryString from 'query-string'
import io from 'socket.io-client'

import InfoBar from './InfoBar'
import Input from './Input'
import Messages from './Messages'
import TextContainer from './TextContainer'

let socket

const Chat = ({ location }) => {
  const [name, setName] = useState('')
  const [room, setRoom] = useState('')
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  const [users, setUsers] = useState([])
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
    // add message to array if message event is recieved
    socket.on('message', (message) => {
      setMessages(messages => [...messages, message])

      socket.on('newUser', (users) => {
        setUsers(users)
      })
    })
  }, [])// useEffect is called is messages array changes

  console.log(users)

  const sendMessage = (event) => {
    // prevent page from completely refreshing on message send
    event.preventDefault()

    // if there is a message emit a 'sendMessage' event then set input to empty string
    if (message) {
      socket.emit('sendMessage', message, () => setMessage(''))
    }
  }

  // console.log(message, messages)

  return (
    <div>
      <div>
        <InfoBar room={room} />
        <Messages messages={messages} name={name} />
        <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
      </div>
      <TextContainer users={users} />
    </div>
  )
}

export default Chat
