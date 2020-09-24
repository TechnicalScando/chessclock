import React from 'react'
import { StyleSheet, css } from 'aphrodite'

const CreateNewRoom = ({ url }) => (
  <div className={css(styles.CreateNewRoomDiv)}>
    <a href='document.location'>{url}</a>
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
