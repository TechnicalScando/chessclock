const switchTimer = (timerInterval, user) => {
  clearInterval(timerInterval)
  timerStarted = false

  const maxTimer = timers.length - 1

  if (currentTimer < maxTimer) {
    currentTimer++
  } else {
    currentTimer = 0
  }

  runTimer(timers[currentTimer], user)
}

const generateTimers = ({ timerCount, timerCountdown }) => {
  for (let i = 0; i < timerCount; i++) {
    timers[i] = { countdown: timerCountdown }
  }

  timers.forEach(timer => {
    formatTimer(timer)
  })
}
