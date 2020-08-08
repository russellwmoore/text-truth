const router = require('express').Router()
module.exports = router

// router.use('/personality', require('./personality'))
router.use('/tone', require('./tone'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
