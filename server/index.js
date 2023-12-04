/**
 * @author NokiD3V
 * @description The project about learning russian language
 */
require('dotenv').config()
const logger = require('log4js').getLogger()
logger.level = 'debug'

const express = require('express')
const app = express()

const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require("cors");
const corsOptions = {
  origin: "http://localhost:3000",
  credentials:true
};


// Интеграция API вместе с парсерами
app.use(cors(corsOptions));
app.use(express.json({limit:"50mb"}));
app.use(express.urlencoded({ extended: true, limit:"50mb", parameterLimit: 50000 }));
app.use(bodyParser.json({ limit: "50mb" }))
app.use(cookieParser())

require("./routers/user.router")(app);

// Подключение к базе данных, импорт основных моделей и проверки соеденения
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
