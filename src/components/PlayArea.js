import React from 'react'
import { StyleSheet, css } from 'aphrodite'

const PlayArea = () => (
  <div className={css(styles.PlayAreaDiv)}>
  (
    <div>
      <p>Play Area</p>
      {/* <PlayerTimerArea />
      <SwitchYieldButton />
      <ReadyButton /> */}
    </div>
  )
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
