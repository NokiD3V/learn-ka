const authMiddleware = require('../middlewares/auth.middleware')

module.exports = app => {
  const router = require('express').Router()

  const usersController = require('../controllers/users.controller')

  const {body} = require('express-validator')

  // URL: /api/users/...
  router.post(
    '/register',
    body('email').isEmail(),
    body('password').isLength({min:6, max:32}),
    usersController.register
  )
  router.post(
    '/login',
    body('email').isEmail(),
    body('password').isLength({min:6, max:32}),
    usersController.login
  )

  app.use('/api/users', router);
}
