const Timer = require('./Timer')

class TimerManager {
  constructor (timerCount, countdown, callback) {
    this.timers = []
    this.selectedTimer = 0 // index of currently selected timer
    this.callback = callback
    for (let i = 0; i < timerCount; i++) {
      this.timers[i] = new Timer(countdown)
    }
  }

  startSelectedTimer () {
    this.timers[this.selectedTimer].runTimer(this.callback)
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

    this.timers[this.selectedTimer].runTimer(this.callback)
  }

  getTimers () {
    const simplifiedArray = []
    this.timers.forEach(({ countdown, formattedCountdown, user }, index) => {
      simplifiedArray[index] = { countdown, formattedCountdown, user }
    })

    return simplifiedArray
  }

  setUserOfTimer (index, user) {
    this.timers[index].setUser(user)
  }
}

module.exports = TimerManager
