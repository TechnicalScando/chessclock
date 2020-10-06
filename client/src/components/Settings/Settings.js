import React from 'react'

const Settings = ({ timerCountdown, timerCount, setTimerCount, setTimerCountdown, settingsToggle, sendSettings }) => {
  return (

    <div className='settingscontainer'>
      <div>
        <input

          type='text'
          name='timerCountdown'
          placeholder={timerCountdown}
          onChange={({ target: { value } }) => setTimerCountdown(parseInt(value))}
        />
        <label htmlFor='timerCount'>How many timers: </label>
        <select name='timerCount' onChange={({ target: { value } }) => setTimerCount(value)}>
          <option value='' disabled selected hidden>{timerCount}</option>
          <option value='1'>1</option>
          <option value='2'>2</option>
          <option value='3'>3</option>
          <option value='4'>4</option>
          <option value='5'>5</option>
          <option value='6'>6</option>
        </select>
        <button

          onClick={e => sendSettings(e)}
        >Submit
        </button>
      </div>
      <button onClick={settingsToggle}>Close</button>
    </div>
  )
}

export default Settings
