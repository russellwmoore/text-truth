const router = require('express').Router()
const {personalityInsights} = require('../personality')

router.post('/', (req, res, next) => {
  console.log(`this is req.body`, req.body)

  // for reference
  // var profileParams = {
  //   // Get the content from the JSON file.
  //   content: require('./profile.json'),
  //   content_type: 'application/json',
  //   consumption_preferences: true,
  //   raw_scores: true
  // };

  const profileParams = {
    // Get the content from the JSON file.
    content: req.body,
    content_type: 'application/json',
    consumption_preferences: true,
    raw_scores: true,
  }

  personalityInsights.profile(profileParams, function (error, profile) {
    if (error) {
      console.log(error)
    } else {
      console.log(JSON.stringify(profile, null, 2))
    }
  })
})

module.exports = router
