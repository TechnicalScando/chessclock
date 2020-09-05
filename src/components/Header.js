import React from 'react'
import { StyleSheet, css } from 'aphrodite'

import HeaderText from './HeaderText'

const Header = () => (
  <div className={css(styles.headerDiv)}>
    <HeaderText />
  </div>
)

const styles = StyleSheet.create({
  headerDiv: {
    backgroundColor: '#0D88BC',
    width: 1440,
    height: 173,
    position: 'absolute'
  }
})

export default Header
