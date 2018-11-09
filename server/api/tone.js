const router = require('express').Router()
const { toneAnalyzer, toneParams } = require('../tone')



router.post('/', (req, res, next) => {
  console.log(`this is req.body`, req.body)
  const toneParams = {
    tone_input: { 'text': req.body.text },
    content_type: 'application/json'
  };

  toneAnalyzer.tone(toneParams, function (error, toneAnalysis) {
    if (error) {

      console.log(error);
      res.send(error)
    } else {
      console.log(JSON.stringify(toneAnalysis, null, 2));
      res.send(JSON.stringify(toneAnalysis, null, 2))
    }
  });

})




module.exports = router

