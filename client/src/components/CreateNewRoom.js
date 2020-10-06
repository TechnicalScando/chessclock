import React from 'react'
import { StyleSheet, css } from 'aphrodite'

const CreateNewRoom = ({ users }) => (
  <div className={css(styles.CreateNewRoomDiv)}>
    <a href='document.location'>{window.location.href}</a>
    <div className={css(styles.UserList)}>
      {users.map(({ name }) => <div key={name}>{name}</div>)}
    </div>
  </div>

)

const styles = StyleSheet.create({
  CreateNewRoomDiv: {

  }
})

export default CreateNewRoom
