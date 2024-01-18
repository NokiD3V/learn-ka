const db = require('../models/index')
const Tasks = db.tasks;

const ApiError = require('../exceptions/api-error');

class TaskService {
    async getRandomTask(userClass){

        const randomTask = await Tasks.findAll({
            order: db.sequelize.random(),
            limit: 1,
            where: {
                class: userClass
            }
        })
        
        if(randomTask.length < 1) {
            throw ApiError.BadRequest("Задание не найдено в базе данных. Обратитесь к разработчикам для устренния неполадок!")
        }

        return randomTask[0].dataValues
    }
}

module.exports = new TaskService();