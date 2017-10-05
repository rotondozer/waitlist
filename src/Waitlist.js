import React, { Component } from 'react'
import { Redirect } from 'react-router'
import Party from './Party.js'
import axios from 'axios'

class Waitlist extends Component {
  constructor (props) {
    super (props)
    this.state = {
      partiesArray: [{name: 'placeholder'}, {name: 'placeholder'}]
    }
    this.componentDidMount = this.componentDidMount.bind(this)
    this.deleteParty = this.deleteParty.bind(this)
    this.handleOnClick = this.handleOnClick.bind(this)
  }

  updateState (data) {
    this.setState({
      partiesArray: data
    })
  }

  handleOnClick () {
    console.log('Yooooooooooo')
    this.setState({redirect: true})
  }

  deleteParty (event) {
    const baseUrl = 'http://localhost:4741'
    const self = this
    const partyId = event.target.id
    // const partyIndex = event.target.index
    // debugger
    // let tempArr = self.state.partiesArray
    // tempArr.splice(partyIndex, 1)
    event.preventDefault()
    console.log('calling deleteParty with id ' + event.target.id)
    axios({
      url: `${baseUrl}/parties/${partyId}`,
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      }
    })
      .then(() => this.getAllParties())
      .then((response) => console.log(response))
      .catch((error) => console.log(error))
  }

  getAllParties () {
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

  componentDidMount () {
    this.getAllParties()
  }

  render () {
    if (this.state.redirect) {
      return <Redirect push to="/add_parties" />
    }
    // debugger
    const self = this
    if (this.state.partiesArray.length > 0) {
      const parties = this.state.partiesArray.map((party, index) => <Party
        name={party.name}
        size={party.size}
        estWait={party.est_wait}
        checkedIn={party.checked_in}
        notes={party.notes}
        key={index}
        id={party.id}
        onDeleteProp={this.deleteParty}
      />)
      return (
        <div>
          <h2>Waitlist</h2>
          <input onClick={this.handleOnClick} type='button' value={'Add Party'} />
          {parties}
        </div>
      )
    } else {
      return (
        <div>
          <h2>Waitlist</h2>
          <input onClick={this.handleOnClick} type='button' value={'Add Party'} />
          <p>'No Parties Waiting'</p>
        </div>
      )

    }

  }
}

export default Waitlist
