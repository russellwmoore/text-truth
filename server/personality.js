const PersonalityInsightsV3 = require('watson-developer-cloud/personality-insights/v3');
const personalityInsights = new PersonalityInsightsV3({
  version: '2017-09-21',
  iam_apikey: process.env.PERSONALITY_API,
  url: 'https://gateway-wdc.watsonplatform.net/personality-insights/api'
});

// var profileParams = {
//   // Get the content from the JSON file.
//   content: require('./profile.json'),
//   content_type: 'application/json',
//   consumption_preferences: true,
//   raw_scores: true
// };

// personalityInsights.profile(profileParams, function (error, profile) {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log(JSON.stringify(profile, null, 2));
//   }
// });

module.exports = {
  personalityInsights
}