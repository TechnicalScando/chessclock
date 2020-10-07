import React from 'react'

import './CreateNewRoom.css'

const CreateNewRoom = ({ users }) => (
  <div className='newroomcontainer'>
    <a className='roomurltext' href='document.location'>{window.location.href}</a>
    <div className='userlist'>
      <h3>Users in room</h3>
      {users.map(({ name }) => <div key={name}>{name}</div>)}
    </div>
  </div>

)

export default CreateNewRoom
