const express = require('express')
const socketio = require('socket.io')
const http = require('http')
const cors = require('cors')

const { addUser, removeUser, getUser, getUsersInRoom } = require('./users')
const TimerManager = require('./TimerManager')

const PORT = process.env.PORT || 5000

const router = require('./router')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

let timerManager
let emitInterval
let timersetting // used for resetting timer to initial value

app.use(router)
app.use(cors)

const emitTimersOnInterval = (interval, user) => {
  emitInterval = setInterval(() => {
    io.to(user.room).emit('timer', { timers: timerManager.getTimers() })
  }, interval)
}

const generateAndEmitTimers = (timerCount, countdown, user) => {
  timerManager = new TimerManager(timerCount, countdown)
  io.to(user.room).emit('timer', { timers: timerManager.getTimers() })
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

    callback()
  })

  // Recieve the timerStart event from the client
  // begin running the currently selected timer
  socket.on('timerStart', () => {
    const user = getUser(socket.id)
    if (user !== undefined) {
      timerManager.startSelectedTimer()
      emitTimersOnInterval(1000, user)
    }
  })

  // Recieve the clearTimer event from client
  // Clear the currently selected timer
  socket.on('clearTimer', () => {
    const user = getUser(socket.id)
    if (user !== undefined) {
      clearInterval(emitInterval)
      timerManager.resetSelectedTimer(timersetting)
      io.to(user.room).emit('timer', { timers: timerManager.getTimers() })
    }
  })

  // Recieve switchYield from the client
  // switch the currently selected timer
  socket.on('switchYield', () => {
    const user = getUser(socket.id)
    if (user !== undefined) {
      clearInterval(emitInterval)
      timerManager.switchTimer()
      emitTimersOnInterval(1000, user)
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

  socket.on('settings', ({ timerCount, timerCountdown }) => {
    const user = getUser(socket.id)
    if (user !== undefined) {
      timersetting = timerCountdown
      generateAndEmitTimers(timerCount, timerCountdown, user)
    }
  })

  socket.on('joinTimer', (timerIndex) => {
    const user = getUser(socket.id)
    if (user !== undefined) {
      timerManager.setUserOfTimer(timerIndex, user.name)

      io.to(user.room).emit('timer', { timers: timerManager.getTimers() })
    }
  })

  socket.on('leaveTimer', (timerIndex) => {
    const user = getUser(socket.id)
    if (user !== undefined) {
      timerManager.setUserOfTimer(timerIndex, null)
      io.to(user.room).emit('timer', { timers: timerManager.getTimers() })
    }
  })

  // Remove user from list upon disconnect event
  // Alert room to user leaving
  socket.on('disconnect', () => {
    const user = removeUser(socket.id)
    if (user) {
      io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) })
      socket.broadcast.emit('message', {
        user: 'Admin',
        text: `${user.name} has left room: ${user.room} `
      })
    }
  })
})

server.listen(PORT, () => console.log(`Server has started on port ${PORT}`))
