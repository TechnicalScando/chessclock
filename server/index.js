const express = require('express')
const socketio = require('socket.io')
const http = require('http')

const PORT = process.env.PORT || 5000

const router = require('./router')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const DEFAULTCOUNTDOWN = 999
const DEFAULTTIMER = '00:00:00'

let timerStarted = false
let countdown = DEFAULTCOUNTDOWN
let timerInterval

const runTimer = (socket) => {
  if (!timerStarted) {
    timerInterval = setInterval(() => {
      countdown--
      io.to('test').emit('timer', { timer: countdown })
    }, 1000)

    timerStarted = true
    console.log('Timer has started on backend!')
  } else {
    console.log('Timer already started!')
  }
}

// specific client instance of a socket
io.on('connect', (socket) => {
  socket.on('join', (data) => {
    console.log(`name:${data.name} has joined room:${data.room} `)
    socket.join(data.room)
  })

  socket.on('disconnect', () => {
    console.log('user disconnected')
  })

  socket.on('timerStart', () => {
    runTimer(socket)
  })

  socket.on('clearTimer', () => {
    clearInterval(timerInterval)
    timerStarted = false
    countdown = DEFAULTCOUNTDOWN
    io.to('test').emit('timer', { timer: DEFAULTTIMER })
  })

  socket.on('switchYield', () => {
    console.log('Switch Yield!')
  })
})

app.use(router)

server.listen(PORT, () => console.log(`Server has started on port ${PORT}`))
