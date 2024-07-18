const logger = require('log4js').getLogger()
logger.level = 'debug'
const ApiError = require('../exceptions/api-error')
const UserService = require('../service/user.service')
const taskService = require('../service/task.service')
const allTasks = require('./all_tasks.json')

module.exports.generateTask = async (req, res, next) => {
  try {
    if(!req?.userData?.currentTask && req?.userData?.currentTask != 0) throw ApiError.BadRequest('Ошибка системы. Не найдена информация о пользователе. Повторите попытку позже')
    
    const currTask = req.userData.currentTask

    const task = {
      id: currTask,
      title: allTasks[currTask].title,
      choice: allTasks[currTask].choice
    }

    res.send({ success: true, task }).status(200)
  } catch (e) {
    next(e)
    logger.debug(typeof e)
  }
}

module.exports.answer = async (req, res, next) => {
  try {
    if(!req.userData) throw ApiError.BadRequest('Ошибка системы. Не найдена информация о пользователе. Повторите попытку позже')
    if(!req.body?.answer) throw ApiError.BadRequest('Не найден ответ пользователя. Повторите попытку позже')
    console.log(req.userData)
    if(!req.userData.currentTask && req.userData.currentTask != 0) throw ApiError.BadRequest('Не найдено текущее задание. Повторите попытку позже')

    const taskFromDB = allTasks[req.body.taskID]

    console.log(taskFromDB)
    if(req.body.answer == taskFromDB.answer){
      res.send({success:true}).status(200)
      UserService.correctAnswer(req.userData.id, req.userData.currentTask)
    }
    else{
      res.send({success: false, rule:"Тут когда-то будет правило, почему..."})
      UserService.incorrectAnswer(req.userData.id, req.userData.currentTask)
    }

  } catch (e) {
    next(e)
    logger.error(typeof e)
  }
}
