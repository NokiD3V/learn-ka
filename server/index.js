/**
 * @author NokiD3V
 * @description The project about learning russian language
 */
require('dotenv').config()
const logger = require('log4js').getLogger()
logger.level = 'debug'
const fs = require('fs')

const express = require('express')
const app = express()

const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true
}

// Интеграция API вместе с парсерами
app.use(cors(corsOptions))
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ extended: true, limit: '50mb', parameterLimit: 50000 }))
app.use(bodyParser.json({ limit: '50mb' }))
app.use(cookieParser())

// Импорт всех роутеров из папки "routers"
// ПРИМЕЧАНИЕ: файл должен содержать ".router.js" чтобы быть загруженным
fs.readdir('routers/', (err, files) => {
  if(err){
    throw err;
  }
  files.filter(n => {return n.includes(".router.js")}).map(n => {
    require('./routers/' + n)(app)
    logger.log(`Router ${n} was loaded!`)
  })
})

// Подключение к базе данных, импорт основных моделей и проверки соеденения
const db = require('./models')
db.sequelize.sync({ force: (process.argv?.[2] == 'cleardb') })
.then(() => {
  logger.log('Synced db.')

  if(process.argv?.[2] == 'cleardb'){
    // ОЧИЩАЕТ ВСЕ ДАННЫЕ В БАЗЕ ДАННЫХ
    // Конфигурация базы данных для дебага
    db.users.create({ 
      email:'test2@gmail.com', 
      name:"Никита",
      surname:"Покумин",
      password: '$2b$04$ffSGSEoQnIbgFvT5Te4JR.bEVLXwfyscFk/0wEuJElv43UkbNOWIW', //Пароль: 123123123
      class: 12,
      currentTask: 0
    })
  }

})
.catch((err) => {
  logger.log('Failed to sync db: ' + err.message)
})

app.listen(process.env.PORT, () => {
  logger.log(`Server started on port :${process.env.PORT}`)
})
