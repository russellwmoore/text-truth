const router = require('express').Router()
const {toneAnalyzer} = require('../tone')

router.post('/', (req, res, next) => {
  console.log(`this is req.body`, req.body)
  const toneParams = {
    toneInput: {text: req.body.text},
    content_type: 'application/json',
  }

  toneAnalyzer.tone(toneParams, function (error, toneAnalysis) {
    console.log('running')
    if (error) {
      console.log(error)
      res.send(error)
    } else {
      console.log(JSON.stringify(toneAnalysis, null, 2))
      res.send(JSON.stringify(toneAnalysis, null, 2))
    }
  })
})

module.exports = router
