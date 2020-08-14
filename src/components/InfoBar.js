import React from 'react'

import closedIcon from '../Icons/closeIcon.png'
import onlineIcon from '../Icons/onlineIcon.png'

const InfoBar = ({ room }) =>
  (
    <div>
      <div>
        <img src={onlineIcon} alt='' />
        <h3>{room}</h3>
      </div>
      <div>
        <a href='/'><img src={closedIcon} alt='' /></a>
      </div>
    </div>
  )

export default InfoBar
