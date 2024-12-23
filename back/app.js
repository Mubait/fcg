const express = require('express')
const cors = require('cors')
const usersRoutes = require('./сontroller/routes/usersRoutes')
const cardsRoutes = require('./сontroller/routes/cardsRoutes')
const path = require('path')

require('dotenv').config()

const assetsPath = path.join(__dirname, '/assets')

console.log("PATH::",assetsPath)

const app = express()
const port = 3000

app
.use(cors())
.use(express.json())
.use(express.static(assetsPath))
.use('/users', usersRoutes)
.use('/cards', cardsRoutes)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})