const authMiddleware = require('../middlewares/auth.middleware')

module.exports = app => {
  const router = require('express').Router()

  const tasksController = require('../controllers/tasks.controller')

  const { body } = require('express-validator')

  // URL: /api/users/...
  router.get(
    '/generatetask',
    authMiddleware,
    tasksController.generateTask
  )
  router.post(
    '/answer', 
    authMiddleware,
    tasksController.answer)

    router.use((err, req, res, next) => {
      console.log(err)
      if(err.status != 200) res.status(err.status).send({
        success: false,
        message: err.errors[0]
      })
      next(err)
    })

  app.use('/api/tasks', router)
}
