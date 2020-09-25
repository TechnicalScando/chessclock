import ScrolltoBottom from 'react-scroll-to-bottom'
import React from 'react'
import { StyleSheet, css } from 'aphrodite'

const MessageBox = ({ messages }) => (
  <ScrolltoBottom className={css(styles.ScrollContainer)}>
    {messages.map((message, i) => <p key={i}>{message.user}: {message.text}</p>)}
  </ScrolltoBottom>
)

const styles = StyleSheet.create({
  ScrollContainer: {

  }
})

export default MessageBox
