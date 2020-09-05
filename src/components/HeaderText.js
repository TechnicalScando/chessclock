import React from 'react'
import { StyleSheet, css } from 'aphrodite'

const HeaderText = () => (

  <p className={css(styles.headerData)}>Ultimate Chess Clock</p>

)

const styles = StyleSheet.create({
  headerData: {
    fontWeight: 500,
    fontSize: 48,

    position: 'absolute',

    left: '33%',
    right: '33%',
    top: '7%',
    bottom: '90%'

  }
})

export default HeaderText
