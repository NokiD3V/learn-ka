// ruleDto - стандартизация данных, филтрация их. Из всего списка данных мы получаем только нужные нам в этот момент данные
module.exports = class RuleDto {
  id
  title
  description
  imgUrl

  constructor (module) {
    this.id = module.id
    this.title = module.title
    this.description = module.description
    this.imgUrl = module.imgUrl
  }
}
