const logger = require('log4js').getLogger()
logger.level = 'debug'
const ApiError = require('../exceptions/api-error')
const UserService = require('../service/user.service')
const taskService = require('../service/task.service')

module.exports.generateTask = async (req, res, next) => {
  try {
    console.log(req.userData)
    const task = await taskService.getRandomTask(req.userData.class)
    if (!task) return ApiError.BadRequest('Ошибка системы. Повторите попытку позже')

    UserService.setTask(req.userData.id, task.id)

    res.send({ success: true, task }).status(200)
  } catch (e) {
    next(e)
    logger.debug(typeof e)
  }
}
