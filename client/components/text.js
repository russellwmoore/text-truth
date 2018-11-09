import React from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

/**
 * COMPONENT
 */
export class Text extends React.Component {
  constructor() {
    super()
    this.state = {
      text: '',
      tones: [],
      uniqueWords: {}
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }


  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  uniqueWords(string) {
    // regex get rid of all punctuation, replace with ''.
    const lowerCase = string.toLowerCase()
    const noPunct = lowerCase.replace(/[!"\#$%&'()*+,\-./:;<=>?@\[\\\]^_`{|}~]/g, '')
    const wordArr = noPunct.split(' ')
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

  // sortedWordArr(wordObj) {
  //   Object.keys(obj).sort((a,b)=> {
  //     return obj[b] - obj[a]
  //   })
  // }


  topNWords(wordObject, n) {
    // const weakWords = ['the', 'a', 'and', 'to', 'in', 'of', 'he', 'was', 'that', 'as', 'not', 'for', '—', 'his', 'it']
    const weakWords = []
    for (const words in wordObject) {
      if (weakWords.includes(words)) {
        delete wordObject[words]
      }
      if (words.length < 4 && words !== 'i') {
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

  async handleSubmit(event) {
    event.preventDefault()
    console.log('pressed!')
    console.log(this.state.text)
    let res = await axios.post('/api/tone', { text: this.state.text })

    console.log(res.data.document_tone.tones)
    this.setState({
      tones: res.data.document_tone.tones,
      uniqueWords: this.topNWords(this.uniqueWords(this.state.text), 100)
    })



  }

  render() {
    const words = Object.keys(this.state.uniqueWords)
    return (
      <div>
        <h3>CHECK OUT THIS TEXT</h3>
        <form onSubmit={this.handleSubmit}>
          <label>
            Text to analyze:
          </label>
          <textarea onChange={this.handleChange} name="text" rows="10" cols="30" value={this.state.text} />
          <br />
          <input type="submit" value="Submit" />
        </form>
        <div>
          {this.state.tones && this.state.tones.map(tone => {
            return (
              <p key={tone.tone_name}>{tone.tone_name} : {tone.score}</p>
            )
          })}
        </div>
        <div>
          {words.map(word => {
            return (
              <p>{word} : {this.state.uniqueWords[word]}</p>
            )
          })}
        </div>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email
  }
}

export default connect(mapState)(Text)

