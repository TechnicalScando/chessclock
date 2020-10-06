import React from 'react'

const CreateNewRoom = ({ users }) => (
  <div className='newRoomContainer'>
    <a href='document.location'>{window.location.href}</a>
    <div>
      {users.map(({ name }) => <div key={name}>{name}</div>)}
    </div>
  </div>

)

export default CreateNewRoom
