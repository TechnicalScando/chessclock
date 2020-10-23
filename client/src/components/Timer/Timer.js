import React, { useState, useEffect } from 'react'

import './Timer.css'
import xIcon from '../../Images/xicon.png'
import checkIcon from '../../Images/checkicon.png'

const Timer = ({ socket, timer, index, userName, votes }) => {
  const DEFAULTUSER = '---Join'

  let joinLeaveButton
  let readyUnreadyButton
  let voteImage
  let hasJoined = false
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    socket.emit('initialVote', index)
  }, [socket])

  const joinTimer = () => {
    setIsReady(false)
    socket.emit('joinTimer', index)
  }

  const leaveTimer = () => {
    setIsReady(false)
    socket.emit('leaveTimer', index)
  }

  const ready = () => {
    setIsReady(true)
    socket.emit('ready', index)
  }

  const unReady = () => {
    setIsReady(false)
    socket.emit('unReady', index)
  }

  // set image based on vote status
  if (votes[index] === true) {
    voteImage = <img src={checkIcon} className='voteimage' alt='novoteicon' />
  } else {
    voteImage = <img src={xIcon} className='voteimage' alt='novoteicon' />
  }

  // set button to join or leave
  if (timer.user == null) {
    hasJoined = false

    joinLeaveButton = <button className='joinleavebutton' onClick={joinTimer}>Join</button>
  } else if (timer.user === userName.toLowerCase()) {
    hasJoined = true

    joinLeaveButton = <button className='joinleavebutton' onClick={leaveTimer}>Leave</button>
  }

  // set button to ready/undready
  if (isReady) {
    readyUnreadyButton = <button className='unreadybutton' onClick={unReady}>Unready</button>
  } else {
    readyUnreadyButton = <button className='readybutton' onClick={ready}>Ready</button>
  }

  return (
    <div className='outertimerdiv'>
      <div className='userjoincontainer'>
        <h1>
          {timer.user === null ? DEFAULTUSER : timer.user}
        </h1>
        {voteImage}
        {joinLeaveButton}
        {hasJoined && readyUnreadyButton}
      </div>

      <div className='timercontainer'>
        <div className='timertext'> {timer.formattedCountdown} </div>
      </div>

    </div>
  )
}

export default Timer
