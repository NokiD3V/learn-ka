const ApiError = require('../exceptions/api-error')
const ruleService = require('../service/rule.service')

const logger = require('log4js').getLogger()
logger.level = 'debug'
module.exports.getRule = async (req, res, next) => {
  try {
    if(!req.params.id) throw ApiError.BadRequest("Не найдено ID задания. Обратитесь к разработчикам для устранения проблемы.")
    
    const rule = await ruleService.getRule(req.params.id)
    
    res.send({...rule}).status(200)
  } catch (e) {
    next(e)
    logger.debug(typeof e)
  }
}
