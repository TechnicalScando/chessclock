import React from 'react'
import { StyleSheet, css } from 'aphrodite'

import Timer from './Timer'

const PlayArea = ({
  timers, startTimer, clearTimer,
  switchYield, settingsToggle, joinTimer,
  leaveTimer, hasJoined
}) => (
  <div className={css(styles.PlayAreaDiv)}>
    <div className={css(styles.PlayerTimerArea)}>
      {timers.map((timer, i) =>
        <Timer
          key={i}
          index={i}
          timer={timer}
          joinTimer={joinTimer}
          leaveTimer={leaveTimer}

        />)}
    </div>
    <div className={css(styles.PlayButtons)}>
      <button onClick={startTimer}>Start</button>
      <button onClick={switchYield}>Switch/Yield</button>
      <button onClick={clearTimer}>Clear</button>
    </div>
    <div className={css(styles.SettingsButtons)}>
      <button onClick={settingsToggle}>Settings</button>
    </div>
  </div>

)

const styles = StyleSheet.create({
  PlayAreaDiv: {

  },

  PlayerTimerArea: {

  },

  SettingsButtons: {

  },

  PlayButtons: {

  }
})

export default PlayArea
