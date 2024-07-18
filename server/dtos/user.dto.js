// userDto - стандартизация данных, филтрация их. Из всего списка данных мы получаем только нужные нам в этот момент данные
module.exports = class UserDto {
  id
  email

  name
  surname

  class
  currentTask

  coins
  level
  xp

  tasksHistory
  lastWorkDate

  successTasks
  failedTasks

  constructor (module) {
    this.email = module.email
    this.id = module.id

    this.name = module.name
    this.surname = module.surname

    this.class = module.class
    this.currentTask = module.currentTask

    this.coins = module.coins
    this.level = module.level
    this.xp = module.xp
    this.tasksHistory = module.tasksHistory
    this.lastWorkDate = module.lastWorkDate

    this.successTasks = module.successTasks
    this.failedTasks = module.failedTasks
  }
}
