// const ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3')
// const toneAnalyzer = new ToneAnalyzerV3({
//   iam_apikey: process.env.WATSON_API,
//   version: '2017-09-21',
//   url: 'https://gateway-wdc.watsonplatform.net/tone-analyzer/api',
// })

const ToneAnalyzerV3 = require('ibm-watson/tone-analyzer/v3')
const {IamAuthenticator} = require('ibm-watson/auth')

console.log('API', process.env.WATSON_API)
const toneAnalyzer = new ToneAnalyzerV3({
  version: '2017-09-21',
  authenticator: new IamAuthenticator({apikey: process.env.WATSON_API}),
  url: 'https://gateway-wdc.watsonplatform.net/tone-analyzer/api',
})

console.log(toneAnalyzer)
module.exports = {
  toneAnalyzer,
}
