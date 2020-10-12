import React from 'react'

import './Timer.css'
import xIcon from '../../Images/xicon.png'
import checkIcon from '../../Images/checkicon.png'

const Timer = ({ socket, timer, index, userName }) => {
  const DEFAULTUSER = '---Join'

  let button

  const joinTimer = (event) => {
    const timerIndex = event.target.value
    event.preventDefault()
    socket.emit('joinTimer', timerIndex)
  }

  const leaveTimer = (event) => {
    const timerIndex = event.target.value
    event.preventDefault()

    socket.emit('leaveTimer', timerIndex)
  }

  if (timer.user == null) {
    button = <button className='joinleavebutton' value={index} onClick={joinTimer}>Join</button>
  } else if (timer.user === userName.toLowerCase()) {
    button = <button className='joinleavebutton' value={index} onClick={leaveTimer}>Leave</button>
  }

  return (
    <div className='outertimerdiv'>
      <div className='userjoincontainer'>
        <h1>
          {timer.user === null ? DEFAULTUSER : timer.user}
        </h1>
        <img src={xIcon} className='voteimage' alt='novoteicon' />
        {button}
      </div>

      <div className='timercontainer'>
        <div className='timertext'> {timer.formattedCountdown} </div>
      </div>

    </div>
  )
}

export default Timer
