import React from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import MyStockChart from './chart'
import {obama} from './samples'

/**
 * COMPONENT
 */
export class Text extends React.Component {
  constructor() {
    super()
    this.state = {
      text: '',
      textTwo: '',
      tones: [],
      tonesTwo: [],
      uniqueWords: {},
      uniqueWordsCount: 0,
      uniqueWordsCountTwo: 0,
      uniqueWordsTwo: {},
      totalWords: [],
      totalWords2: [],
      sentiments: [],
      sentimentsTwo: []
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmitTwo = this.handleSubmitTwo.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.addText = this.addText.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  getWords(string) {
    const lowerCase = string.toLowerCase()
    const noPunct = lowerCase.replace(
      /[!"\#$%&'()*+,\-./:;<=>?@\[\\\]^_`{|}~]/g,
      ''
    )
    return noPunct
      .replace(/(\r\n|\n|\r)/gm, ' ')
      .split(' ')
      .sort()
  }

  uniqueWords(string) {
    // regex get rid of all punctuation, replace with ''.
    const lowerCase = string.toLowerCase()

    const noPunct = lowerCase.replace(
      /[!"\#$%&'()*+,\-./:;<=>?@\[\\\]^_`{|}~]/g,
      ''
    )
    const noLineBreaks = noPunct.replace(/(\r\n|\n|\r)/gm, ' ')

    const wordArr = noLineBreaks.split(' ')
    const uniqueWords = {}

    for (let i = 0; i < wordArr.length; i++) {
      const currentWord = wordArr[i]
      if (!uniqueWords[currentWord]) {
        uniqueWords[currentWord] = 1
      } else {
        uniqueWords[currentWord]++
      }
    }
    return uniqueWords
  }

  topNWords(wordObject, n) {
    const weakWords = [
      'the',
      'a',
      'and',
      'to',
      'in',
      'of',
      'he',
      'was',
      'that',
      'as',
      'not',
      'for',
      '—',
      'his',
      'it'
    ]
    // const weakWords = []
    for (const words in wordObject) {
      if (weakWords.includes(words)) {
        delete wordObject[words]
      }
      if (words.length < 3 && words !== 'i') {
        delete wordObject[words]
      }
    }
    const sortedWordArr = Object.keys(wordObject).sort((a, b) => {
      return wordObject[b] - wordObject[a]
    })

    const topN = sortedWordArr.slice(0, n)
    const sortedWords = {}
    for (let i = 0; i < topN.length; i++) {
      sortedWords[topN[i]] = wordObject[topN[i]]
    }
    return sortedWords
  }

  makeSentimentArray(arr) {
    let resultArr = [0, 0, 0, 0, 0, 0, 0]
    for (let i = 0; i < arr.length; i++) {
      switch (arr[i].tone_id) {
        case 'anger':
          resultArr[0] = Math.round(arr[i].score * 100)
          break
        case 'fear':
          resultArr[1] = Math.round(arr[i].score * 100)
          break
        case 'joy':
          resultArr[2] = Math.round(arr[i].score * 100)
          break
        case 'sadness':
          resultArr[3] = Math.round(arr[i].score * 100)
          break
        case 'analytical':
          resultArr[4] = Math.round(arr[i].score * 100)
          break
        case 'confident':
          resultArr[5] = Math.round(arr[i].score * 100)
          break
        case 'tentative':
          resultArr[6] = Math.round(arr[i].score * 100)
          break
        default:
          break
      }
    }
    return resultArr
  }

  addText() {
    console.log('pressed')
    this.setState({
      text: obama
    })
    console.log(`this is state: `, this.state)
  }

  async handleSubmit(event) {
    event.preventDefault()
    console.log('pressed!')
    console.log(this.state.text)
    let res = await axios.post('/api/tone', {text: this.state.text})
    console.log(res.data.document_tone.tones)
    this.setState({
      tones: res.data.document_tone.tones,
      uniqueWords: this.topNWords(this.uniqueWords(this.state.text), 10),
      uniqueWordsCount: Object.keys(this.uniqueWords(this.state.text)).length,
      sentiments: this.makeSentimentArray(res.data.document_tone.tones),
      totalWords: this.getWords(this.state.text)
    })
  }

  async handleSubmitTwo(event) {
    event.preventDefault()
    console.log('pressed!')
    console.log(this.state.textTwo)
    let res = await axios.post('/api/tone', {text: this.state.textTwo})
    // let resTwo = await axios.post('/api/personality', { content: this.state.text })
    console.log(res.data.document_tone.tones)
    // console.log(resTwo.data)
    this.setState({
      tonesTwo: res.data.document_tone.tones,
      uniqueWordsTwo: this.topNWords(this.uniqueWords(this.state.textTwo), 10),
      uniqueWordsCountTwo: Object.keys(this.uniqueWords(this.state.textTwo))
        .length,
      sentimentsTwo: this.makeSentimentArray(res.data.document_tone.tones),
      totalWordsTwo: this.getWords(this.state.textTwo)
    })
  }

  render() {
    const words = Object.keys(this.state.uniqueWords)
    const wordsTwo = Object.keys(this.state.uniqueWordsTwo)
    console.log(this.state.totalWordsTwo)
    return (
      <div className="container">
        <div className="analysis">
          <div>{/* <h3>CHECK OUT THIS TEXT</h3> */}</div>
          <button onClick={this.addText}>Obama</button>
          <form onSubmit={this.handleSubmit}>
            <label>Text to analyze:</label>
            <textarea
              onChange={this.handleChange}
              name="text"
              rows="10"
              cols="60"
              value={this.state.text}
            />
            <br />
            <input type="submit" value="Submit" />
          </form>
          <div>
            {this.state.sentiments.length > 0 && (
              <div>
                <h1>Results 1</h1>
                <MyStockChart data={this.state.sentiments} />
              </div>
            )}
            {this.state.uniqueWordsCount > 0 && (
              <div>
                <p>Total Words Count: {this.state.totalWords.length}</p>
                <p>Unique Words Count: {this.state.uniqueWordsCount}</p>
              </div>
            )}
          </div>
          <div>
            {words.map(word => {
              return (
                <p>
                  {word} : {this.state.uniqueWords[word]}
                </p>
              )
            })}
          </div>
        </div>
        <div className="analysis">
          <form onSubmit={this.handleSubmitTwo}>
            <label>Text to analyze 2:</label>
            <textarea
              onChange={this.handleChange}
              name="textTwo"
              rows="10"
              cols="60"
              value={this.state.textTwo}
            />
            <br />
            <input type="submit" value="Submit" />
          </form>

          <div>
            {this.state.sentimentsTwo.length > 0 && (
              <div>
                <h1>Results 2</h1>
                <MyStockChart data={this.state.sentimentsTwo} />
              </div>
            )}
            {this.state.uniqueWordsCountTwo > 0 && (
              <div>
                <p>Total Words Count: {this.state.totalWordsTwo.length}</p>
                <p>Unique Words Count: {this.state.uniqueWordsCountTwo}</p>
              </div>
            )}
          </div>
          <div>
            {wordsTwo.map(word => {
              return (
                <p>
                  {word} : {this.state.uniqueWordsTwo[word]}
                </p>
              )
            })}
          </div>
        </div>
      </div>
    )
  }
}

export default Text
