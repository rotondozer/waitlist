import React, { Component } from 'react'
import { Redirect } from 'react-router'
import Party from './Party.js'
import EditParty from './EditParty'
import axios from 'axios'

class Waitlist extends Component {
  constructor (props) {
    super (props)
    this.state = {
      partiesArray: []
    }
    this.componentWillMount = this.componentWillMount.bind(this)
    this.deleteParty = this.deleteParty.bind(this)
    this.handleOnClick = this.handleOnClick.bind(this)
    this.getAllParties = this.getAllParties.bind(this)
  }

  updateState (data) {
    this.setState({
      partiesArray: data
    })
  }

  handleOnClick (event) {
    console.log('Yooooooooooo')
    this.setState({
      [event.target.name]: true
    })
  }

  deleteParty (event) {
    const baseUrl = 'http://localhost:4741'
    const self = this
    const partyId = event.target.id
    event.preventDefault()
    console.log('calling deleteParty with id ' + event.target.id)
    axios({
      url: `${baseUrl}/parties/${partyId}`,
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        'Authorization': 'Token token=' + this.props.token
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
        'content-type': 'application/json',
        'Authorization': 'Token token=' + this.props.token
      }
    })
      .then((response) => {
        console.log(response.data.parties)
        self.updateState(response.data.parties)
      })
      .catch((error) => console.log(error))
  }

  componentWillMount () {
    this.getAllParties()
  }

  render () {
    if (this.state.addParty) {
      return <Redirect push to="/add_parties" />
    }

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
        onGetAllParties={this.getAllParties}
        token={this.props.token}
      />)
      return (
        <div>
          <h2>Waitlist</h2>
          <input name='addParty' onClick={this.handleOnClick} type='button' value={'Add Party'} />

          {parties}
        </div>
      )
    } else {
      return (
        <div>
          <h2>Waitlist</h2>
          <input name='addParty' onClick={this.handleOnClick} type='button' value={'Add Party'} />

          <p>No Parties Waiting</p>
        </div>
      )
    }
  }
}

export default Waitlist
