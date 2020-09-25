import React from 'react'
import { StyleSheet, css } from 'aphrodite'

const CreateNewRoom = ({ url, users }) => (
  <div className={css(styles.CreateNewRoomDiv)}>
    <a href='document.location'>{url}</a>
    <div className={css(styles.UserList)}>
      {users.map(({ name }) => <div key={name}>{name}</div>)}
    </div>
  </div>

)

const styles = StyleSheet.create({
  CreateNewRoomDiv: {
    border: 1,
    borderStyle: 'solid',
    width: 374,
    height: 98,
    top: 221,
    left: 1001,
    position: 'absolute'
  }
})

export default CreateNewRoom
