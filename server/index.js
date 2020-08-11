const express = require('express')
const socketio = require('socket.io')
const http = require('http')

const { addUser, removeUser, getUser, getUsersInRoom } = require('./users.js')

const PORT = process.env.PORT || 5000

const router = require('./router')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

// specific client instance of a socket
io.on('connection', (socket) => {
  console.log('We have a new connection')

  // Accept 'join' event, additional callback function for error handling
  socket.on('join', ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room })

    if (error) return callback(error)

    socket.join(user.room)
  })

  // Accept and handle user disconnect
  socket.on('disconnect', () => {
    console.log('User has left')
  })
})

app.use(router)

server.listen(PORT, () => console.log(`Server has started on port ${PORT}`))
