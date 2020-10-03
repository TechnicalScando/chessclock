class Timer {
  constructor (countdown) {
    this.countdown = countdown
    this.formattedCountdown = '00:00:00'
    this.timerInterval = null
    this.isRunning = false

    this.formatTimer()
  }

  runTimer () {
    if (!this.isRunning) {
      this.timerInterval = setInterval(() => {
        this.countdown--
        this.isRunning = true
        this.formatTimer()
        console.log(this.formattedCountdown)
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

  formatTimer () {
    const hours = ~~(this.countdown / 3600)
    const minutes = ~~((this.countdown % 3600) / 60)
    const seconds = ~~this.countdown % 60

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

    this.formattedCountdown = finalFormat
  }
}

module.exports = Timer
