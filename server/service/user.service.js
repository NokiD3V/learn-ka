const db = require('../models/index')
const Users = db.users
const Tasks = db.tasks

const bcrypt = require('bcrypt')
const UserDto = require('../dtos/user.dto')
const ApiError = require('../exceptions/api-error')
const tokenService = require('./token.service')

function shiftArrayByDateDifference(arr, lastDate, todayDate) {
  // Преобразуем даты в объекты Date
  const last = new Date(lastDate);
  const today = new Date(todayDate);
  
  // Вычисляем разницу в днях между последней датой и сегодняшним днём
  const timeDiff = Math.abs(today.getTime() - last.getTime());
  const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24)); // Преобразуем миллисекунды в дни и округляем в большую сторону
  
  // Если последняя дата позже сегодняшней, сдвигаем массив вправо
  if (last > today) {
      for (let i = 0; i < dayDiff; i++) {
          arr.unshift(0); // Добавляем 0 в начало массива
          arr.pop(); // Удаляем последний элемент массива
      }
  }
  // Если последняя дата раньше сегодняшней, сдвигаем массив влево
  else if (last < today) {
      for (let i = 0; i < dayDiff; i++) {
          arr.push(0); // Добавляем 0 в конец массива
          arr.shift(); // Удаляем первый элемент массива
      }
  }
  
  return arr;
}

class UserService {
  async register (email, password) {
    try {
      const candidate = await Users.findOne({
        where: { email }
      })
      if (candidate) {
        throw ApiError.BadRequest(`Пользователь с адресом ${email} уже существует`)
      }

      const hashPassword = await bcrypt.hash(password, 3)
      let user = await Users.create({ email, password: hashPassword })
      user = user.dataValues // Берём данные после создания пользователя в базу данных

      // userDto - стандартизация данных, филтрация их. Из всего списка данных мы получаем только нужные нам в этот момент данные
      const userDto = new UserDto(user)
      const token = await tokenService.generateToken({ ...userDto })

      return {
        token,
        user: userDto
      }
    } catch (error) {
      console.log(error)
    }
  }

  async login (email, password) {
    let user = await Users.findOne({
      where: { email }
    })
    if (!user) {
      throw ApiError.BadRequest('Неверный email или пароль')
    }
    user = user.dataValues

    // Проверка хеша пароля и данных пользователя из запроса
    const isPassEquals = await bcrypt.compare(password, user.password)
    if (!isPassEquals) {
      throw ApiError.BadRequest('Неверный email или пароль')
    }

    // Стандартизация данных по Dto (см. внутри функции)
    const userDto = new UserDto(user)

    const tokens = tokenService.generateTokens({ ...userDto })
    await tokenService.saveToken(userDto.id, tokens.refreshToken)
    return {
      ...tokens,
      user: userDto
    }
  }

  async refresh (refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError()
    }

    const userData = tokenService.validateRefreshToken(refreshToken)
    const tokenFromDB = await tokenService.findToken(refreshToken)
    if (!userData || !tokenFromDB) {
      throw ApiError.UnauthorizedError()
    }

    const user = await Users.findByPk(userData.id)

    const userDto = new UserDto(user)
    const tokens = tokenService.generateTokens({ ...userDto })
    await tokenService.saveToken(userDto.id, tokens.refreshToken)
    return {
      ...tokens,
      user: userDto
    }
  }

  async logout(refreshToken){
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }

  async setTask (userID, taskID) {
    const user = await Users.findOne({
      where: { id: userID }
    })
    if (!user) {
      throw ApiError.BadRequest('Ошибка системы. Неверный ID пользователя')
    }
    const task = await Tasks.findOne({
      where: { id: taskID }
    })
    if (!task) {
      throw ApiError.BadRequest('Ошибка системы. Неверный ID задачи')
    }

    user.update({ currentTask: taskID })

    await user.save()
  }

  
  async incorrectAnswer(userID, currentTask){
    const user = await Users.findOne({
      where: { id: userID }
    })
    if (!user) throw ApiError.BadRequest('Ошибка системы. Неверный ID пользователя')
    const currentDay = new Date().toJSON().slice(0,10)
    const lastDay = new Date(user.lastWorkDate).toJSON().slice(0,10)
    let workArray = user.tasksHistory
    if(workArray == null){
      workArray = [0,0,0,0,0]
    }
    else workArray = JSON.parse(workArray)
    if(currentDay != lastDay){
      workArray = shiftArrayByDateDifference(workArray, lastDay, currentDay)
      console.log(workArray)
    }

    workArray[4] += 1;

    if(currentTask >= 3) user.update({ currentTask: currentTask - 3, lastWorkDate: new Date().toJSON().slice(0,10), tasksHistory: `[${workArray.toString()}]`, failedTasks: user.failedTasks + 1 })
    else user.update({ currentTask: 0, lastWorkDate: new Date().toJSON().slice(0,10), tasksHistory: `[${workArray.toString()}]`, failedTasks: user.failedTasks + 1  })

    await user.save()
  }

  async correctAnswer(userID, currentTask){
    const user = await Users.findOne({
      where: { id: userID }
    })
    if (!user) throw ApiError.BadRequest('Ошибка системы. Неверный ID пользователя')
    
    const currentDay = new Date().toJSON().slice(0,10)
    const lastDay = new Date(user.lastWorkDate).toJSON().slice(0,10)
    let workArray = user.tasksHistory
    if(workArray == null){
      workArray = [0,0,0,0,0]
    }
    else workArray = JSON.parse(workArray)
    if(currentDay != lastDay){
      workArray = shiftArrayByDateDifference(workArray, lastDay, currentDay)
      console.log(workArray)
    }

    workArray[4] += 1;

    user.update({ currentTask: currentTask + 1, lastWorkDate: new Date().toJSON().slice(0,10), tasksHistory: `[${workArray.toString()}]`, successTasks: user.successTasks + 1 })

    await user.save()
  }

  async getMembers(){
    const users = await Users.findAll({where: {}})
    if (!users || users.length < 1) throw ApiError.BadRequest('Ошибка системы. Не могу найти пользователей сети')
    
    let filteredUsers = []
    users.map(n => {
      const _u = new LeadersUserDto(n)
      filteredUsers.push(_u)
    })

    console.log(filteredUsers)
    return filteredUsers
  }
}


class LeadersUserDto {
  id
  name
  surname

  successTasks
  failedTasks
  currentTask
  constructor (module) {
    this.id = module.id
    this.name = module.name
    this.surname = module.surname

    this.successTasks = module.successTasks
    this.failedTasks = module.failedTasks
    this.currentTask = module.currentTask
  }
}

module.exports = new UserService()
