const logger = require('log4js').getLogger()
logger.level = 'debug'
const ApiError = require('../exceptions/api-error')
const UserService = require('../service/user.service')
const taskService = require('../service/task.service')

module.exports.generateTask = async (req, res, next) => {
  try {
    if(!req?.userData?.class) throw ApiError.BadRequest('Ошибка системы. Не найдена информация о пользователе. Повторите попытку позже')
    

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
    if(!req.userData.currentTask) throw ApiError.BadRequest('Не найдено текущее задание. Повторите попытку позже')

    const correctAnswer = await taskService.correctAnswer(req.userData.currentTask, req.body.answer)

    if(!correctAnswer) return res.send({success: false}).status(200)
    else{
      res.send({success:true}).status(200)
    }
  } catch (e) {
    next(e)
    logger.error(typeof e)
  }
}
