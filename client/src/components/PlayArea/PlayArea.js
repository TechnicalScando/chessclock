import React from 'react'

import Timer from '../Timer/Timer'

import './PlayArea.css'

const PlayArea = ({
  timers, startTimer, clearTimer,
  switchYield, settingsToggle, joinTimer,
  leaveTimer, name
}) => (
  <div className='playareacontainer'>
    <div className='timerplayarea'>
      {timers.map((timer, i) =>
        <Timer
          key={i}
          index={i}
          timer={timer}
          joinTimer={joinTimer}
          leaveTimer={leaveTimer}
          userName={name}

        />)}
    </div>
    <div className='buttoncontainer'>
      <button className='timerbutton' onClick={startTimer}>Start</button>
      <button className='timerbutton' onClick={switchYield}>Switch/Yield</button>
      <button className='timerbutton' onClick={clearTimer}>Clear</button>
    </div>
    <div>
      <button onClick={settingsToggle}>Settings</button>
    </div>
  </div>

)

export default PlayArea
