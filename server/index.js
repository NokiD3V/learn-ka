/**
 * @author NokiD3V
 * @description The project about learning russian language
 */
require('dotenv').config()
const logger = require('log4js').getLogger()
logger.level = 'debug'

const express = require('express')
const app = express()

app.use('/api/users', require('./routers/user.router'))

// Database connection 
const db = require("./models");
db.sequelize.sync()
.then(() => {
  logger.debug("Synced db.");
})
.catch((err) => {
  logger.debug("Failed to sync db: " + err.message);
});

app.listen(process.env.PORT, () => {
  logger.debug(`Server started on port :${process.env.PORT}`)
})
