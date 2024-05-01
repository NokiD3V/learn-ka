const authMiddleware = require('../middlewares/auth.middleware')

module.exports = app => {
  const router = require('express').Router()

  const rulesController = require('../controllers/rules.controller')

  // URL: /api/users/...
  router.get(
    '/:id',
    rulesController.getRule
  )

  app.use('/api/rules', router)
}
