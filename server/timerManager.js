const settings = {
  timerCount: 0,
  timerCountdown: 0
}

const timers = [
  {
    countdown: 0,
    formattedCountdown: '00:00:00',
    timerInterval: null,
    isRunning: false
  }
]

const generateTimers = ({ timerCount, timerCountdown }) => {
  for (let i = 0; i < timerCount; i++) {
    timers[i] = { countdown: timerCountdown }
  }
}

const runTimer = (timer) => {
  if (!timer.isRunning) {
    timer.timerInterval = setInterval(() => {
      timer.countdown--
      timer.isRunning = true
    }, 1000)
  }
}

const stopTimer = (timer) => {
  clearInterval(timer.timerInterval)
  timer.isRunning = false
}

const switchTimer = (timer) => {
  stopTimer(timer)

  const maxTimer = timers.length - 1

  if (currentTimer < maxTimer) {
    currentTimer++
  } else {
    currentTimer = 0
  }

  runTimer(timers[currentTimer], user)
}

const resetTimer = () => {

}

const formatTimer = (timer) => {
  const hours = ~~(timer.countdown / 3600)
  const minutes = ~~((timer.countdown % 3600) / 60)
  const seconds = ~~timer.countdown % 60

  let finalFormat = ''
  hours > 0
    ? finalFormat += `${hours}:`
    : finalFormat += ''

  minutes < 10
    ? finalFormat += `0${minutes}`
    : finalFormat += `${minutes}`

  seconds < 10
    ? finalFormat += `:0${seconds}`
    : finalFormat += `:${seconds}`

  timer.formattedCountdown = finalFormat
}

export default timerManager
