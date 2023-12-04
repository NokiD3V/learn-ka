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

  app.use('/api/users', router);
}
