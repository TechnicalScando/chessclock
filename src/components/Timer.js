import React from 'react'
import { StyleSheet, css } from 'aphrodite'

const Timer = ({ timer }) => {
  return (
    <div className={css(styles.TimerDiv)}> {timer} </div>
  )
}

const styles = StyleSheet.create({
  TimerDiv: {

  }
})

export default Timer
