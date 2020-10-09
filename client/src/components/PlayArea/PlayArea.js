import React, { useState, useEffect } from 'react'

import Timer from '../Timer/Timer'

import './PlayArea.css'

const PlayArea = ({ socket, settingsToggle, name }) => {
  const [timers, setTimers] = useState([])

  useEffect(() => {
    // Recieve timer event and update timers state
    if (socket !== undefined) {
      socket.on('timer', ({ timers }) => {
        setTimers(timers)
      })
    }
  }, [socket, timers])

  // Linked to button in PlayArea, starts the currently selected timer
  const startTimer = () => {
    socket.emit('timerStart')
  }

  // Linked to button in PlayArea, clears the currently selected timer
  const clearTimer = () => {
    socket.emit('clearTimer')
  }

  // Linked to button in PlayArea, switches between players timers
  const switchYield = () => {
    socket.emit('switchYield')
  }

  const readyVote = () => {
    socket.emit('vote')
  }

  return (
    <div className='playareacontainer'>
      <div className='timerplayarea'>
        {timers.map((timer, i) =>
          <Timer
            socket={socket}
            key={i}
            index={i}
            timer={timer}
            userName={name}
          />)}
      </div>
      <div className='buttoncontainer'>
        {/* <button className='timerbutton' onClick={startTimer}>Start</button> */}
        <button className='timerbutton' onClick={readyVote}>Ready</button>
        <button className='timerbutton' onClick={switchYield}>Switch/Yield</button>
        <button className='timerbutton' onClick={clearTimer}>Clear</button>
      </div>

    </div>

  )
}

export default PlayArea
