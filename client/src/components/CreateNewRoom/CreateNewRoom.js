import React, { useState, useEffect } from 'react'

import './CreateNewRoom.css'

const CreateNewRoom = ({ socket }) => {
  const [users, setUsers] = useState([])

  // Thos useEffect runs on any change
  useEffect(() => {
    // Recieve roomData event and update users state
    if (socket !== undefined) {
      socket.on('roomData', ({ users }) => {
        setUsers(users)
      })
    }
  }, [socket])

  return (
    <div className='newroomcontainer'>
      <a className='roomurltext' href='document.location'>{window.location.href}</a>
      <div className='userlist'>
        <h3>Users in room</h3>
        {users.map(({ name }) => <div key={name}>{name}</div>)}
      </div>
    </div>

  )
}

export default CreateNewRoom
