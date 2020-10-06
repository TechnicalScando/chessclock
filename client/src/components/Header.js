import React from 'react'
import { StyleSheet, css } from 'aphrodite'

const Header = ({ name, room }) => (
  <div className={css(styles.headerDiv)}>
    <h1 className={css(styles.HeaderText)}>Ultimate Chess Clock</h1>
  </div>
)

const styles = StyleSheet.create({
  headerDiv: {

  },

  HeaderText: {

  },

  InfoText: {

  }
})

export default Header
