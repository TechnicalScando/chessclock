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
    border: 1,
    borderStyle: 'solid',
    width: 374,
    height: 523,
    top: 336,
    left: 1001,
    position: 'absolute'
  },

  InputSubmit: {
    width: 374
  },

  ChatInput: {
    width: '75%',
    float: 'left',
    margin: 5
  },

  ChatInputButton: {
    width: '15%',
    float: 'left',
    marginTop: 5

  }
})

export default ChatBox
