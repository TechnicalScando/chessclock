import React, { useEffect, useState } from 'react'

import './Timer.css'
import xIcon from '../../Images/xicon.png'
import checkIcon from '../../Images/checkicon.png'

const Timer = ({ socket, timer, index, userName }) => {
  const DEFAULTUSER = '---Join'
  const XIMAGE = <img src={xIcon} className='voteimage' alt='novoteicon' />
  const CHECKIMAGE = <img src={checkIcon} className='voteimage' alt='novoteicon' />

  const [voteImage, setVoteImage] = useState(XIMAGE)

  console.log(voteImage)
  console.log(XIMAGE)
  console.log(voteImage.props.img === XIMAGE.props.img)
  let button

  useEffect(() => {
    // Recieve timer event and update timers state
    if (socket !== undefined) {
      socket.on('voteCast', (currentUser) => {
        if ((timer.user != null) && (currentUser === timer.user.toLowerCase())) {
          toggleVoteImage(currentUser)
        }
      })
    }
  }, [timer, socket])

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

  const toggleVoteImage = (currentUser) => {
    if (voteImage.props.img === XIMAGE.props.img) {
      setVoteImage(CHECKIMAGE)
    } else if (voteImage.props.img === CHECKIMAGE.props.img) {
      setVoteImage(XIMAGE)
    }
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
        {voteImage}
        {button}
      </div>

      <div className='timercontainer'>
        <div className='timertext'> {timer.formattedCountdown} </div>
      </div>

    </div>
  )
}

export default Timer
