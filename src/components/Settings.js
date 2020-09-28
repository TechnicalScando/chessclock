import React from 'react'
import { StyleSheet, css } from 'aphrodite'

const Settings = ({ settingsToggle }) => (
  <div className={css(styles.Settings)}>
    <div>
      <input
        className={css(styles.TimerInput)}
        type='text'
        placeholder='Time Limit'

      />
      <button
        className={css(styles.TimerInputButton)}

      >Submit
      </button>
    </div>
    <button onClick={settingsToggle}>Close</button>
  </div>
)

const styles = StyleSheet.create({
  Settings: {
    height: '25%',
    width: '25%',
    margin: 'auto',
    position: 'fixed',
    backgroundColor: 'white',
    border: 3,
    borderStyle: 'solid',
    top: '50%',
    left: '50%'

  }
})

export default Settings
