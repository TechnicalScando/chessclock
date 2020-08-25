import React from 'react'

const TextContainer = ({ users }) => (
  users.map((user, i) => <div key={i}><h1>{user.name}</h1></div>)

)

export default TextContainer
