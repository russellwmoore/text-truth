import React from 'react'
import axios from 'axios'
import MyStockChart from './chart'
import sampleData from './samples'

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
      sentimentsTwo: [],
      samples: sampleData
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
      'it',
      'but'
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

  addText(event, state) {
    this.setState({
      [state]: sampleData[event]
    })
  }

  async handleSubmit(event) {
    event.preventDefault()
    console.log('pressed!')
    console.log(this.state.text)
    let res = await axios.post('/api/tone', {text: this.state.text})
    console.log(res.data.document_tone.tones)
    this.setState({
      tones: res.data.document_tone.tones,
      uniqueWords: this.topNWords(this.uniqueWords(this.state.text), 20),
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
      uniqueWordsTwo: this.topNWords(this.uniqueWords(this.state.textTwo), 20),
      uniqueWordsCountTwo: Object.keys(this.uniqueWords(this.state.textTwo))
        .length,
      sentimentsTwo: this.makeSentimentArray(res.data.document_tone.tones),
      totalWordsTwo: this.getWords(this.state.textTwo)
    })
  }

  render() {
    const words = Object.keys(this.state.uniqueWords)
    const wordsTwo = Object.keys(this.state.uniqueWordsTwo)
    const samplesArr = Object.keys(this.state.samples)
    return (
      <div className="wrapper">
        <div id="title-container">
          <h1 id="title">Text ? Truth</h1>
          <h3>AI Expectations vs Results</h3>
        </div>
        <div className="container">
          <div className="analysis">
            <select
              className="select-data"
              onChange={e => this.addText(e.target.value, 'text')}
              id="text-select"
            >
              <option value="">--Sample Text--</option>
              {samplesArr.map(sample => {
                return (
                  <option key={`${sample}`} value={`${sample}`}>
                    {sample}
                  </option>
                )
              })}
            </select>
            <form onSubmit={this.handleSubmit}>
              <textarea
                onChange={this.handleChange}
                name="text"
                rows="5"
                cols="40"
                value={this.state.text}
                placeholder="Enter text to analyze"
              />
              <br />
              <input type="submit" value="Submit" />
            </form>
            <div>
              {this.state.sentiments.length > 0 && (
                <div>
                  <MyStockChart data={this.state.sentiments} />
                </div>
              )}
              {this.state.uniqueWordsCount > 0 && (
                <div className="word-analysis-container">
                  <div className="word-analysis">
                    Total Words: {this.state.totalWords.length}
                  </div>
                  <div className="word-analysis">
                    Unique Words: {this.state.uniqueWordsCount}
                  </div>
                </div>
              )}
            </div>
            <div className="unique-words-container">
              {words.map(word => {
                return (
                  <div className="uniqe-words" key={word}>
                    {word} : {this.state.uniqueWords[word]}
                  </div>
                )
              })}
            </div>
          </div>
          <div className="analysis">
            <select
              className="select-data"
              onChange={e => this.addText(e.target.value, 'textTwo')}
              id="text-select"
            >
              <option value="">--Sample Text--</option>
              {samplesArr.map(sample => {
                return (
                  <option key={`${sample}`} value={`${sample}`}>
                    {sample}
                  </option>
                )
              })}
            </select>
            <form onSubmit={this.handleSubmitTwo}>
              <textarea
                onChange={this.handleChange}
                name="textTwo"
                rows="5"
                cols="40"
                value={this.state.textTwo}
                placeholder="Enter text to analyze"
              />
              <br />
              <input type="submit" value="Submit" />
            </form>
            <div>
              {this.state.sentimentsTwo.length > 0 && (
                <div>
                  <MyStockChart data={this.state.sentimentsTwo} />
                </div>
              )}
              {this.state.uniqueWordsCountTwo > 0 && (
                <div className="word-analysis-container">
                  <div className="word-analysis">
                    Total Words: {this.state.totalWordsTwo.length}
                  </div>
                  <div className="word-analysis">
                    Unique Words: {this.state.uniqueWordsCountTwo}
                  </div>
                </div>
              )}
            </div>
            <div className="unique-words-container">
              {wordsTwo.map(word => {
                return (
                  <div className="uniqe-words" key={word}>
                    {word} : {this.state.uniqueWordsTwo[word]}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Text
