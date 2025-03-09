const express = require('express')
const cors = require('cors')
const usersRoutes = require('./сontroller/routes/usersRoutes')
const cardsRoutes = require('./сontroller/routes/cardsRoutes')
const path = require('path')
const http = require('http')

require('dotenv').config()

const assetsPath = path.join(__dirname, '/assets')

console.log("PATH::", assetsPath)

const app = express()
const port = 3000

app
.use(cors())
.use(express.json())
.use(express.static(assetsPath))
.use('/users', usersRoutes)
.use('/cards', cardsRoutes)

const server = http.createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
  console.log('user connect');

  socket.on('disconnect', () => {
    console.log('user disconnect');
  });

  socket.on('send', (message) => {
    socket.emit('receive', message);
  });
});

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})