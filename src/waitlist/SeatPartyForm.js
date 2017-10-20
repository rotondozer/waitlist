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
          table_id: this.state.table_id,
          time_sat:  this.state.time_sat,
          // time_up: should be intentionally blank
          party_id: this.props.party_id
        }
      }
    })
      .then((response) => this.props._addNotification('success', 'Sat at Table ' + this.state.table_id + ' at ' + this.state.time_sat + '. Now remove from Waitlist'))
      .catch((error) => this._addNotification('error', 'something went wrong'))
  }

  render () {

    return (

      <Form onSubmit={(event) => this.seatParty(event)}>
        <Form.Group>
          <Form.Input placeholder='table number'
            name='table_id'
            onChange={(event) => this.handleInputChange(event)} value={this.state.table_id} />
          <Form.Input placeholder='time sat'
            name='time_sat'
            onChange={(event) => this.handleInputChange(event)} value={this.state.time_sat} />
          <Form.Button content='Seat'/>
        </Form.Group>
      </Form>
    )
  }
}

export default SeatPartyForm
