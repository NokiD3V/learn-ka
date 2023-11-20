const express = require('express')
const router = express.Router()

router.get('/user', (req, res, next) => {
  res.send({ success: true, message: 'A very cool message' }).status(200).end()
})

module.exports = router
