const authMiddleware = require('../middlewares/auth.middleware')

module.exports = app => {
  const router = require('express').Router()

  const rulesController = require('../controllers/rules.controller')

  // URL: /api/users/...
  router.get(
    '/:id',
    rulesController.getRule
  )

  router.use((err, req, res, next) => {
    console.log(err)
    if(err.status != 200) res.status(err.status).send({
      success: false,
      message: err.errors[0]
    })
    next(err)
  })

  app.use('/api/rules', router)
}
