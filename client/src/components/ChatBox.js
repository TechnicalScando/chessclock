import React from 'react'
import { StyleSheet, css } from 'aphrodite'
import MessageBox from './MessageBox'

const ChatBox = ({ sendMessage, setMessage, message, messages }) => (

  <div className={css(styles.chatBoxDiv)}>
    <MessageBox messages={messages} />
    <div className={css(styles.InputSubmit)}>
      <input
        className={css(styles.ChatInput)}
        type='text'
        value={message}
        onChange={({ target: { value } }) => setMessage(value)}
        onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
      />
      <button
        className={css(styles.ChatInputButton)}
        onClick={e => sendMessage(e)}
      >
      submit
      </button>
    </div>
  </div>

)

const styles = StyleSheet.create({
  chatBoxDiv: {

  },

  InputSubmit: {

  },

  ChatInput: {

  },

  ChatInputButton: {

  }
})

export default ChatBox
