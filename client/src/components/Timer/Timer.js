import React from 'react'

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
    <div className='timercontainer'>
      <h1>
        {timer.user === null ? DEFAULTUSER : timer.user}
      </h1>
      <div>
        <div> {timer.formattedCountdown} </div>
      </div>
      {button}
    </div>
  )
}

export default Timer
