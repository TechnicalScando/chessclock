import ScrollToBottom from 'react-scroll-to-bottom'
import React from 'react'
import { StyleSheet, css } from 'aphrodite'

const MessageBox = ({ messages }) => (
  <ScrollToBottom className={css(styles.ScrollContainer)}>
    {messages.map((message, i) => <p key={i}>{message.user}: {message.text}</p>)}
  </ScrollToBottom>
)

const styles = StyleSheet.create({
  ScrollContainer: {
    height: 480
  }
})

export default MessageBox
