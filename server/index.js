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
    // creat user on connection
    const { error, user } = addUser({ id: socket.id, name, room })
    // if user is equal to error, run the error function
    if (error) return callback(error)

    // send welcome message to use on room connect
    socket.emit('message', { user: 'admin', text: `${user.name}, welcome to the room ${user.room}` })
    // broadcast to other users that a new user has joined
    socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name}, has joined!` })

    socket.join(user.room)

    callback()
  })

  // Recieve sendMessage event from front end and emit it to the user's room
  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id)

    io.to(user.room).emit('message', { user: user.name, text: message })

    callback()
  })

  // Accept and handle user disconnect
  socket.on('disconnect', () => {
    console.log('User has left')
  })
})

app.use(router)

server.listen(PORT, () => console.log(`Server has started on port ${PORT}`))
