// userDto - стандартизация данных, филтрация их. Из всего списка данных мы получаем только нужные нам в этот момент данные
module.exports = class UserDto {
  id
  email
  class
  currentTask

  coins
  level
  xp

  constructor (module) {
    this.email = module.email
    this.id = module.id
    this.class = module.class
    this.currentTask = module.currentTask

    this.coins = module.coins
    this.level = module.level
    this.xp = module.xp

  }
}
