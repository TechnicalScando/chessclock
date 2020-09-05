import React from 'react'
import { StyleSheet, css } from 'aphrodite'

const ChatBox = () => (

  <div className={css(styles.chatBoxDiv)} />

)

const styles = StyleSheet.create({
  chatBoxDiv: {
    backgroundColor: '#0D88BC',
    width: 374,
    height: 523,
    top: 336,
    left: 1001,
    position: 'absolute'
  }
})

export default ChatBox
