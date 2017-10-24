import React, { Component } from 'react'
import { Redirect } from 'react-router'
import axios from 'axios'
import {
  Table as TableUI,
  Button,
  Input
} from 'semantic-ui-react'

class EnterTimeUp extends Component {
  constructor (props) {
    super (props)
    this.state = {
      activity_id: this.props.activity_id,
      table_id: this.props.table_id,
      time_sat: this.props.time_sat,
      // party_id: this.props.party_id,
      time_up: ''
    }
  }

  handleInputChange (event) {
    this.setState({
      time_up: event.target.value
    })
  }

  submitTimeUp (event) {
    event.preventDefault()
    axios({
      url: `http://localhost:4741/tables_activities/${this.state.activity_id}`,
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        'Authorization': 'Token token=' + this.props.token
      },
      data: {
        tables_activity: {
          table_id: this.state.table_id,
          time_sat: this.state.time_sat,
          // time_up is coming from the input field updating state
          time_up: this.state.time_up
          // What about party_id?
          // party_id: this.state.party_id
        }
      }
    })
      .then((response) => this.props._addNotification('success', ('Table ' + this.state.table_id + ' is now open.')))
      .then(() => this.props.enterTimeUpOff())
      .catch((error) => this.props._addNotification('error', 'something went wrong'))
  }

  render () {
    return (
      <TableUI.Row>
        <TableUI.Cell>{this.props.table_id}</TableUI.Cell>
        <TableUI.Cell>{'  '}</TableUI.Cell>
        <TableUI.Cell>{'  '}</TableUI.Cell>
        <TableUI.Cell>
          <Button basic color='teal' onClick={(event) => this.submitTimeUp(event)}>Enter</Button>
        </TableUI.Cell>
        <TableUI.Cell>{'  '}</TableUI.Cell>
        <TableUI.Cell>{this.props.time_sat}</TableUI.Cell>
        <TableUI.Cell>
          <Input placeholder='enter time up' onChange={(event) => this.handleInputChange(event)} value={this.state.time_up_input}></Input>
        </TableUI.Cell>

      </TableUI.Row>
    )
  }
}

export default EnterTimeUp
