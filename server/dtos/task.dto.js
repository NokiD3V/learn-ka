// taskDto - стандартизация данных, филтрация их. Из всего списка данных мы получаем только нужные нам в этот момент данные
module.exports = class TaskDto {
  id
  title
  type
  rule
  class

  constructor (module) {
    this.id = module.id
    this.title = module.title
    this.type = module.type
    this.rule = module.rule
    this.class = module.class
  }
}
