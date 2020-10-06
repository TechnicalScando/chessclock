import React from 'react'
import { StyleSheet, css } from 'aphrodite'

const Timer = ({ timer, joinTimer, leaveTimer, index }) => {
  const DEFAULTUSER = '---Join'

  const handleJoinClick = (event) => {
    joinTimer(event)
  }
  const handleLeaveClick = (event) => {
    leaveTimer(event)
  }

  let button

  if (timer.user == null) {
    button = <button value={index} onClick={handleJoinClick}>Join</button>
  } else {
    button = <button value={index} onClick={handleLeaveClick}>Leave</button>
  }

  return (
    <div className={css(styles.TimerArea)}>
      <h1 className={css(styles.PlayerName)}>
        {timer.user === null ? DEFAULTUSER : timer.user}
      </h1>
      <div className={css(styles.TimerContainer)}>
        <div className={css(styles.TimerDiv)}> {timer.formattedCountdown} </div>
      </div>
      {button}
    </div>
  )
}

const styles = StyleSheet.create({
  TimerDiv: {

  },

  TimerContainer: {


  },

  TimerArea: {

  },

  PlayerName: {

  }

})

export default Timer
