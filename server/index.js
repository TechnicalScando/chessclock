const express = require('express')
const socketio = require('socket.io')
const http = require('http')

const PORT = process.env.PORT || 5000

const router = require('./router')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

let countdown = 999

const runTimer = (socket) => {
  setInterval(() => {
    countdown--
    socket.emit('timer', { timer: countdown })
  }, 1000)
}

// specific client instance of a socket
io.on('connect', (socket) => {
  socket.on('join', () => {
    console.log('user has joined')
  })

  socket.on('disconnect', () => {
    console.log('user disconnected')
  })

  socket.on('timerStart', () => {
    console.log('Timer has started on backend!')
    runTimer(socket)
  })
})

app.use(router)

server.listen(PORT, () => console.log(`Server has started on port ${PORT}`))
