class Timer {
  constructor (countdown) {
    this.countdown = 0
    this.formattedCountdown = '00:00:00'
    this.timerInterval = null
    this.isRunning = false
  }

  runTimer (timer) {
    if (!timer.isRunning) {
      timer.timerInterval = setInterval(() => {
        timer.countdown--
        timer.isRunning = true
      }, 1000)
    }
  }

  stopTimer (timer) {
    clearInterval(timer.timerInterval)
    timer.isRunning = false
  }

  resetTimer (countdown, timer) {
    this.stopTimer(timer)
    timer.countdown = countdown
  }

  formatTimer (timer) {
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
}

export default Timer
