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


  async handleSubmit(event) {
    event.preventDefault()
    console.log('pressed!')
    console.log(this.state.text)
    let res = await axios.post('/api/tone', { text: this.state.text })

    console.log(res.data.document_tone.tones)
    this.setState({
      tones: res.data.document_tone.tones
    })

  }

  render() {
    return (
      <div>
        <h3>CHECK OUT THIS TEXT</h3>
        <form onSubmit={this.handleSubmit}>
          <label>
            Text to analyze:
          </label>
          <textarea onChange={this.handleChange} name="text" rows="10" cols="30" value={this.state.text} />
          <input type="submit" value="Submit" />
          <div>
            {this.state.tones && this.state.tones.map(tone => {
              return (
                <p>{tone.tone_name} : {tone.score}</p>
              )
            })}
          </div>
        </form>
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

