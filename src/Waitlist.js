import React, { Component } from 'react'
import Party from './Party.js'
import axios from 'axios'

class Waitlist extends Component {
  constructor (props) {
    super (props)
    this.state = {
      partiesArray: [{name: 'placeholder'}, {name: 'placeholder'}]
    }
    this.componentDidMount = this.componentDidMount.bind(this)
  }

  updateState (data) {
    this.setState({
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
    const parties = this.state.partiesArray.map((party, index) => <Party
      name={party.name}
      size={party.size}
      estWait={party.est_wait}
      checkedIn={party.checked_in}
      notes={party.notes}
      key={index}
      id={index}
    />)
    return (
      <div>
        {parties}
      </div>
    )
  }
}

export default Waitlist
