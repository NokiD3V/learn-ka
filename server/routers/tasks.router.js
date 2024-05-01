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

  app.use('/api/tasks', router)
}
