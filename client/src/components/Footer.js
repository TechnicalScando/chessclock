import React from 'react'
import { StyleSheet, css } from 'aphrodite'

const Footer = () => (
  <div className={css(styles.footerDiv)} />
)

const styles = StyleSheet.create({
  footerDiv: {
    backgroundColor: '#0D88BC',
    width: 1440,
    height: 97,
    top: 925,
    position: 'absolute'
  }
})

export default Footer
