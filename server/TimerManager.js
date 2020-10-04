const Timer = require('./Timer')

class TimerManager {
  constructor (timerCount, countdown) {
    this.timers = []
    this.selectedTimer = 0 // index of currently selected timer
    for (let i = 0; i < timerCount; i++) {
      this.timers[i] = new Timer(countdown)
    }
  }

  startSelectedTimer () {
    this.timers[this.selectedTimer].runTimer()
  }

  resetSelectedTimer (countdown) {
    this.timers[this.selectedTimer].resetTimer(countdown)
  }

  switchTimer () {
    this.timers[this.selectedTimer].stopTimer()

    const maxTimer = this.timers.length - 1

    if (this.selectedTimer < maxTimer) {
      this.selectedTimer++
    } else {
      this.selectedTimer = 0
    }

    this.timers[this.selectedTimer].runTimer()
  }

  getTimers () {
    const simplifiedArray = []
    this.timers.forEach(({ countdown, formattedCountdown }, index) => {
      simplifiedArray[index] = { countdown, formattedCountdown }
    })

    return simplifiedArray
  }
}

module.exports = TimerManager
