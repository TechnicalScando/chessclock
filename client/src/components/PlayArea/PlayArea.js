import React from 'react'

import Timer from '../Timer/Timer'

import './PlayArea.css'

const PlayArea = ({
  timers, startTimer, clearTimer,
  switchYield, settingsToggle, joinTimer,
  leaveTimer, hasJoined
}) => (
  <div className='playareacontainer'>
    <div>
      {timers.map((timer, i) =>
        <Timer
          key={i}
          index={i}
          timer={timer}
          joinTimer={joinTimer}
          leaveTimer={leaveTimer}

        />)}
    </div>
    <div>
      <button onClick={startTimer}>Start</button>
      <button onClick={switchYield}>Switch/Yield</button>
      <button onClick={clearTimer}>Clear</button>
    </div>
    <div>
      <button onClick={settingsToggle}>Settings</button>
    </div>
  </div>

)

export default PlayArea
