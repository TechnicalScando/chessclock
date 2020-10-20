import React, { useState, useEffect } from 'react'

import Timer from '../Timer/Timer'

import './PlayArea.css'

const PlayArea = ({ socket, name }) => {
  const [timers, setTimers] = useState([])
  const [votes, setVotes] = useState([])

  if (socket !== undefined) {
    socket.on('timer', ({ timers }) => {
      setTimers(timers)
    })
  }

  useEffect(() => {
    if (socket !== undefined) {
      socket.on('vote', ({ voteRegister }) => {
        if (voteRegister !== undefined) {
          setVotes(voteRegister)
        }
      })
    }

    if (socket !== undefined) {
      socket.on('zeroTimer', () => {
        console.log('zero timer')
      })
    }
  }, [socket])

  // Linked to button in PlayArea, starts the currently selected timer
  const startTimer = () => {
    const voteCheck = votes.every(e => e === true)
    if (voteCheck) {
      socket.emit('timerStart')
    }
  }

  // Linked to button in PlayArea, clears the currently selected timer
  const clearTimer = () => {
    socket.emit('clearTimer')
  }

  // Linked to button in PlayArea, switches between players timers
  const switchYield = () => {
    socket.emit('switchYield')
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
            votes={votes}
          />)}
      </div>
      <div className='buttoncontainer'>
        <button className='timerbutton' onClick={startTimer}>Start</button>
        <button className='timerbutton' onClick={switchYield}>Switch/Yield</button>
        <button className='timerbutton' onClick={clearTimer}>Clear</button>
      </div>

    </div>

  )
}

export default PlayArea
