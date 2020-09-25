import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Join = () => {
  const [name, setName] = useState('')
  const [room, setRoom] = useState('')

  return (
    <div>
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
