import React from 'react'
import MessageBox from '../MessageBox/MessageBox'

import './ChatBox.css'

const ChatBox = ({ sendMessage, setMessage, message, messages }) => (

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

export default ChatBox
