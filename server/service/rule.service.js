const db = require('../models/index')
const Rules = db.rules

const ApiError = require('../exceptions/api-error')
const RuleDto = require('../dtos/rule.dto')

class RuleService {
  async getRule (ruleID) {
    const rule = await Rules.findOne({
      where: {
        id: ruleID
      }
    })

    if(!rule.dataValues){
      throw ApiError.BadRequest("Задание не найдено в базе данных!")
    }
    
    const dataValues = new RuleDto(rule.dataValues)

    return dataValues
  }
}

module.exports = new RuleService()
