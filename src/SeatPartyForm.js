import React, { Component } from 'react'
import { Redirect, Route } from 'react-router'
import {
  Table as TableUI,
  Button,
  Header,
  Segment,
  Container,
  Form,
  Divider
} from 'semantic-ui-react'
import axios from 'axios'

class SeatPartyForm extends Component {
  constructor (props) {
    super (props)
    this.state = {
      table_id: '',
      time_sat: '',
      party_id: this.props.party_id
    }
  }

  handleInputChange (event) {
    this.setState({
      [event.target.name]: event.target.value
    })
    console.log('table_id: ', this.state.table_id)
    console.log('time_sat: ', this.state.time_sat)
  }

  seatParty (event) {
    event.preventDefault()
    axios({
      url: 'http://localhost:4741/tables_activities',
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'Authorization': 'Token token=' + this.props.token
      },
      data: {
        tables_activity: {
          table_id: this.state.table_id, // this.props.table_id,
          time_sat:  this.state.time_sat, // this.props.time_sat,
          // time_up: should be intentionally blank
          party_id: this.props.party_id
        }
      }
    })
      .then((response) => console.log(response.data))
      .catch((error) => console.log(error))
  }

  render () {

    return (
      <form onSubmit={(event) => this.seatParty(event)}>
        <input placeholder='table number' name='table_id' onChange={(event) => this.handleInputChange(event)} value={this.state.table_id}/>
        <input placeholder='time sat' name='time_sat' onChange={(event) => this.handleInputChange(event)} value={this.state.time_sat}/>
        <button>Seat</button>
      </form>
    )
  }
}

export default SeatPartyForm
