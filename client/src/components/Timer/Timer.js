import React from 'react'

import './Timer.css'

const Timer = ({ timer, joinTimer, leaveTimer, index, userName }) => {
  const DEFAULTUSER = '---Join'

  const handleJoinClick = (event) => {
    joinTimer(event)
  }
  const handleLeaveClick = (event) => {
    leaveTimer(event)
  }

  let button

  if (timer.user == null) {
    button = <button className='joinleavebutton' value={index} onClick={handleJoinClick}>Join</button>
  } else if (timer.user === userName.toLowerCase()) {
    button = <button className='joinleavebutton' value={index} onClick={handleLeaveClick}>Leave</button>
  }

  return (
    <div className='outertimerdiv'>
      <div className='userjoincontainer'>
        <h1>
          {timer.user === null ? DEFAULTUSER : timer.user}
        </h1>
        {button}
      </div>

      <div className='timercontainer'>
        <div className='timertext'> {timer.formattedCountdown} </div>
      </div>

    </div>
  )
}

export default Timer
