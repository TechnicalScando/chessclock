const express = require('express')
const socketio = require('socket.io')
const http = require('http')

const { addUser, removeUser, getUser, getUserInRoom } = require('./users')

const PORT = process.env.PORT || 5000

const router = require('./router')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

let currentTimer = 0
let timers = [{ name: '', countdown: 0 }]

timers = [{ name: 'timer1', countdown: 1000 },
  { name: 'timer2', countdown: 1000 }]

let timerStarted = false
let timerInterval

const runTimer = (timer, user) => {
  if (!timerStarted) {
    timerInterval = setInterval(() => {
      timer.countdown--
      io.to(user.room).emit('timer', { timers: timers })
    }, 1000)

    timerStarted = true
  } else {

  }
}

const clearTimer = (timerInterval, currentTimer, user) => {
  clearInterval(timerInterval)
  timerStarted = false
  timers[currentTimer] = { name: 'timer1', countdown: 1000 }
  io.to(user.room).emit('timer', { timers: timers })
}

const switchTimer = (timerInterval, user) => {
  clearInterval(timerInterval)
  timerStarted = false
  if (currentTimer === 0) {
    currentTimer = 1
    console.log(currentTimer)
  } else {
    currentTimer = 0
  }
  runTimer(timers[currentTimer], user)
}

// specific client instance of a socket
io.on('connect', (socket) => {
  socket.on('join', ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room })
    if (error) {
      console.log(error)
    }
    if (error) return callback(error)

    console.log(`name:${user.name} has joined room:${room} `)
    console.log(getUserInRoom(user.room))

    socket.join(user.room)

    callback()
  })

  socket.on('timersRequest', () => {
    const user = getUser(socket.id)
    if (user !== undefined) {
      timers.forEach(timer => {
        io.to(user.room).emit('timers', timer)
      })
    }
  })

  socket.on('disconnect', () => {
    const user = removeUser(socket.id)
    console.log(`${user} has disconnected`)
  })

  socket.on('timerStart', () => {
    const user = getUser(socket.id)
    if (user !== undefined) {
      runTimer(timers[currentTimer], user)
    }
  })

  socket.on('clearTimer', () => {
    const user = getUser(socket.id)
    if (user !== undefined) {
      clearTimer(timerInterval, currentTimer, user)
    }
  })

  socket.on('switchYield', () => {
    const user = getUser(socket.id)
    console.log('Switch Yield!')
    if (user !== undefined) {
      switchTimer(timerInterval, user)
    }
  })
})

app.use(router)

server.listen(PORT, () => console.log(`Server has started on port ${PORT}`))
