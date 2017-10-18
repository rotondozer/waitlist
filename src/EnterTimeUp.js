import React, { Component } from 'react'
import { Redirect } from 'react-router'
import axios from 'axios'
import {
  Table as TableUI,
  Button
} from 'semantic-ui-react'
import Time from 'react-time-format'

class EnterTimeUp extends Component {
  constructor (props) {
    super (props)
    this.state = {
      activity_id: this.props.activity_id,
      table_id: this.props.table_id,
      time_sat: this.props.time_sat,
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
      url: 'http://localhost:4741/tables_activities/' + this.state.activity_id,
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
          time_up: this.state.time_up,
          // What about party_id?
          user_id: this.props.user_id
        }
      }
    })
      .then((response) => console.log(response.data))
      .catch((error) => console.log(error))
  }

  render () {
    return (
      <TableUI.Row>
        <TableUI.Cell>{this.props.table_id}</TableUI.Cell>
        <TableUI.Cell>{'  '}</TableUI.Cell>
        <TableUI.Cell>{'  '}</TableUI.Cell>
        <TableUI.Cell>
          <Button basic color='yellow' onClick={(event) => this.submitTimeUp(event)}>Submit</Button>
        </TableUI.Cell>
        <TableUI.Cell>delete</TableUI.Cell>
        <TableUI.Cell><Time value={this.props.time_sat} format='hh:mm'/></TableUI.Cell>
        <TableUI.Cell>
          {/* TODO capture onChange within state, send that with submit form */}
          <input placeholder='enter time up' onChange={(event) => this.handleInputChange(event)} value={this.state.time_up_input}></input>
        </TableUI.Cell>

      </TableUI.Row>
    )
  }
}

export default EnterTimeUp
