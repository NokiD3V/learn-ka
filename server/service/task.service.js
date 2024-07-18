const db = require('../models/index')
const Tasks = db.tasks

const ApiError = require('../exceptions/api-error')
const TaskDto = require('../dtos/task.dto')

class TaskService {
  async getRandomTask (userClass) {
    const randomTask = await Tasks.findAll({
      order: db.sequelize.random(),
      limit: 1,
      where: {
        class: userClass
      }
    })

    if (randomTask.length < 1) {
      throw ApiError.BadRequest('Задание не найдено в базе данных. Обратитесь к разработчикам для устренния неполадок!')
    }

    const dataValues = new TaskDto(randomTask[0].dataValues)

    return dataValues
  }

  async correctAnswer(taskID, answer){
    const task = await Tasks.findOne({
      where: {
        id: taskID
      }
    })

    if(!task?.dataValues){
      console.log(task)
      throw ApiError.BadRequest("Задание не найдено в базе данных!")
    }
    
    return answer.toLowerCase().split(' ').join('') == task.answer
  }

}

module.exports = new TaskService()
