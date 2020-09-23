import React from 'react'
import { StyleSheet, css } from 'aphrodite'

import Timer from './Timer'

const PlayArea = ({ timer, startTimer, clearTimer }) => (
  <div className={css(styles.PlayAreaDiv)}>
    <Timer timer={timer} />
    <Timer timer={timer} />
    <button onClick={startTimer}>Switch/Yield</button>
    <button onClick={clearTimer}>Clear</button>
  </div>

)

const styles = StyleSheet.create({
  PlayAreaDiv: {
    backgroundColor: '#0D88BC',
    width: 912,
    height: 415,
    left: 54,
    top: 382,
    position: 'absolute'
  }
})

export default PlayArea
