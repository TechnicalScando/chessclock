import React from 'react'
import MessageBox from '../MessageBox/MessageBox'

import './ChatBox.css'

const ChatBox = ({ sendMessage, setMessage, message, messages }) => (

  <div className='chatcontainer'>
    <MessageBox messages={messages} />
    <div>
      <input
        type='text'
        value={message}
        onChange={({ target: { value } }) => setMessage(value)}
        onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
      />
      <button
        onClick={e => sendMessage(e)}
      >
      submit
      </button>
    </div>
  </div>

)

export default ChatBox
