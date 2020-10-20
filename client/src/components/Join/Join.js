import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import nanoid from 'nanoid'

import './Join.css'

const Join = () => {
  const [name, setName] = useState('')
  const [room, setRoom] = useState('')

  const id = nanoid()
  console.log(id)

  return (
    <div className='joincontainer'>
      <h3>Create a room!</h3>
      <input
        placeholder='Name' className='NameInput' type='text'
        onChange={(event) => setName(event.target.value)}
      />
      <input
        placeholder='room' className='RoomInput' type='text'
        onChange={(event) => setRoom(event.target.value)}
      />
      <Link onClick={e => (!name || !room) ? e.preventDefault() : null} to={`/room?name=${name}&room=${room}`}>
        <button className='SubmitButton' type='submit'>Submit</button>
      </Link>
    </div>
  )
}

export default Join
