const express = require('express')
const cors = require('cors')
const usersRoutes = require('./сontroller/routes/usersRoutes')
require('dotenv').config()

const app = express()
const port = 3000

app
.use(cors())
.use(express.json())

app
.use('/users', usersRoutes)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})