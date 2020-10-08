import React, { useState, useEffect } from 'react'
import MessageBox from '../MessageBox/MessageBox'

import './ChatBox.css'

const ChatBox = ({ socket }) => {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])

  useEffect(() => {
    // Recieve message event and update messages state

    if (socket !== undefined) {
      socket.on('message', message => {
        setMessages(messages => [...messages, message])
      })
    }
  }, [socket])

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

  return (

    <div className='chatcontainer'>
      <div className='chatheader' />
      <MessageBox className='messagebox' messages={messages} />
      <div className='inputcontainer'>
        <input
          className='chatinput'
          type='text'
          value={message}
          onChange={({ target: { value } }) => setMessage(value)}
          onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
        />
        <button
          className='submitbutton'
          onClick={e => sendMessage(e)}
        >
      submit
        </button>
      </div>
    </div>

  )
}

export default ChatBox
