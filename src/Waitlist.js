import React, { Component } from 'react'
import Party from './Party.js'
import axios from 'axios'

class Waitlist extends Component {
  constructor (props) {
    super (props)
    this.state = {
      temp: '',
      partiesArray: [{name: 'placeholder'}]
    }
    this.componentDidMount = this.componentDidMount.bind(this)
  }

  updateState (data) {

    this.setState({
      temp: 'farts',
      partiesArray: data
    })

  }

  componentDidMount () {
    const baseUrl = 'http://localhost:4741'
    const self = this
    axios({
      url: baseUrl + '/parties',
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      }
    })
      .then((response) => {
        console.log(response.data.parties)
        this.updateState(response.data.parties)
      })
      .catch((error) => console.log(error))
  }

  render () {
    return (
      <div>
        {/**/}
        <Party
          name={this.state.partiesArray[0].name}
          size={this.state.partiesArray[0].size}
          estWait={this.state.partiesArray[0].estWait}
          checkedIn={this.state.partiesArray[0].checked_in}
          notes={this.state.partiesArray[0].notes}
        />
      </div>
    )
  }
}

export default Waitlist
