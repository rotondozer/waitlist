import React, { Component } from 'react'
import { Redirect, Route } from 'react-router'
import {
  Table as TableUI,
  Form,
  Dropdown
} from 'semantic-ui-react'
import axios from 'axios'

class SeatPartyForm extends Component {
  constructor (props) {
    super (props)
    this.state = {
      table_id: '',
      time_sat: '',
      party_id: this.props.party_id,
      availableTablesArray: []
    }
    this.updateAvailableTableState = this.updateAvailableTableState.bind(this)
  }

  handleInputChange (event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  updateAvailableTableState (availableTables) {
    this.setState({
      availableTablesArray: availableTables
    })
  }

  componentWillMount () {
    const self = this
    axios({
      url: 'http://localhost:4741/tables_activities_all_available',
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Authorization': 'Token token=' + this.props.token
      }
    })
      .then((response) => self.updateAvailableTableState(response.data.tables_activities))
      .catch((error) => this.props._addNotification('info', 'Login first!'))
  }

  seatParty (event) {
    // name is coming from props because it's not being altered
    const name = this.props.name
    // table_id comes from state because it's being inputted
    const table = this.state.table_id
    const time_sat = this.state.time_sat
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
      .then((response) => this.props._addNotification('success', `${name} was seated at Table ${table} at ${time_sat}. Now remove ${name} from the Waitlist.`))
      .catch((error) => this.props._addNotification('error', 'something went wrong'))
  }

  render () {

    const availableTableNums = this.state.availableTablesArray.map((table, index) => {
      let tableObj = {}
      tableObj['key'] = index
      tableObj['text'] = table.table_id
      return tableObj
    })
    return (

      <Form onSubmit={(event) => this.seatParty(event)}>
        {/* <Form.Group> */}
        {/* <Form.Input placeholder='table number'
          name='table_id'
          onChange={(event) => this.handleInputChange(event)} value={this.state.table_id} /> */}
        <Dropdown placeholder='Available Tables' search selection options={availableTableNums} />
        <Form.Input placeholder='time sat'
          name='time_sat'
          onChange={(event) => this.handleInputChange(event)} value={this.state.time_sat} />
        <Form.Button content='Seat'/>
        {/* </Form.Group> */}
      </Form>
    )
  }
}

export default SeatPartyForm
