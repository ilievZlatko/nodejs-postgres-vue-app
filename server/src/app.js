const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const { sequelize } = require('./models')
const config = require('./config/config')
const routes = require('./routes/routes')

const app = express()

// Apply middlewares
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

// Routes
app.use('/', routes)

// Start the server
sequelize.sync()
  .then(() => {
    app.listen(config.PORT, () => console.log('Server started on port: ' + config.PORT))
  })
