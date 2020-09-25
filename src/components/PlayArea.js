import React from 'react'
import { StyleSheet, css } from 'aphrodite'

import Timer from './Timer'

const PlayArea = ({ timers, startTimer, clearTimer, switchYield }) => (
  <div className={css(styles.PlayAreaDiv)}>
    <div className={css(styles.PlayerTimerArea)}>
      {timers.map((timer, i) => <Timer key={i} timer={timer.countdown} />)}
    </div>
    <button onClick={startTimer}>Start</button>
    <button onClick={switchYield}>Switch/Yield</button>
    <button onClick={clearTimer}>Clear</button>
  </div>

)

const styles = StyleSheet.create({
  PlayAreaDiv: {
    // backgroundColor: '#0D88BC',
    border: 1,
    borderStyle: 'solid',
    width: 912,
    height: 415,
    left: 54,
    top: 382,
    position: 'absolute'
  },

  PlayerTimerArea: {
    width: 912,
    height: 235,
    left: 54,
    top: 382,
    margin: 15,
    padding: 5
  }
})

export default PlayArea
