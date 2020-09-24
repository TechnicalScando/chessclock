import React from 'react'
import { StyleSheet, css } from 'aphrodite'

const Timer = ({ timer }) => {
  return (
    <div className={css(styles.TimerArea)}>
      <h1 className={css(styles.PlayerName)}>Player Name</h1>
      <div className={css(styles.TimerContainer)}>
        <div className={css(styles.TimerDiv)}> {timer} </div>
      </div>
    </div>
  )
}

const styles = StyleSheet.create({
  TimerDiv: {
    fontSize: 96,
    fontWeight: 400,
    font: 'Roboto'
  },

  TimerContainer: {
    backgroundColor: 'FFFFFF',
    height: 158,
    width: 447

  },

  TimerArea: {
    float: 'left',
    width: 447,
    height: 235,
    left: 54,
    top: 382
  },

  PlayerName: {
    margin: 5,
    padding: 5
  }

})

export default Timer
