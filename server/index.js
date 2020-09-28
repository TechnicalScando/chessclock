const express = require('express')
const socketio = require('socket.io')
const http = require('http')

const { addUser, removeUser, getUser, getUsersInRoom } = require('./users')

const PORT = process.env.PORT || 5000

const router = require('./router')
const { count } = require('console')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

// The current timer selected to run, based on array index
let currentTimer = 0

// Initializing the timer array with basic attributes
let timers = [{ name: '', countdown: 0, formattedCountdown: '' }]

// Test Timer array
// TODO create dynamic timer array based on settings
timers = [{ name: 'timer1', countdown: 1000 },
  { name: 'timer2', countdown: 1000 }]

// A boolean which is set to true when the current timer is running
let timerStarted = false

// The timerInterval currently runninh
let timerInterval

// takes a timer and a user
// Every second it deincrements the timers countdown attribute
// then emits a timer event
const runTimer = (timer, user) => {
  if (!timerStarted) {
    timerInterval = setInterval(() => {
      timer.countdown--
      formatTimer(timer)
      console.log(timer.formattedCountdown)
      io.to(user.room).emit('timer', { timers: timers })
    }, 1000)

    timerStarted = true
  } else {
    // TODO, handle when the timer is already started
  }
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

// Takes in the current Timer Interval, the current timer, and the current user
// Stop the interval on the timer, sets timerstarted to false, then emits a timer event
// Which sets the current timer back to default
const clearTimer = (timerInterval, currentTimer, user) => {
  clearInterval(timerInterval)
  timerStarted = false
  timers[currentTimer] = { name: 'timer1', countdown: 1000 }
  formatTimer(timers[currentTimer])
  io.to(user.room).emit('timer', { timers: timers })
}

// Takes in the current timer interval and the current user
// Clears the old timer, sets timerstarted to false,
// Then sets the current timer to the other timer in the test array
// TODO make this dynamic, working with any number of timers in the timers array
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

// specific client instance of a socket with a unique socket id
// Runs on user connect
io.on('connect', (socket) => {
  socket.on('join', ({ name, room }, callback) => {
    // If a username isnt alredy taken in a room, add the user to the user list
    // If the username is taken return an error
    const { error, user } = addUser({ id: socket.id, name, room })

    // run the provided error callback function
    if (error) return callback(error)

    // join the user to their room
    socket.join(user.room)

    // Emit the data containing all users in the current users room
    io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) })

    // Alert everyone but the current user of the new user entering the room
    socket.broadcast.emit('message', {
      user: 'Admin',
      text: `${user.name} has joined room: ${user.room} `
    })

    // Welcome the current user to the room
    io.to(user.id).emit('message', {
      user: 'Admin',
      text: `Welcome to room: ${user.room}, ${user.name}!`
    })

    // Emit the current timers to the new user
    timers.forEach(timer => {
      formatTimer(timer)
    })
    io.to(user.room).emit('timer', { timers: timers })

    callback()
  })

  // Recieve the timerStart event from the client
  // begin running the currently selected timer
  socket.on('timerStart', () => {
    const user = getUser(socket.id)
    if (user !== undefined) {
      runTimer(timers[currentTimer], user)
    }
  })

  // Recieve the clearTimer event from client
  // Clear the currently selected timer
  socket.on('clearTimer', () => {
    const user = getUser(socket.id)
    if (user !== undefined) {
      clearTimer(timerInterval, currentTimer, user)
    }
  })

  // Recieve switchYield from the client
  // switch the currently selected timer
  socket.on('switchYield', () => {
    const user = getUser(socket.id)
    console.log('Switch Yield!')
    if (user !== undefined) {
      switchTimer(timerInterval, user)
    }
  })

  // On recieveing sendMessage event from client
  // Take the message and emit it as a message object with user data included
  socket.on('sendMessage', (message) => {
    const user = getUser(socket.id)
    if (user !== undefined) {
      io.to(user.room).emit('message', { user: user.name, text: message })
    }
  })

  // Remove user from list upon disconnect event
  // Alert room to user leaving
  socket.on('disconnect', () => {
    const user = removeUser(socket.id)
    // TODO alert other users that use has left the room
  })
})

app.use(router)

server.listen(PORT, () => console.log(`Server has started on port ${PORT}`))
