import ScrollToBottom from 'react-scroll-to-bottom'
import React from 'react'

const MessageBox = ({ messages }) => (
  <ScrollToBottom className='messagebox'>
    {messages.map((message, i) => <p key={i}>{message.user}: {message.text}</p>)}
  </ScrollToBottom>
)

export default MessageBox
