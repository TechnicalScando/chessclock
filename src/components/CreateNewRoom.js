import React from 'react'
import { StyleSheet, css } from 'aphrodite'

const CreateNewRoom = () => (
  <div className={css(styles.CreateNewRoomDiv)}>
    <a href='document.location'> link text</a>
  </div>

)

const styles = StyleSheet.create({
  CreateNewRoomDiv: {
    backgroundColor: '#0D88BC',
    width: 374,
    height: 98,
    top: 221,
    left: 1001,
    position: 'absolute'
  }
})

export default CreateNewRoom
